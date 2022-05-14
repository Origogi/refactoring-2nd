import createStatementData from '/chapter1/createStatementData.js';


async function run() {
  const invoiceData = await (await fetch('/chapter1/invoice.json')).json();
  const playData = await (await fetch('/chapter1/plays.json')).json();
  const result = statement(invoiceData[0], playData);

  console.log(result);
}

run();

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
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
