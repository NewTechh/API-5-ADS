import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as Progress from 'react-native-progress';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from '../styles/curse';
import { AntDesign } from "@expo/vector-icons";

type RootStackParamList = {
    Cursos: undefined;
    AddCurse: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cursos'>;

export function Cursos() {
    const [progress, setProgress] = useState(0.5);
    const navigation = useNavigation<ScreenNavigationProp>();

    const handleAddCurses = () => {
        navigation.navigate('AddCurse');
    };

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cursos e Treinamentos</Text>
            <Pressable style={styles.iconPlus} onPress={handleAddCurses}>
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
