class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'employee';
  }

  toString() {
    return `${this.#name} (${this.type})`;
  }

  static validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  static createEmployee(name, type) {
    switch (type) {
      case 'engineer':
        return new Engineer(name, type);
      case 'salesperson':
        return new Salesperson(name, type);
      case 'manager':
        return new Manager(name, type);
      default:
        throw new Error(`${type}라는 직원 유형은 없습니다.`);
    }
  }
}

class Engineer extends Employee {
  get type() {
    return 'engineer';
  }
}

class Manager extends Employee {
  get type() {
    return 'manager';
  }
}

class Salesperson extends Employee {
  get type() {
    return 'salesperson';
  }
}

const ellie = Employee.createEmployee('엘리', 'engineer');
const bob = Employee.createEmployee('밥', 'manager');

console.log(ellie.toString());
console.log(bob.toString());

const test = Employee.createEmployee('밥', 'manageer');
