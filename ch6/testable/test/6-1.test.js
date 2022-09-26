import { printOwing } from '../6-1.js';

class Console {
  #content = '';
  constructor() {}

  log(message) {
    this.#content += `${message}\n`;
  }

  get content() {
    return this.#content;
  }
}

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

    const console = new Console();
    printOwing(invoice, console);
    expect(console.content).toBe(expected);
  });
});
