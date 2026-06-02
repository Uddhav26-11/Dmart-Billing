export const ITEM_PRICES = {
  "Item 1": 10,
  "Item 2": 20,
  "Item 3": 30,
  "Item 4": 40,
  "Item 5": 50,
  "Item 6": 60,
  "Item 7": 70,
  "Item 8": 80,
  "Item 9": 90,
  "Item 10": 100,
};

// Per item discount calculate karo
export function getItemDiscount(itemName, quantity) {
  if (itemName === "Item 1" && quantity > 4) return 5;  // 5% off
  if (itemName === "Item 5") return 10;                  // 10% off
  if (itemName === "Item 10") return 15;                 // 15% off
  return 0;
}

// Har item ka total calculate karo
export function calculateItemTotal(itemName, quantity) {
  const price = ITEM_PRICES[itemName];
  const discount = getItemDiscount(itemName, quantity);
  const amount = price * quantity;
  const discountAmount = (amount * discount) / 100;
  return amount - discountAmount;
}

// Poora bill calculate karo
export function calculateBill(items) {
  // Step 1 — Har item ka total jodo
  let subtotal = 0;
  items.forEach((item) => {
    subtotal += calculateItemTotal(item.name, item.quantity);
  });

  // Step 2 — Bill level discount
  let billDiscount = 0;
  if (subtotal > 10000) billDiscount = 15;
  else if (subtotal >= 5000) billDiscount = 10;

  const billDiscountAmount = (subtotal * billDiscount) / 100;
  const afterDiscount = subtotal - billDiscountAmount;

  // Step 3 — GST 10% add karo
  const gst = (afterDiscount * 10) / 100;
  const afterGST = afterDiscount + gst;

  return {
    subtotal,
    billDiscount,
    billDiscountAmount,
    afterDiscount,
    gst,
    afterGST,
  };
}