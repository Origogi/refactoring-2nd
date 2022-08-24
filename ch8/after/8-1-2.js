export class Account {
  constructor(accountType, daysOverdrawn) {
    this.type = accountType;
    this._daysOverdrawn = daysOverdrawn;
  }

  get bankCharge() {
    return 4.5 + this._daysOverdrawn > 0 ? this.type.overdraftCharge(this._daysOverdrawn) : 0;
  }

  get daysOverdrawn() {
    return this._daysOverdrawn;
  }
}

export class AccountType {
  constructor(type) {
    this._type = type;
  }
  get isPremium() {
    return this._type === 'Premium';
  }

  overdraftCharge(daysOverdrawn) {
    if (!this.type.isPremium) {
      return daysOverdrawn * 1.75;
    }

    return 10 + (daysOverdrawn <= 7 ? 0 : (daysOverdrawn - 7) * 0.85);
  }
}
