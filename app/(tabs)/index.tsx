import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Styles/homePage";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";

export default function HomeScreen() {
  // This is the main screen for the app
  // It contains a logo, a guest account section, and a welcome message
  // The user can click on the logo to navigate to the login page
  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the tab bar so that we can adjust the padding of the content
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="main" style={styles.main}>
          <View className="heading" style={styles.heading}>
            <Image
              source={require("../../assets/images/main_logo.png")}
              style={{ width: "50%", height: 200 }}
            />
            <Text style={{ fontWeight: "300", fontSize: 25, marginBottom: 10 }}>
              |
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/signup_page");
              }}
              style={{ display: "flex", width: "30%" }}
            >
              <View className="account_section" style={styles.account_section}>
                <Text className="heading_text" style={styles.heading_text}>
                  Guest{" "}
                </Text>
                <FontAwesome name="user-circle" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View className="body" style={{ paddingBottom: tabBarHeight + 10 }}>
              <Text className="body_text" style={styleText.body_text}>
                Welcome to Cobbler Ease Co., your local destination for
                high-quality footwear repairs and custom shoe services! With
                over 20 years of expertise, we are committed to delivering
                professional cobbler services that breathe new life into your
                favorite shoes.
              </Text>
              <Text className="body_text" style={styleText.body_text}>
                Whether it's re-soling, stitching, polishing, or restoring your
                leather items, our skilled artisans provide exceptional care for
                all types of footwear, bags, and accessories. In addition to
                repairs, we offer a selection of premium shoe care products,
                from polishes to waterproofing solutions, to keep your footwear
                looking pristine. Our convenient online platform makes it easy
                to browse and order products, as well as book services such as
                shoe repairs, custom fittings, and maintenance.
              </Text>
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
