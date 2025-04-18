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

export default function TabTwoScreen() {
  const tabBarHeight = useBottomTabBarHeight();
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
        <TextInput
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
              <Service_image_box
                key={item.service_id}
                name={item.service_name}
                image={item.service_image}
                description={item.service_description}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
