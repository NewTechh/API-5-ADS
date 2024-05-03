import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from "../../../services/IPAddress";
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    Trilhas: { parceiro_id: string };
}

type Trilha = {
    id_trilha: string;
    trilha_nome: string;
};



type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Trilhas'>;

interface TrilhasProps {
    navigation: ScreenNavigationProp;
    route: { params: { parceiro_id: string } };
}

const Trilhas: React.FC<TrilhasProps> = ({ route }) => {
    const [trilhas, setTrilhas] = useState<Trilha[]>([]);
    const { parceiro_id } = route.params;
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    useEffect(() => {
        fetchTrilhasDoParceiro(parceiro_id);
    }, [parceiro_id]);
    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };
    
    const fetchTrilhasDoParceiro = async (parceiro_id: string) => {
        try {

            const response = await fetch(`http://${getIpAddress()}:3001/Tracks/TrilhasDoParceiro/${parceiro_id}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Erro ao carregar trilhas");
            }
            const data = await response.json();
            setTrilhas(data);
        } catch (error) {
            console.error("Erro ao carregar trilhas:", error);
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {trilhas.map((trilha, index) => (
                    <View key={index} style={styles.joinFields}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>{trilha.trilha_nome}</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
            <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
        </>
    );
};

export default Trilhas;
