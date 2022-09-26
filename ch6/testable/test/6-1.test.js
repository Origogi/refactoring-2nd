import { printOwing } from '../6-1.js';

describe('printOwing', () => {
  it('should print owing', () => {
    const expected =
      `***********************\n` +
      `**** Customer Owes ****\n` +
      `***********************\n` +
      `name: 엘리\n` +
      `amount: 7\n` +
      `due: 2022. 10. 26.\n`;

    const invoice = {
      orders: [{ amount: 2 }, { amount: 5 }],
      customer: '엘리',
    };
    expect(printOwing(invoice)).toBe(expected);
  });
});
