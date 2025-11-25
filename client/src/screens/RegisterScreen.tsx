import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import axios from "axios";

const API_URL = "http://192.168.1.172:4000/api";

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password });
      Alert.alert("Éxito", "Usuario registrado");
      navigation.navigate("Login");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
              placeholder="Nombre"
              placeholderTextColor="#888"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
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
      <ButtonCustom title="Registrarse" onPress={handleRegister} />
      <ButtonCustom title="Volver al login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;

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