class Organization {
    #name;
    #country;

    constructor(name, country) {
        this.#country = country;
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get country() {
        return this.#country;
    }
}

const organization = new Organization('Acme Gooseberries', "GB")

organization.name = 'Dream Coding';
console.log(organization.name);
console.log(organization.country);
