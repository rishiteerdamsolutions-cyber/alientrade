import { getDb } from "./mongodb";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productName: string;
  weight: number;
  quantity: number;
  priceINR: number;
}

export interface Order {
  orderId: string;
  paymentId?: string;
  amountINR: number;
  items: OrderItem[];
  customer: OrderCustomer;
  createdAt: Date;
}

export async function saveOrderToDb(
  orderId: string,
  items: OrderItem[],
  totalINR: number,
  customer: OrderCustomer
): Promise<void> {
  const db = await getDb();
  await db.collection("orders").insertOne({
    orderId,
    amountINR: totalINR,
    items,
    customer,
    createdAt: new Date(),
  });
}

export async function updateOrderPaymentId(
  orderId: string,
  paymentId: string
): Promise<void> {
  const db = await getDb();
  await db.collection("orders").updateOne(
    { orderId },
    { $set: { paymentId, updatedAt: new Date() } }
  );
}

export async function getOrdersFromDb(): Promise<Order[]> {
  const db = await getDb();
  const orders = await db
    .collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return orders as unknown as Order[];
}

export async function getOrderFromDb(orderId: string) {
  const db = await getDb();
  return db.collection("orders").findOne({ orderId });
}
