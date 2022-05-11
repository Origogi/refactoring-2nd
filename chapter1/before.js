const fs = require('fs');
const invoiceData = fs.readFileSync(`${__dirname}\\invoice.json`, { encoding: 'utf-8', flag: 'r' });
const invoiceObj = JSON.parse(invoiceData);

const playData = fs.readFileSync( `${__dirname}\\plays.json`, { encoding: 'utf-8', flag: 'r' });
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

  for (const pref of invoice.performances) {

    const play = plays[pref.playID];

    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (pref.audience > 30) {
          thisAmount += 1000 * (pref.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;
        if (pref.audience > 20) {
          thisAmount += 10000 + 500 * (pref.audience - 20);
        }
        thisAmount += 300 * pref.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    volumeCredits += Math.max(pref.audience - 30, 0);

    if ('comedy' == play.type) {
      volumeCredits += Math.floor(pref.audience / 5);
    }

    result += ` ${play.name} : ${format(thisAmount / 100)} (${pref.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인드 : ${volumeCredits}점`;
  return result;
}
