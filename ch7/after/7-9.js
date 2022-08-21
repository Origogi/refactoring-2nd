function foundPerson(people) {
  const candidate = ['Don', 'John', "Kent"]
  return people.find((c) => candidate.includes(c)) || ''

}

console.log(foundPerson(['John']));
console.log(foundPerson(['Don', 'John']));
console.log(foundPerson(['Kent', 'Don', 'John']));
console.log(foundPerson(['Lisa', 'Don', 'Tom']));
