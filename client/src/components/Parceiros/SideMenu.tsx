import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../../services/IPAddress';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

interface SideMenuProps {
    onClose: () => void;
    navigation: StackNavigationProp<any, any>;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose, navigation }) => {
    const sideMenuRef = useRef<View>(null);
    const [parceiroData, setParceiroData] = useState<any>(null); // Estado para armazenar os dados do parceiro

    // Função para buscar os dados do parceiro pelo ID assim que o componente for montado
    const fetchParceiroData = async () => {
        try {
            const parceiro_id = await AsyncStorage.getItem('usuario_id'); // Substitua 'coloque aqui o ID do parceiro' pelo ID real do parceiro
            const response = await axios.get(`http://${getIpAddress()}:3001/GetParceiro/Parceiros/${parceiro_id}`);
            setParceiroData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do parceiro:', error);
        }
    };

    useEffect(() => {
        fetchParceiroData(); // Chama a função de busca ao montar o componente
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleOutsideClick = (event: { nativeEvent: { locationX: number } }) => {
        const { locationX } = event.nativeEvent;
        const menuWidth = width / 2;
        if (locationX < width - menuWidth) {
            onClose();
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleOutsideClick}
            activeOpacity={1}
        >
            <View ref={sideMenuRef} style={styles.sideMenu}>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Ionicons name="close-outline" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.userContainer}>
                    <Ionicons name="person-circle-outline" size={64} color="black" />
                    <Text style={styles.userName}>{parceiroData ? parceiroData.parceiro_nome : 'Carregando...'}</Text>
                    <Text style={styles.userEmail}>{parceiroData ? parceiroData.parceiro_email : 'Carregando...'}</Text>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cursos')} style={styles.menuItem}>
                        <Ionicons name="home-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cursos')} style={styles.menuItem}>
                        <Ionicons name="book-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Cursos</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.exitButton}>
                    <Ionicons name="log-out-outline" size={24} color="black" />
                    <Text style={styles.menuText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
    },
    sideMenu: {
        flex: 1,
        width: width / 2,
        backgroundColor: 'white',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 35,
        left: 10,
    },
    userContainer: {
        alignItems: 'center',
        marginBottom: 25
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    userEmail: {
        fontSize: 14,
        marginTop: 5,
    },
    menuContainer: {
        justifyContent: 'flex-start',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    menuText: {
        marginLeft: 10,
        fontSize: 16,
    },
    exitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
    },
});

export default SideMenu;
