import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.172:4000/api";

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el perfil");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user && (
        <>
          <Text style={styles.info}>Nombre: {user.name}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
        </>
      )}
      <ButtonCustom title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center", color: "#333" },
  info: { fontSize: 16, marginBottom: 8 },
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
