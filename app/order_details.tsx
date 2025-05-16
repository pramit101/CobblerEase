//This page adds the order details to the UI for the user to see
// Has tranlation feature using fireBase translate extention
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function OrderDetails() {
  // Get the order details from the URL parameters
  // This is done using the useLocalSearchParams hook
  // The order details are passed as JSON strings in the URL
  const params = useLocalSearchParams();
  const order = params?.order ? JSON.parse(params.order.toString()) : null;
  const service = params?.services
    ? JSON.parse(params.services.toString())
    : null;
  const product = params?.products
    ? JSON.parse(params.products.toString())
    : null;
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Check if the order is null
  if (!order) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Order not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Order Summary</Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Order ID:</Text> {params.id}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Placed:</Text> {params.date}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Estimated Collection:</Text>{" "}
            {order.estimated}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Status:</Text> {order.status}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Customer:</Text> {order.customerName}
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Total Price:</Text> ${order.totalPrice}
          </Text>

          {/* Progress Bar inside details page */}
          <View style={styles.progressContainer}>
            {["Placed", "Processing", "Pickup"].map((step, index) => (
              <View key={step} style={styles.step}>
                <View
                  style={[
                    styles.circle,
                    step === order.status ||
                    index < getStatusIndex(order.status)
                      ? styles.activeCircle
                      : null,
                  ]}
                />
                <Text
                  style={[
                    styles.label,
                    step === order.status ||
                    index < getStatusIndex(order.status)
                      ? styles.activeLabel
                      : null,
                  ]}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.subheader}>Items</Text>
          <View style={styles.rowAlign}>
            {/* Take each item and display separately according to translation */}
            <View>
              {product.map((i, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {i.translated[selectedLanguage]}
                </Text>
              ))}
            </View>
            <View>
              {order.items?.map((i, idx) => (
                <Text key={idx} style={styles.listItem}>
                  - ${i.price}
                </Text>
              ))}
            </View>
          </View>
        </View>
        {/* Take the service array from params and use it to display translated name and description*/}
        <View style={styles.card}>
          <Text style={styles.subheader}>Services</Text>
          {service.length > 0 ? (
            service.map((s, idx) => (
              <Text key={idx} style={styles.listItem}>
                <Text style={{ fontWeight: "bold" }}>
                  {s.name_translated[selectedLanguage]} -
                </Text>
                <Text> {s.translated[selectedLanguage]}</Text>
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>No Services</Text>
          )}
        </View>
        <Text style={{ color: "red" }}>
          Can't see the items or services? Go back and press the "Track order"
          button again.
        </Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={{}}
        >
          {/* Picker extention used for language selection*/}
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Deutsch" value="de" />
        </Picker>
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /* Status bar options*/
}

const getStatusIndex = (status) => {
  const steps = ["Placed", "Processing", "Out for Delivery", "Delivered"];
  return steps.indexOf(status);
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  subheader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  item: { fontSize: 16, marginVertical: 4, color: "#555" },
  label: { fontWeight: "600", color: "#333" },
  listItem: { fontSize: 15, color: "#555", marginVertical: 2 },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  step: { alignItems: "center", flex: 1 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#ccc" },
  activeCircle: { backgroundColor: "#4caf50" },
  labelText: { marginTop: 5, fontSize: 12, color: "#999", textAlign: "center" },
  activeLabel: { color: "#4caf50", fontWeight: "600" },
  rowAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
