import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ButtonCustom from "../components/ButtonCustom";

const questions = [
    "¿Sientes que apuestas más de lo que puedes permitirte?",
    "¿Has intentado dejar de apostar y no pudiste?",
    "¿La ludopatía afecta tu vida familiar o laboral?",
];

const AssessmentScreen: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));

    const handleAnswer = (index: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const submitAssessment = () => {
        const score = answers.reduce((a, b) => a + b, 0);
        Alert.alert("Resultado", `Tu puntuación: ${score}`);
        // Aquí puedes enviar el resultado al backend
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cuestionario de Ludopatía</Text>
            {questions.map((q, i) => (
                <View key={i} style={styles.questionContainer}>
                    <Text style={styles.question}>{q}</Text>
                    <View style={styles.buttons}>
                        {[0, 1, 2, 3].map((v) => (
                            <ButtonCustom key={v} title={`${v}`} onPress={() => handleAnswer(i, v)} />
                        ))}
                    </View>
                </View>
            ))}
            <ButtonCustom title="Enviar evaluación" onPress={submitAssessment} />
        </ScrollView>
    );
};

export default AssessmentScreen;


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#f2f2f2" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center", color: "#333" },
    buttons: { flexDirection: "row", justifyContent: "space-between" },
    questionContainer: { marginBottom: 16 },
    question: { fontSize: 16, marginBottom: 8 },
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
