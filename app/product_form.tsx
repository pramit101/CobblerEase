import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { saveData, retrieveData } from "../helperFiles/storage";
import { router } from "expo-router";
import { styles } from "../Styles/products_form";
import { imageMap } from "../data/imageMaps";

const product_form = () => {
  const {
    product_id,
    product_name,
    product_image,
    product_price,
    product_description,
  } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.main}>
        <Image
          source={imageMap[product_image.toString()]}
          style={{ width: "70%", height: 200, borderWidth: 2 }}
          resizeMode="stretch"
        />
        <Text style={styles.textHeader}>Product ID: {product_id}</Text>
        <Text style={styles.textHeader}>Product Name</Text>
        <Text style={styles.myText}> {product_name.toString()}</Text>
        <Text style={styles.textHeader}>Product Description</Text>
        <Text style={styles.myText}>{product_description.toString()}</Text>
        <Text style={styles.textHeader}>Product Price</Text>
        <Text style={styles.myText}>{"$" + product_price.toString()}</Text>
        <View style={styles.buttons_view}>
          <TouchableOpacity
            //style={styles.buttons}
            onPress={() => {
              Alert.alert(
                "Product Added",
                "Product has been added to your cart"
              );
              saveData({
                id: product_id.toString(),
                name: product_name.toString(),
                price: product_price.toString(),
              });
              router.push("/(tabs)/browse");
            }}
          >
            <Text style={styles.buttons}>Add to cart </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/Cart");
            }}
            //style={styles.buttons}
          >
            <Text style={styles.buttons}>View cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default product_form;
