class PerformaceCalculator {
  constructor(aPerfomance) {
    this.performance = aPerfomance;
  }
}

async function run() {
  const invoiceData = await (await fetch('/chapter1/invoice.json')).json();
  const playData = await (await fetch('/chapter1/plays.json')).json();
  const result = statement(invoiceData[0], playData);

  console.log(result);
}

run();

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));

  function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerfomance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
  }

  function enrichPerfomance(aPerfomance) {
    const calculator = new PerformaceCalculator(aPerfomance);

    const result = Object.assign({}, aPerfomance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID];
  }

  function amountFor(aPerfomance) {
    let result = 0;

    switch (aPerfomance.play.type) {
      case 'tragedy':
        result = 40000;
        if (aPerfomance.audience > 30) {
          result += 1000 * (aPerfomance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (aPerfomance.audience > 20) {
          result += 10000 + 500 * (aPerfomance.audience - 20);
        }
        result += 300 * aPerfomance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르 : ${aPerfomance.play.type}`);
    }
    return result;
  }

  function volumeCreditsFor(aPerfomance) {
    // 포인트를 적립한다.
    let result = 0;
    result += Math.max(aPerfomance.audience - 30, 0);

    if ('comedy' == aPerfomance.play.type) {
      result += Math.floor(aPerfomance.audience / 5);
    }
    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  // 청구 내역을 출력한다.
  for (const pref of data.performances) {
    result += ` ${pref.play.name} : ${usd(pref.amount)} (${pref.audience}석)\n`;
  }

  // 포인트를 적립한다.
  result += `총액 : ${usd(data.totalAmount)}\n`;
  result += `적립 포인드 : ${data.totalVolumeCredits}점`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
