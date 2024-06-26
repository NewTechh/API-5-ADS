import React, { useEffect, useState } from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles/curse';
import getIpAddress from "../../services/IPAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Parceiros/Footer";
import SideMenu from "./Parceiros/SideMenu";


type RootStackParamList = {
    Cursos: undefined;
    DetailsCurse: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cursos'>;

export function Cursos() {
    const [progress, setProgress] = useState(0.5);
    const [trilhas, setTrilhas] = useState([]);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);



    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handlePress = async (item: any) => {
        try {
            await AsyncStorage.setItem('trilha_id', item.trilha_id);
            await AsyncStorage.setItem('trilha_nome', item.trilha_nome);
            navigation.navigate('DetailsCurse');
        } catch (error) {
            console.error("Erro ao salvar dados da trilha: ", error);
        }
    };


    useEffect(() => {
        fetch(`http://${getIpAddress()}:3001/Tracks/listar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados recebidos:", data);
                setTrilhas(data)
            })
            .catch((error) => console.log(error))
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Trilhas de Especializações</Text>
                {trilhas && trilhas.map && trilhas.map((item: any) => (
                    <Pressable
                        key={item.trilha_id}
                        onPress={() => handlePress(item)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>{item.trilha_nome}</Text>
                        <Progress.Bar progress={progress} width={380} color={'#17E753'} />
                    </Pressable>

                ))}
            </ScrollView>

            <Footer onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenu onClose={toggleSideMenu} navigation={navigation} />}
        </>
    )
}

