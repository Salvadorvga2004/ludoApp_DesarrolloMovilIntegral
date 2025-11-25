import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.172:4000/api";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      navigation.replace("Home");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ButtonCustom title="Login" onPress={handleLogin} />
      <ButtonCustom title="Registrarse" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    color: "#111", // <-- color del texto dentro del input
    backgroundColor: "#fff"
  },
});
