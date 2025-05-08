// App.tsx
import "react-native-gesture-handler"; // ← must be first
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen     from "./src/screens/HomeScreen";
import LoginScreen    from "./src/screens/LoginScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"     component={HomeScreen}     />
        <Stack.Screen name="Login"    component={LoginScreen}    />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
