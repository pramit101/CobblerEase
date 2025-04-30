import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: fullName });

        Alert.alert("Success", "Account created!");
        router.replace("/(tabs)/index"); // ✅ After signup, go to Home
      })
      .catch((error) => {
        console.error("Signup error:", error);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={setFullName}
          value={fullName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login_page")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center" }}>
            Already have an account? <Text style={{ fontWeight: "bold" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20, textAlign: "center" },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, marginVertical: 10, borderRadius: 10, paddingHorizontal: 15, fontSize: 16 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 },
});
