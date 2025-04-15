import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("handleLogin called");

    if (!email || !password) {
      console.log("Validation failed: Email or Password is empty");
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      console.log(`Attempting login with Email: ${email}, Password: ${password}`);
      // Simulate successful login
      console.log("Login successful!");
      Alert.alert("Success", "You are logged in!");
    } catch (error) {
      console.log("Login failed:", error);
      Alert.alert("Login Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button
        title="Login"
        onPress={() => {
          console.log("Login button clicked");
          handleLogin();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginPage;
