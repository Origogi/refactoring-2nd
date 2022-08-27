export function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: 'SEP' };
  } else if (employee.isRetired) {
    result = { amount: 0, reasonCode: 'RET' };
  } else {
    result = { amount: 999, reasonCode: 'UNICORN' };
  }
  return result;
}
