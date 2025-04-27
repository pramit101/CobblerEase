import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  saveData,
  retrieveData,
  save_service_data,
  retrieve_service_data,
  clearData,
  removeItem,
  removeServiceItem,
} from "../../helperFiles/storage";
import { styles } from "../../Styles/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView } from "react-native-gesture-handler";

const cart = () => {
  const [my_items, setMyItems] = useState<any[]>([]);
  const [my_services, setMyServices] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveData();
      const services = await retrieve_service_data();
      setMyServices(services);
      setMyItems(data);
    };

    fetchData();
  }, []);

  const clearDataHandler = async () => {
    await clearData();
    setMyItems([]);
    setMyServices([]);
  };

  const tabBarHeight = useBottomTabBarHeight();
  // Get the height of the tab bar so that we can adjust the padding of the service list

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: tabBarHeight + 10,
          }}
        >
          <Text style={styles.heading}>Products</Text>
          {my_items.length === 0 ? (
            <Text style={{ fontSize: 20, textAlign: "center", margin: 50 }}>
              No Products added to the Cart
            </Text>
          ) : (
            my_items.map((item, index) => (
              <View key={index} style={styles.productItem}>
                <View>
                  <Text style={{ fontSize: 10 }}>{"#" + item.id}</Text>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ color: "green" }}>${item.price}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={async () => {
                      await removeItem(item.name);
                      setMyItems((prevItems) =>
                        prevItems.filter(
                          (product) => product.name !== item.name
                        )
                      );
                    }}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>x</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <Text style={styles.heading}> Services </Text>
          {my_services.length === 0 ? (
            <Text style={{ fontSize: 20, textAlign: "center", margin: 50 }}>
              No Services added to the Cart
            </Text>
          ) : (
            my_services.map((item, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={{ width: "80%" }}>
                  <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                    {item.name}
                  </Text>
                  <Text style={{}}>{item.description}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={async () => {
                      await removeServiceItem(item.name);
                      setMyServices((prevItems) =>
                        prevItems.filter(
                          (service) => service.name !== item.name
                        )
                      );
                    }}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>x</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={clearDataHandler}>
              <Text style={styles.Clearbutton}>CLEAR CART</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.Submitbutton}>SUBMIT ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default cart;
