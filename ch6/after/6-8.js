export function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

export class NumberRange {
  #min;
  #max;

  constructor(min, max) {
    this.#max = max;
    this.#min = min;
  }

  get min() {
    return this.#min
  }

  get max() {
    return this.#max
  }

  contains(value)  {
    return this.#min <= value && this.#max >= value 
  }
}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};
const operationPlan = new NumberRange(51, 53)

const result = readingsOutsideRange(
  station,
  operationPlan
);

console.log(result);
