export function printOwing(invoice) {
  let outstanding = 0;

  let result = '';

  result += '***********************\n';
  result += '**** Customer Owes ****\n';
  result += '***********************\n';

  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due date
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  //print details
  result += `name: ${invoice.customer}\n`;
  result += `amount: ${outstanding}\n`;
  result += `due: ${invoice.dueDate.toLocaleDateString()}\n`;

  return result;
}

const invoice = {
  orders: [{ amount: 2 }, { amount: 5 }],
  customer: '엘리',
};
console.log(printOwing(invoice));
