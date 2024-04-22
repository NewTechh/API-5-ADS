import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../../services/IPAddress';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import SideMenuAdmin from './SideMenuAdmin';
import FooterAdmin from './FooterAdmin';

type RootStackParamList = {
    EditarAdminSelf: { administrador: Administrador };
    NewPassSelf: undefined
}

type Administrador = {
    administrador_nome: string;
    administrador_email: string;
    administrador_cpf: string;
    administrador_status: boolean;
    administrador_funcao: string;
    administrador_setor: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarAdminSelf'>;

const UserScreenAdmin = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [administradores, setAdministradores] = useState<any>([]);

    const handleEditClick = (administrador: Administrador) => {
        navigation.navigate('EditarAdminSelf', { administrador });
    };

    const handleEditClickSenha = () => {
        navigation.navigate('NewPassSelf');
    };

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const fetchAdmin = async () => {
        try {
            const administrador_id = await AsyncStorage.getItem('usuario_id'); // Substitua 'coloque aqui o ID do parceiro' pelo ID real do parceiro
            const response = await axios.get(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${administrador_id}`);
            setAdministradores(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do parceiro:', error);
        }
    };

    useEffect(() => {
        fetchAdmin();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAdmin();
        });
        return unsubscribe;
    }, [navigation]);


    return (
        <>
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Ionicons name="person-circle-outline" size={64} color="white" />
                    <Text style={styles.userName}>{administradores ? administradores.administrador_nome : 'Carregando...'}</Text>
                    <Text style={styles.userEmail}>{administradores ? administradores.administrador_email : 'Carregando...'}</Text>
                </View>

                <View style={styles.cardContainer}>
                    {administradores ? (
                        <View style={styles.card}>
                            <View style={styles.userInfo}>
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.userInfoTitle}>Informações do Usuário:</Text>
                                    <Pressable>
                                        <Ionicons 
                                            name="create" 
                                            size={24} 
                                            color="black" 
                                            style={styles.editIcon}
                                            onPress={() => {handleEditClick(administradores)}}
                                        />
                                    </Pressable>
                                </View>
                                <View>
                                    <Text style={styles.cardText}>Nome: {administradores.administrador_nome}</Text>
                                    <Text style={styles.cardText}>E-mail: {administradores.administrador_email}</Text>
                                    <Text style={styles.cardText}>Matrícula: {administradores.administrador_matricula}</Text>
                                    <Text style={styles.cardText}>Função: {administradores.administrador_funcao}</Text>
                                    <Text style={styles.cardText}>Setor: {administradores.administrador_setor}</Text>
                                </View>
                            </View>
                            <View style={styles.passwordInfo}>
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.passwordInfoTitle}>Senha:</Text>
                                    <Pressable onPress={() => { }}>
                                        <Ionicons 
                                        name="create" 
                                        size={24} 
                                        color="black" 
                                        style={styles.editIcon}
                                        onPress={() => {handleEditClickSenha()}}
                                    />
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
            <FooterAdmin onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuAdmin onClose={toggleSideMenu} navigation={navigation} />}
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

export default UserScreenAdmin;
