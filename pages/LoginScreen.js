import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("https://reqres.in/api/users");
      const users = response.data.data;

      const user = users.find((u) => u.email === email);

      if (user && user.first_name === password) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (First Name)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
