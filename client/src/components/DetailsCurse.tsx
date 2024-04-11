import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Pressable } from "react-native";
import { styles } from '../styles/detailscurse';
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIpAddress from "../../services/IPAddress";

export function DetailsCurse() {
    const [trilhaNome, setTrilhaNome] = useState<string | null>('')
    const [espec, setEspec] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
            const trilha_nome = await AsyncStorage.getItem('trilha_nome');
            setTrilhaNome(trilha_nome);
            const trilha_id = await AsyncStorage.getItem('trilha_id');
            fetch(`http://${getIpAddress()}:3001/Tracks/Expertises/${trilha_id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setEspec(data)
            })
            .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{trilhaNome}</Text>
            {espec.map((item: any) => (
                <Pressable 
                key={item.especializacao_id} 
                style={styles.button}>
                <Text style={styles.buttonText}>{item.especializacao_nome}</Text>
                </Pressable>
            ))}
        </View>
    )
}
