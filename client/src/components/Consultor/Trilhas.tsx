import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import styles from "./styles";
import * as Progress from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from "../../../services/IPAddress";
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';
import { RouteProp, useNavigation } from '@react-navigation/native';


type Trilha = {
    trilha_id: string;
    trilha_nome: string;
    progresso: number
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

            const response = await fetch(`http://${getIpAddress()}:3001/Tracks/Progress/${parceiro_id}`, {
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
                    <View key={trilha.trilha_id} style={styles.joinFields}>
                        <Pressable style={styles.button} onPress={() => handleTrilhaPress(trilha.trilha_id)}>
                            <Text style={styles.buttonText}>{trilha.trilha_nome}</Text>
                            <Progress.Bar progress={trilha.progresso} width={50} color={'#17E753'} />
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
