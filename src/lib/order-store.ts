// In-memory order store (replace with database in production)
const orderStore = new Map<
  string,
  { items: { productName: string; weight: number; quantity: number; priceINR: number }[]; totalINR: number }
>();

export function saveOrder(
  orderId: string,
  items: { productName: string; weight: number; quantity: number; priceINR: number }[],
  totalINR: number
) {
  orderStore.set(orderId, { items, totalINR });
}

export function getOrder(orderId: string) {
  return orderStore.get(orderId);
}
