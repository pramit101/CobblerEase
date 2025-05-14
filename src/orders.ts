// src/orders.ts
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";   

// Define the shape of an order item
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

const orderId = "ORD" + Math.floor(Math.random() * 1000000).toString(); // Generate a random order ID
// Define the shape of an order
export interface Order {
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt?: any; // Firestore timestamp
}

/**
 * Save an order to Firestore’s "orders" collection.
 * @param order  Order data (without createdAt)
 * @returns      Newly created document ID
 */
export async function saveOrder(
  order: Omit<Order, "createdAt">
): Promise<string> {
  const withTs = {
    ...order,
    createdAt: serverTimestamp(),
    status: "Placed", // Default status
    estimated: "Pending Confirmation", // 7 days from now
  };
  const ref = await setDoc(doc(db, "orders", orderId), withTs);
  return orderId
}
