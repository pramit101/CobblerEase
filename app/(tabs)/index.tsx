import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Styles/homePage";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [userName, setUserName] = useState<string | null>(null); // null when not logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName) {
        const firstName = user.displayName.split(" ")[0];
        setUserName(firstName);
      } else {
        setUserName(null); // Not signed in
      }
    });

    return unsubscribe;
  }, []);

  const storeLocation = {
    latitude: -37.81,
    longitude: 144.962,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleNamePress = () => {
    Alert.alert(
      `${userName}`,
      "Do you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            auth.signOut(); // Sign out user
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View style={styles.heading}>
            <Image
              source={require("../../assets/images/main_logo.png")}
              style={{ width: "50%", height: 200 }}
            />
            <Text style={{ fontWeight: "300", fontSize: 25, marginBottom: 10 }}>
              |
            </Text>

            {/* ✅ Show name button or Login/Signup options */}
            {userName ? (
              <TouchableOpacity
                onPress={handleNamePress}
                style={{
                  marginTop: 10,
                  backgroundColor: "#007AFF",
                  padding: 10,
                  borderRadius: 5,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {userName}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => router.push("../login_page")}
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("../signup_page")}
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ paddingBottom: tabBarHeight + 10 }}>
              <Text style={styleText.body_text}>
                Welcome to Cobbler Ease Co., your local destination for
                high-quality footwear repairs and custom shoe services!
              </Text>

              <View style={{ height: 300, margin: 10 }}>
                <MapView style={{ flex: 1 }} initialRegion={storeLocation}>
                  <Marker
                    coordinate={storeLocation}
                    title="CobblerEase Store"
                    description="Find us here!"
                  />
                </MapView>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styleText = StyleSheet.create({
  body_text: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Roboto",
    margin: 10,
  },
});
