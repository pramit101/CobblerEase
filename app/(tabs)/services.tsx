import { StyleSheet, Image, Platform, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Styles/servicesPage";

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="main" style={styles.main}>
          <View className="sub_heading" style={styles.sub_heading}>
            <Text className="sub_heading_text" style={styles.sub_heading_text}>
              Services
            </Text>
          </View>
          <Text className="initial" style={styles.initial}>
            This is the Services page.
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
