import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Styles/browsePage";
import { services } from "../../data/services";
import { Service_image_box } from "../../helperFiles/service_image_box";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { router } from "expo-router";

export default function ServicesScreen() {
  // This is the main screen for browsing services
  // It contains a search bar and a list of services
  // The services are filtered based on the search query
  // The user can click on a service to view its details

  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the tab bar so that we can adjust the padding of the service list
  const [query, setQuery] = useState("");

  const filteredProducts = services.filter((service) =>
    service.service_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View className="main" style={styles.main}>
        <View className="sub_heading" style={styles.sub_heading}>
          <Text className="sub_heading_text" style={styles.sub_heading_text}>
            Services
          </Text>
        </View>
        <TextInput // Search bar to filter services
          placeholder={"Enter the name of the service"}
          value={query}
          onChangeText={setQuery}
          style={styles.searchBar}
        />
        <View
          className="product_list"
          style={{ paddingBottom: tabBarHeight + 10, flex: 1 }}
        >
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.service_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/service_form",
                    params: {
                      service_id: item.service_id,
                      service_name: item.service_name,
                      service_description: item.service_description,
                      service_image: item.service_image,
                    },
                  });
                }}
                style={{ display: "flex", width: "30%" }}
              >
                <Service_image_box // Using a custom component (look inside helperFiles)
                  //  to display the product details in organized cards form.
                  key={item.service_id}
                  name={item.service_name}
                  image={item.service_image}
                  description={item.service_description}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
