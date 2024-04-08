import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { styles } from '../styles/curse';
import * as Progress from 'react-native-progress';

export function Cursos() {
    const [progress, setProgress] = useState(0.5);

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cursos e Treinamentos</Text>
            <TouchableOpacity onPress={handlePress} style={styles.button1}>
                <Text style={styles.buttonText}>IaaS & PaaS</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={[styles.button2]}>
                <Text style={styles.buttonText}>CX</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={[styles.button3]}>
                <Text style={styles.buttonText}>Industries</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={[styles.button4]}>
                <Text style={styles.buttonText}>License & Hardware</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </TouchableOpacity>
        </View>
    )
}
