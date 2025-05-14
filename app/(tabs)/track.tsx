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

export default function TrackPage() {
  const [trackId, setTrackId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    const storedOrders = await AsyncStorage.getItem("@orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    const order = orders.find((o) => o.id === trackId.trim());
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
          <View style={styles.sub_heading}>
            <Text style={styles.sub_heading_text}>Track your order</Text>
          </View>

          <TextInput
            placeholder="Enter Order ID (e.g., ORD12345)"
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
                <Text style={localStyles.item}>
                  {foundOrder.items?.[0]?.productId || "Service Order"}
                </Text>
                <Text style={localStyles.info}>Order ID: {foundOrder.id}</Text>
                <Text style={localStyles.info}>Placed: {foundOrder.date}</Text>
                <Text style={localStyles.info}>
                  Estimated Delivery: {foundOrder.estimated}
                </Text>

                <View style={localStyles.progressContainer}>
                  {[
                    "Placed",
                    "Processing",
                    "Out for Delivery",
                    "Delivered",
                  ].map((step, index) => (
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
                      params: { order: JSON.stringify(foundOrder) },
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

const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
  },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  item: { fontSize: 18, fontWeight: "600", marginBottom: 5, color: "#333" },
  info: { fontSize: 14, color: "#555", marginVertical: 1 },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  step: { alignItems: "center", flex: 1 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#ccc" },
  activeCircle: { backgroundColor: "#4caf50" },
  label: { marginTop: 5, fontSize: 12, color: "#999", textAlign: "center" },
  activeLabel: { color: "#4caf50", fontWeight: "600" },
  error: { color: "red", marginTop: 10 },
});
