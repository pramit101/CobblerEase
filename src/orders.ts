// src/orders.ts
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";    // ← go up one level, not same folder

// Define the shape of an order item
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

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
  };
  const ref = await addDoc(collection(db, "orders"), withTs);
  return ref.id;
}
