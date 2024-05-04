import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from "../../../services/IPAddress";
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';
import { RouteProp, useNavigation } from '@react-navigation/native';


type Trilha = {
    id_trilha: string;
    trilha_nome: string;
};



type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Trilhas'>;
type TrilhasRouteProp = RouteProp<RootStackParamList, 'Trilhas'>;

interface TrilhasProps {
    navigation: ScreenNavigationProp;
    route: TrilhasRouteProp;
}
type RootStackParamList = {
    Trilhas: { parceiro_id: string };
    EspecializacoesTrilha: { trilha_id: string, parceiro_id: string };
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
    
    const handleTrilhaPress = (trilha_id: string) => {
        navigation.navigate('EspecializacoesTrilha', { trilha_id, parceiro_id });
    };
    

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {trilhas.map((trilha, index) => (
                    <View key={index} style={styles.joinFields}>
                        <Pressable style={styles.button} onPress={() => handleTrilhaPress(trilha.id_trilha)}>
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
