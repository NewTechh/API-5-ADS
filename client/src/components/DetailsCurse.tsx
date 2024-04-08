import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { styles } from '../styles/detailscurse';
import { Ionicons } from '@expo/vector-icons';

export function DetailsCurse() {

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <View style={styles.container}>
            <Ionicons name="arrow-back" size={24} color="white" style={{ position: 'absolute', left: 10, top: 10 }} />

            <Text style={styles.title}>IaaS & PaaS</Text>

            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Ionicons name="play-circle" size={40} color="black" />
                <Text style={styles.buttonText}>Oracle Cloud</Text>
                <Ionicons name="checkmark-circle" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Ionicons name="play-circle" size={40} color="black" />
                <Text style={styles.buttonText}>Business Analytics</Text>
                <Ionicons name="checkmark-circle" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Ionicons name="play-circle" size={40} color="black" />
                <Text style={styles.buttonText}>Oracle Database</Text>
                <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>

            <Text style={styles.title}>Atividades/Provas</Text>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>IaaS & PaaS</Text>
                <Ionicons name="checkmark-circle" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>CX</Text>
                <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Industries</Text>
                <Ionicons name="lock-closed" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>License & Hardware</Text>
                <Ionicons name="lock-closed" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
