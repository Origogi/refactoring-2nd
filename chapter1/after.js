import createStatementData from '/chapter1/createStatementData.js';

document.body.onload = run;

async function run() {
  const invoiceData = await (await fetch('/chapter1/invoice.json')).json();
  const playData = await (await fetch('/chapter1/plays.json')).json();
  const result = htmlStatement(invoiceData[0], playData);

  var newDiv = document.createElement('div');
  newDiv.innerHTML = result;
  document.body.appendChild(newDiv);
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명 : ${data.customer})</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n';

  for (const pref of data.performances) {
    result += `  <tr><td>${pref.play.name}</td><td>(${pref.audience}석)</td>`;
    result += `<td>${usd(pref.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>총액 : <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트 : <em>${data.totalVolumeCredits}</em>점</p>\n`;

  return result;
}

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
