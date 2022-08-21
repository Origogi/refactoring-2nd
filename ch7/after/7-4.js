class Order {
  #quantity;
  #item;
  constructor(quantity, item) {
    this.#quantity = quantity;
    this.#item = item;
  }

  get basePrice() {
    return this.#quantity * this.#item.price;
  }

  get discountFactor() {
    return this.basePrice > 1000 ? 0.95 : 0.98;
  }

  get price() {
    const discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return this.basePrice * discountFactor;
  }
}
