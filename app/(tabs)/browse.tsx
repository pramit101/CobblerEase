import { StyleSheet, Image, Platform, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TabTwoScreen() {
  return (
    <View className="main" style={styles.main}>
      <Text className="initial" style={styles.initial}>
        This is the browse Products page.
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
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
