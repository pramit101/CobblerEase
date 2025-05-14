import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetails() {
  const params = useLocalSearchParams();
  const order = params?.order ? JSON.parse(params.order) : null;

  if (!order) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Order not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Order Summary</Text>
          <Text style={styles.item}><Text style={styles.label}>Order ID:</Text> {order.id}</Text>
          <Text style={styles.item}><Text style={styles.label}>Placed:</Text> {order.date}</Text>
          <Text style={styles.item}><Text style={styles.label}>Estimated Delivery:</Text> {order.estimated}</Text>
          <Text style={styles.item}><Text style={styles.label}>Status:</Text> {order.status}</Text>
          <Text style={styles.item}><Text style={styles.label}>Customer:</Text> {order.customerName}</Text>
          <Text style={styles.item}><Text style={styles.label}>Total Price:</Text> ${order.totalPrice}</Text>

          {/* Progress Bar inside details page */}
          <View style={styles.progressContainer}>
            {['Placed', 'Processing', 'Out for Delivery', 'Delivered'].map((step, index) => (
              <View key={step} style={styles.step}>
                <View style={[
                  styles.circle,
                  step === order.status || index < getStatusIndex(order.status) ? styles.activeCircle : null
                ]} />
                <Text style={[
                  styles.label,
                  step === order.status || index < getStatusIndex(order.status) ? styles.activeLabel : null
                ]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.subheader}>Items</Text>
          {order.items?.map((i, idx) => (
            <Text key={idx} style={styles.listItem}>
              • {i.productId} - ${i.price}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.subheader}>Services</Text>
          {order.services?.length > 0 ? (
            order.services.map((s, idx) => (
              <Text key={idx} style={styles.listItem}>
                • {s.name}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>No Services</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusIndex = (status) => {
  const steps = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
  return steps.indexOf(status);
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 2 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  subheader: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  item: { fontSize: 16, marginVertical: 4, color: '#555' },
  label: { fontWeight: '600', color: '#333' },
  listItem: { fontSize: 15, color: '#555', marginVertical: 2 },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  step: { alignItems: 'center', flex: 1 },
  circle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#ccc' },
  activeCircle: { backgroundColor: '#4caf50' },
  labelText: { marginTop: 5, fontSize: 12, color: '#999', textAlign: 'center' },
  activeLabel: { color: '#4caf50', fontWeight: '600' },
});
