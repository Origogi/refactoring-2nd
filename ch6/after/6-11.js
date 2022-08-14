export function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;

  return (
    basePrice -
    calculateDiscount(product, quantity) +
    calculateShippingCost(basePrice, quantity, shippingMethod)
  );
}

function calculateDiscount(product, quantity) {
  return (
    Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate
  );
}

function getShippingPerCase(basePrice, shippingMethod) {
  return basePrice > shippingMethod.discountThreshold
    ? shippingMethod.discountedFee
    : shippingMethod.feePerCase;
}

function calculateShippingCost(basePrice, quantity, shippingMethod) {
  return quantity * getShippingPerCase(basePrice, shippingMethod);
}

// 사용 예:
const product = {
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
};

const shippingMethod = {
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
};

const price = priceOrder(product, 5, shippingMethod);
console.log(price);
