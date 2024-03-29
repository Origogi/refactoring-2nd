export class Customer {
  #name;
  #contract;
  constructor(name, discountRate) {
    this.#name = name;
    this.#contract = new CustomerContract(this.dateToday(), discountRate);
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.#contract.discountRate));
  }

  dateToday() {
    return new Date();
  }

  becomePreferred() {
    this.#contract.discountRate += 0.03;
    // 다른 코드들이 있음...
  }
}

class CustomerContract {
  #startDate;
  #discountRate;
  constructor(startDate, discountRate) {
    this.#startDate = startDate;
    this.#discountRate = discountRate;
  }

  get discountRate() {
    return this.#discountRate;
  }

  set discountRate(discountRate) {
    this.#discountRate = discountRate;
  }


}
