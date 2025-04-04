import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Styles/homePage";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="main" style={styles.main}>
          <View className="heading" style={styles.heading}>
            <Text className="heading_text" style={styles.heading_text}>
              CobblerEase
            </Text>
          </View>
          <View className="sub_heading" style={styles.sub_heading}>
            <Text className="sub_heading_text" style={styles.sub_heading_text}>
              Home
            </Text>
          </View>
          <Text>Pramit 21951900.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
