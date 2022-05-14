const fs = require('fs');
const invoiceData = fs.readFileSync(`${__dirname}/invoice.json`, { encoding: 'utf-8', flag: 'r' });
const invoiceObj = JSON.parse(invoiceData);

const playData = fs.readFileSync(`${__dirname}/plays.json`, { encoding: 'utf-8', flag: 'r' });
const playObj = JSON.parse(playData);

const result = statement(invoiceObj[0], playObj);

console.log(result);

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerfomance);
  return renderPlainText(statementData, plays);

  function enrichPerfomance(aPerfomance) {
    const result = Object.assign({}, aPerfomance);
    result.play = playFor(result);
    return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID];
  }
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  // 청구 내역을 출력한다.
  for (const pref of data.performances) {
    result += ` ${pref.play.name} : ${format(amountFor(pref) / 100)} (${pref.audience}석)\n`;
  }

  // 포인트를 적립한다.
  result += `총액 : ${format(totalAmount() / 100)}\n`;
  result += `적립 포인드 : ${totalVolumeCredits()}점`;
  return result;

  function totalAmount() {
    let result = 0;
    for (const pref of data.performances) {
      result += amountFor(pref);
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (const pref of data.performances) {
      result += volumeCreditsFor(pref);
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
}

function format(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber);
}
