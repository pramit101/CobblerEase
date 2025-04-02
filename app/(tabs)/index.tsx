import { Image, StyleSheet, Platform, View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="main" style={styles.main}>
      <Text className="initial" style={styles.initial}>
        Hello World!
      </Text>
      <Text className="initial" style={styles.initial}>
        Pramit 21951900.
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
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
