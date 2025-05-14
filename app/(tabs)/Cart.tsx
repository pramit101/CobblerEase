// The shopping cart screen
// Uses local storage to store the cart items and has main link with the database

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  retrieveData,
  retrieve_service_data,
  clearData,
  removeItem,
  removeServiceItem,
} from "../../helperFiles/storage";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { saveOrder } from "../../src/orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "../../Styles/cart";

{
  /*}
const saveOrder = async (orderDetails) => {
  const orderId = "ORD" + Math.floor(10000 + Math.random() * 90000);
  const placedDate = new Date().toISOString().split("T")[0];
  const newOrder = {
    id: orderId,
    ...orderDetails,
    date: placedDate,
    status: "Placed",
    estimated: "2025-05-17",
  };

  // Save to AsyncStorage
  const existingOrders = await AsyncStorage.getItem("@orders");
  const orders = existingOrders ? JSON.parse(existingOrders) : [];
  orders.push(newOrder);
  await AsyncStorage.setItem("@orders", JSON.stringify(orders));
  return orderId;
};
*/
}
export default function CartScreen() {
  const [my_items, setMyItems] = useState<any[]>([]);
  const [my_services, setMyServices] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data and cart items from local storage and display after rendering
  // This is done using the useEffect hook
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    (async () => {
      setMyItems(await retrieveData());
      setMyServices(await retrieve_service_data());
    })();
    return unsub;
  }, []);

  // Clear cart data
  const clearDataHandler = async () => {
    await clearData();
    setMyItems([]);
    setMyServices([]);
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      Alert.alert(
        "Login Required", // Login is required to submit the order
        "You need to log in to submit your order.",
        [
          { text: "Cancel" },
          {
            text: "Login",
            onPress: () => router.push("../login_page"),
          },
        ]
      );
      return;
    }

    // create order item list to store in the database
    const orderPayload = {
      customerName: user.email || "Guest",
      items: my_items.map((item) => ({
        productId: item.id,
        quantity: 1,
        price: Number(item.price),
      })),
      totalPrice: my_items.reduce((sum, i) => sum + Number(i.price), 0),
      services: my_services,
    };

    try {
      const id = await saveOrder(orderPayload);
      Alert.alert("Order submitted!", `Your order ID is ${id}`);
      clearDataHandler();
      router.replace("/"); // back home
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not submit order.");
    }
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: tabBarHeight + 10,
          }}
        >
          <Text style={styles.heading}>Products</Text>
          {my_items.length === 0 ? ( // Conditional display of products and services
            // If there are no products or services, display a message
            <Text style={{ fontSize: 20, textAlign: "center", margin: 50 }}>
              No Products added to the Cart
            </Text>
          ) : (
            my_items.map((item, idx) => (
              <View key={idx} style={styles.productItem}>
                <View>
                  <Text style={{ fontSize: 10 }}>{"#" + item.id}</Text>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ color: "green" }}>${item.price}</Text>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    await removeItem(item.name);
                    setMyItems((prev) =>
                      prev.filter((p) => p.name !== item.name)
                    );
                  }}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          <Text style={styles.heading}>Services</Text>
          {my_services.length === 0 ? (
            <Text style={{ fontSize: 20, textAlign: "center", margin: 50 }}>
              No Services added to the Cart
            </Text>
          ) : (
            my_services.map((svc, idx) => (
              <View key={idx} style={styles.serviceItem}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  {svc.name}
                </Text>
                <Text>{svc.description}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    await removeServiceItem(svc.name);
                    setMyServices((prev) =>
                      prev.filter((s) => s.name !== svc.name)
                    );
                  }}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <View style={styles.buttonView}>
            <TouchableOpacity onPress={clearDataHandler}>
              <Text style={styles.Clearbutton}>CLEAR CART</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmitOrder} disabled={!user}>
              <Text style={[styles.Submitbutton, !user && { opacity: 0.5 }]}>
                {user ? "SUBMIT ORDER" : "Login to Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
