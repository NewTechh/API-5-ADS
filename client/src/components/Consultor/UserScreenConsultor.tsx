import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../../services/IPAddress';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

type RootStackParamList = {
    SignUpAdm: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const UserScreenConsultor = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [consultorData, setConsultorData] = useState<any>(null);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const fetchConsultorData = async () => {
        try {
            const consultor_alianca_id = await AsyncStorage.getItem('usuario_id');
            const response = await axios.get(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultor_alianca_id}`);
            setConsultorData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do consultor:', error);
        }
    };

    useEffect(() => {
        fetchConsultorData();
    }, []);


    return (
        <>
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Ionicons name="person-circle-outline" size={64} color="white" />
                    <Text style={styles.userName}>{consultorData ? consultorData.consultor_nome : 'Carregando...'}</Text>
                    <Text style={styles.userEmail}>{consultorData ? consultorData.consultor_email : 'Carregando...'}</Text>
                </View>

                <View style={styles.cardContainer}>
                    {consultorData ? (
                        <View style={styles.card}>
                            <View style={styles.userInfo}>
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.userInfoTitle}>Informações do Usuário:</Text>
                                    <Pressable onPress={() => { }}>
                                        <Ionicons name="create" size={24} color="black" style={styles.editIcon} />
                                    </Pressable>
                                </View>
                                <View>
                                    <Text style={styles.cardText}>Nome: {consultorData.consultor_alianca_nome}</Text>
                                    <Text style={styles.cardText}>E-mail: {consultorData.consultor_alianca_email}</Text>
                                    <Text style={styles.cardText}>CPF/CNPJ: {consultorData.consultor_alianca_cpf}</Text>
                                </View>
                            </View>
                            <View style={styles.passwordInfo}>
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.passwordInfoTitle}>Senha:</Text>
                                    <Pressable onPress={() => { }}>
                                        <Ionicons name="create" size={24} color="black" style={styles.editIcon} />
                                    </Pressable>
                                </View>
                                <Text style={styles.cardText}>********</Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.loadingText}>Carregando...</Text>
                        </View>
                    )}
                </View>
            </View>
            <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#312D2A',
    },
    userContainer: {
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 30,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    userEmail: {
        fontSize: 14,
        marginTop: 5,
        color: 'white',
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    userInfo: {
        marginBottom: 20,
    },
    userInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    passwordInfo: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    passwordInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    iconPlus: {
        marginLeft: 330,
        marginBottom: 7,
    },
    loadingText: {
        fontSize: 16,
        color: 'white',
    },
    editIcon: {

    },
});

export default UserScreenConsultor;
