import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { styles } from '../styles/detailscurse';
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIpAddress from "../../services/IPAddress";
import { Ionicons } from '@expo/vector-icons';

interface Especializacao {
    especializacao_id: string;
    especializacao_nome: string;
    isChecked: boolean;
}

export function DetailsCurse() {
    const [trilhaNome, setTrilhaNome] = useState<string | null>('');
    const [espec, setEspec] = useState<Especializacao[]>([]); // Especificando o tipo de 'espec'

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
                const especializacoes: Especializacao[] = data.map((item: any) => ({...item, isChecked: false}));
                setEspec(especializacoes);
            })
            .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCheckbox = (index: number) => {
        setEspec(prevState => {
            const updatedEspec = [...prevState];
            updatedEspec[index].isChecked = !updatedEspec[index].isChecked; // Alterna o estado da checkbox do item selecionado
            return updatedEspec;
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>{trilhaNome}</Text>
            {espec.map((item: Especializacao, index: number) => (
                <Pressable 
                key={item.especializacao_id} 
                style={styles.button}
                onPress={() => toggleCheckbox(index)}>
                <Text style={styles.buttonText}>{item.especializacao_nome}</Text>
                {/* Renderização condicional da checkbox */}
                {item.isChecked ? <Ionicons name="checkbox" size={24} color="green" /> : <Ionicons name="checkbox-outline" size={24} color="black" />}
                </Pressable>
            ))}
        </ScrollView>
    )
}
