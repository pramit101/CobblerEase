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
import { router } from "expo-router";

export default function BrowseScreen() {
  // This is the main screen for browsing products
  // It contains a search bar and a list of products
  // The products are filtered based on the search query
  // The user can click on a product to view its details

  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the tab bar so that we can adjust the padding of the product list
  const [query, setQuery] = useState(""); // State variable to hold the search query

  // Filter the products based on the search query
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
            renderItem={(
              { item } // Render each product in the list, which is wrapped in a TouchableOpacity to make it clickable
            ) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/product_form",
                    params: {
                      // We send the product details to the product_form page
                      product_id: item.product_id,
                      product_name: item.product_name,
                      product_description: item.product_description,
                      product_price: item.product_price,
                      product_image: item.product_image,
                    },
                  });
                }}
                style={{ display: "flex", width: "30%" }}
              >
                <ImageBox // Using a custom component (look inside helperFiles)
                  //  to display the product details in organized cards form.
                  key={item.product_id}
                  id={item.product_id}
                  name={item.product_name}
                  image={item.product_image}
                  description={item.product_description}
                  price={item.product_price}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
