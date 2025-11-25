import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCustom from "../components/ButtonCustom";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a LudoApp</Text>
      <ButtonCustom title="Evaluación de ludopatía" onPress={() => navigation.navigate("Assessment ")} />
      <ButtonCustom title="Perfil" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
};



export default HomeScreen;

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