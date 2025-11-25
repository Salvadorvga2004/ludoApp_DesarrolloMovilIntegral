import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonCustomProps {
  title: string;
  onPress: () => void;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  text: { color: "white", fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
