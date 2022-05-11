const fs = require('fs');
const invoiceData = fs.readFileSync(`${__dirname}\\invoice.json`, { encoding: 'utf-8', flag: 'r' });
const invoiceObj = JSON.parse(invoiceData);

const playData = fs.readFileSync(`${__dirname}\\plays.json`, { encoding: 'utf-8', flag: 'r' });
const playObj = JSON.parse(playData);

const result = statement(invoiceObj[0], playObj);

console.log(result);

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  function amountFor(aPerfomance) {
    let result = 0;

    switch (playFor(aPerfomance).type) {
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
        throw new Error(`알 수 없는 장르 : ${playFor(aPerfomance).type}`);
    }
    return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID];
  }

  for (const pref of invoice.performances) {
    const thisAmount = amountFor(pref);

    // 포인트를 적립한다.
    volumeCredits += Math.max(pref.audience - 30, 0);

    if ('comedy' ==  playFor(pref).type) {
      volumeCredits += Math.floor(pref.audience / 5);
    }

    // 청구 내역을 출력한다.
    result += ` ${ playFor(pref).name} : ${format(thisAmount / 100)} (${pref.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인드 : ${volumeCredits}점`;
  return result;
}
