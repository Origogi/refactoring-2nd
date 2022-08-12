import { getDefaultOwner } from './6-6.js';

const owner = getDefaultOwner();
// owner.firstName = '엘리';  setter 를 private으로
console.log(owner.firstName);
console.log(getDefaultOwner());
