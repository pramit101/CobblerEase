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
  const orderId = "ORD" + Math.floor(Math.random() * 1000000).toString(); // Generate a random order ID

  const withTs = {
    ...order,
    createdAt: serverTimestamp(),
    status: "Placed", // Default status
    estimated: "Pending Confirmation", // 7 days from now
  };
  const ref = await setDoc(doc(db, "orders", orderId), withTs);
  return orderId
}
export async function saveProducts(
  name, id
) {
  const withTs = {
    name: name,
  };
  const ref = await setDoc(doc(db, "products", id), withTs);
}
export async function saveServices(
  name, description , id
) {
  const withTs = {
    name: name,
    description: description,
  };
  const ref = await setDoc(doc(db, "services", id), withTs);
}