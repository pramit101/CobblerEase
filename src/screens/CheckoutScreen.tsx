// src/screens/CheckoutScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { saveOrder, OrderItem } from "../orders";

type CheckoutScreenProps = {
  navigation: any; // you can replace with your typed navigator prop
};

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
  const [user, setUser] = useState<User | null>(null);

  // 1️⃣ Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  // 2️⃣ When pressed, either send to Login or save the order
  const handlePlaceOrder = async () => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }

    // TODO: replace these placeholders with your actual cart data
    const orderData = {
      customerName: user.email || "Unknown",
      items: [
        // Example items; swap this with your cart items array
        { productId: "shoe123", quantity: 2, price: 49.99 },
        { productId: "lace456", quantity: 1, price: 3.5 },
      ] as OrderItem[],
      totalPrice: 103.48, // compute your cart’s total here
    };

    try {
      const id = await saveOrder(orderData);
      Alert.alert("Success!", `Your order ID is ${id}`);
      // e.g. navigation.navigate("OrderConfirmation", { id });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      {!user && (
        <Text style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
          You must be logged in to place an order.
        </Text>
      )}

      <Button
        title={user ? "Place Order" : "Login to Place Order"}
        onPress={user ? handlePlaceOrder : () => navigation.navigate("Login")}
        disabled={!user}
      />
    </View>
  );
}
