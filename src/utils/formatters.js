// Format price with ZWL currency
export const formatPrice = (price) => {
  if (!price && price !== 0) return "ZWL 0";
  const formatter = new Intl.NumberFormat("en-ZW", {
    style: "currency",
    currency: "ZWL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

// Format price short (e.g., for cards)
export const formatPriceShort = (price) => {
  if (!price && price !== 0) return "ZWL 0";
  if (price >= 1000000) {
    return `ZWL ${(price / 1000000).toFixed(1)}M`;
  }
  return `ZWL ${(price / 1000).toFixed(0)}K`;
};

// Calculate total with proper formatting
export const calculateTotal = (items, discountAmount = 0, shippingCost = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return subtotal - discountAmount + shippingCost;
};
