export class Order {
  constructor(data) {
    this.priority = new Priority(data.priority);
  }

  get isHighPriority() {
    return this.priority.isHighPriority;
  }
}

class Priority {
  #value;
  constructor(value) {
    if (Priority.legalValues().includes(value)) {
      this.#value = value;
    } else {
      throw Error(`${value} is not legal value`);
    }
  }

  get isHighPriority() {
    return 'high' === this.#value || 'rush' === this.#value;
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }
}

const orders = [
  new Order({ priority: 'normal' }),
  new Order({ priority: 'high' }),
  new Order({ priority: 'rush' }),
  // new Order({ priority: 'error' }),
];

const highPriorityCount = orders.filter((o) => o.isHighPriority).length;

console.log(highPriorityCount);
