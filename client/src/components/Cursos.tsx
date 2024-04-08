import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from '../styles/curse';
import * as Progress from 'react-native-progress';
import { AntDesign } from "@expo/vector-icons";

export function Cursos() {
    const [progress, setProgress] = useState(0.5);

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cursos e Treinamentos</Text>
            <Pressable style={styles.iconPlus}>
                <AntDesign
                    name={'pluscircleo'}
                    size={35}
                    color='white'
                    
                    // onPress={}
                />
            </Pressable>
            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>IaaS & PaaS</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </Pressable>
            <Pressable onPress={handlePress} style={[styles.button]}>
                <Text style={styles.buttonText}>CX</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </Pressable>
            <Pressable onPress={handlePress} style={[styles.button]}>
                <Text style={styles.buttonText}>Industries</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </Pressable>
            <Pressable onPress={handlePress} style={[styles.button]}>
                <Text style={styles.buttonText}>License & Hardware</Text>
                <Progress.Bar progress={progress} width={380} color={'#17E753'} />
            </Pressable>
        </View>
    )
}
