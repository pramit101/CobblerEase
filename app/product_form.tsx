// src/screens/product_form.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { saveData } from "../helperFiles/storage";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { styles } from "../Styles/products_form";
import { imageMap } from "../data/imageMaps";

export default function ProductForm() {
  // Grab the query params
  const {
    product_id,
    product_name,
    product_image,
    product_price,
    product_description,
  } = useLocalSearchParams() as Record<string, string>;

  const [user, setUser] = useState<User | null>(null);

  // Watch auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const handleAdd = () => {
    if (!user) {
      // Build a redirect back to this exact product page
      const redirectPath = `/product_form?` +
        `product_id=${encodeURIComponent(product_id)}` +
        `&product_name=${encodeURIComponent(product_name)}` +
        `&product_image=${encodeURIComponent(product_image)}` +
        `&product_price=${encodeURIComponent(product_price)}` +
        `&product_description=${encodeURIComponent(product_description)}`;

      return Alert.alert(
        "Login Required",
        "You need to log in to add items to your cart.",
        [
          { text: "Cancel" },
          {
            text: "Login",
            onPress: () =>
              router.push(`/Login_page?redirect=${encodeURIComponent(redirectPath)}`),
          },
        ]
      );
    }

    // User is signed in → add to cart
    Alert.alert("Product Added", "Product has been added to your cart");
    saveData({
      id: product_id,
      name: product_name,
      price: product_price,
    });
    router.push("/(tabs)/browse");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.main}>
        <Image
          source={imageMap[product_image]}
          style={{ width: "70%", height: 200, borderWidth: 2 }}
          resizeMode="stretch"
        />

        <Text style={styles.textHeader}>Product ID: {product_id}</Text>
        <Text style={styles.textHeader}>Product Name</Text>
        <Text style={styles.myText}>{product_name}</Text>
        <Text style={styles.textHeader}>Product Description</Text>
        <Text style={styles.myText}>{product_description}</Text>
        <Text style={styles.textHeader}>Product Price</Text>
        <Text style={styles.myText}>{"$" + product_price}</Text>

        <View style={styles.buttons_view}>
          <TouchableOpacity onPress={handleAdd} disabled={!user}>
            <Text style={[styles.buttons, !user && { opacity: 0.5 }]}>
              {user ? "Add to Cart" : "Login to Add to Cart"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(tabs)/Cart")}>
            <Text style={styles.buttons}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
