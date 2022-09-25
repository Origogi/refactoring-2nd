class Performance {
  #audience;
  #play;

  constructor(audience, play) {
    this.#audience = audience;
    this.#play = play;
  }

  get audience() {
    return this.#audience;
  }

  get play() {
    return this.#play;
  }

  get amount() {
    let thisAmount = 0;
    switch (this.#play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;
        if (this.#audience > 30) {
          thisAmount += 1000 * (this.#audience - 30);
        }
        break;
      case 'comedy': // 희극
        thisAmount = 30000;
        if (this.#audience > 20) {
          thisAmount += 10000 + 500 * (this.#audience - 20);
        }
        thisAmount += 300 * this.#audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.#play.type}`);
    }
    return thisAmount;
  }

  get credits() {
    let result = Math.max(this.#audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === this.#play.type) {
      result += Math.floor(this.#audience / 5);
    }
    return result;
  }
}

export function createStatememt(invoice, plays) {
  const result = {};

  result.customer = invoice.customer;
  result.performances = invoice.performances.map(
    (p) => new Performance(p.audience, plays[p.playID])
  );
  result.totalAmount = totalAmount(result.performances);
  result.totalCredits = totalCredits(result.performances);

  return result;

  function totalAmount(performances) {
    return performances.reduce((sum, perf) => perf.amount + sum, 0);
  }

  function totalCredits(performances) {
    return performances.map((perf) => perf.credits).reduce((a, b) => a + b, 0);
  }
}
