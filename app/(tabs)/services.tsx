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
import { products } from "../../data/products";
import { ImageBox } from "../../helperFiles/imageBox";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from "react-native";

export default function TabTwoScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View className="main" style={styles.main}>
        <View className="sub_heading" style={styles.sub_heading}>
          <Text className="sub_heading_text" style={styles.sub_heading_text}>
            Browse Products
          </Text>
        </View>
        <TextInput
          placeholder={"Enter the name of the product"}
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
            keyExtractor={(item) => item.product_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ImageBox
                key={item.product_id}
                id={item.product_id}
                name={item.product_name}
                image={item.product_image}
                description={item.product_description}
                price={item.product_price}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
