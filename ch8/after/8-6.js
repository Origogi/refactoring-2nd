// 예제 1
const order = retreiveOrder();
let charge;
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;

// 예제 2
function someFunc() {
  const result = availableResources.length === 0 ? createResource() : availableResources.pop();

  allocatedResources.push(result);
  return result;
}
