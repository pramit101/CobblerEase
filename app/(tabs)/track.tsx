import { StyleSheet, Image, Platform, View, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="main" style={styles.main}>
      <Text className="initial" style={styles.initial}>
        This is the order tracking page.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  initial: {
    fontSize: 20,
    color: "orange",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
