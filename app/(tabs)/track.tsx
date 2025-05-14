import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../Styles/servicesPage";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { localStyles } from "../../Styles/track";

export default function TrackPage() {
  const [trackId, setTrackId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [error, setError] = useState("");

  async function getOrderById(orderId: string) {
    try {
      const ref = doc(db, "orders", orderId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data();
      } else {
        return null; // Return null if the order is not found
      }
    } catch (error) {
      console.log("Error fetching order:", error);
      throw new Error("Failed to fetch order. Please try again later.");
    }
  }

  const handleTrackOrder = async () => {
    const order = await getOrderById(trackId);
    if (order) {
      setFoundOrder(order);
      setError("");
    } else {
      setFoundOrder(null);
      setError("Order not found. Please check your Order ID.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View className="sub_heading" style={localStyles.sub_heading}>
            <Text
              className="sub_heading_text"
              style={localStyles.sub_heading_text}
            >
              Track Your Order
            </Text>
          </View>

          <TextInput
            placeholder="Enter Order ID (e.g., ORD123458)"
            value={trackId}
            onChangeText={setTrackId}
            style={localStyles.input}
          />
          <TouchableOpacity
            style={localStyles.button}
            onPress={handleTrackOrder}
          >
            <Text style={localStyles.buttonText}>Track Order</Text>
          </TouchableOpacity>

          {error ? <Text style={localStyles.error}>{error}</Text> : null}

          {foundOrder && (
            <ScrollView style={{ marginTop: 20 }}>
              <View style={localStyles.card}>
                <Text style={localStyles.item}>Status:</Text>
                <Text style={localStyles.info}>Order ID: {trackId}</Text>
                <Text style={localStyles.info}>
                  Order placement date:{" "}
                  {foundOrder.createdAt?.toDate().toLocaleDateString()}
                </Text>
                <Text style={localStyles.info}>
                  Estimated Collection date: {foundOrder.estimated}
                </Text>
                <View style={localStyles.progressContainer}>
                  {["Placed", "Processing", "Pickup"].map((step, index) => (
                    <View key={step} style={localStyles.step}>
                      <View
                        style={[
                          localStyles.circle,
                          step === foundOrder.status ||
                          index < getStatusIndex(foundOrder.status)
                            ? localStyles.activeCircle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          localStyles.label,
                          step === foundOrder.status ||
                          index < getStatusIndex(foundOrder.status)
                            ? localStyles.activeLabel
                            : null,
                        ]}
                      >
                        {step}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* ✅ Updated View Details to navigate to details page */}
                <TouchableOpacity
                  style={localStyles.button}
                  onPress={() =>
                    router.push({
                      pathname: "/order_details",
                      params: {
                        order: JSON.stringify(foundOrder),
                        id: trackId,
                        date: foundOrder.createdAt
                          ?.toDate()
                          .toLocaleDateString(),
                      },
                    })
                  }
                >
                  <Text style={localStyles.buttonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const getStatusIndex = (status) => {
  const steps = ["Placed", "Processing", "Out for Delivery", "Delivered"];
  return steps.indexOf(status);
};
