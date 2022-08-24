class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = AccountType(type, interestRate);
  }

  get interestRate() {
    return this.type.interestRate;
  }
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}
