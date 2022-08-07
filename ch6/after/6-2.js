// 6.2 함수 인라인 하기

// 예제 1
export function rating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}

// 예제 2
function reportLines(customer) {
  const reult = [];
  reult.push(['name', customer.name]);
  reult.push(['location', customer.location]);
  return reult;
}
