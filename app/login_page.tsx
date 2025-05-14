import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "../Styles/login"; // Getting the style from Styles folder

export default function LoginPage() {
  // Declaration of useState hooks for managing state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  // Function to handle login
  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    // Use of firebase auth to sign in with email and password
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(({ user }) => {
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/");
      })
      .catch((error) => {
        Alert.alert("Login failed", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goToSignUp = () => {
    router.push("./signup_page");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        editable={!loading}
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToSignUp}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        <Text style={[styles.linkText, loading && { opacity: 0.5 }]}>
          Don't have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
