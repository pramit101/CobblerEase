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
import {
  save_service_data,
  retrieve_service_data,
} from "../helperFiles/storage";
import { router } from "expo-router";
import { styles } from "../Styles/products_form";
import { imageMap } from "../data/imageMaps";

const service_form = () => {
  const { service_name, service_image, service_description } =
    useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.main}>
        <Image
          source={imageMap[service_image.toString()]}
          style={{ width: "70%", height: 200, borderWidth: 2 }}
          resizeMode="stretch"
        />
        <Text style={styles.textHeader}>Service Name</Text>
        <Text style={styles.myText}> {service_name.toString()}</Text>
        <Text style={styles.textHeader}>Service Description</Text>
        <Text style={styles.myText}>{service_description.toString()}</Text>
        <View style={styles.buttons_view}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Service Added!",
                "The service has been added to your cart"
              );
              save_service_data({
                name: service_name.toString(),
                description: service_description.toString(),
              });
              router.push("/(tabs)/services");
            }}
          >
            <Text style={styles.buttons}>Add to cart </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("./cart");
            }}
          >
            <Text style={styles.buttons}>View cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default service_form;
