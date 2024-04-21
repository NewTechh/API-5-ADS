import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../../services/IPAddress';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

interface SideMenuProps {
    onClose: () => void;
    navigation: StackNavigationProp<any, any>;
}

const SideMenuAdmin: React.FC<SideMenuProps> = ({ onClose, navigation }) => {
    const sideMenuRef = useRef<View>(null);
    const [consultorData, setConsultorData] = useState<any>(null); 
    const [administradores, setAdministradores] = useState<any>([]);

    const fetchAdmin = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar administradores');
            }
            const data = await response.json();
            setAdministradores(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAdmin(); 
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
                    <Text style={styles.userName}>{administradores ? administradores.administrador_nome : 'Carregando...'}</Text>
                    <Text style={styles.userEmail}>{administradores ? administradores.administrador_email : 'Carregando...'}</Text>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListConsulters')} style={styles.menuItem}>
                        <Ionicons name="home-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ListConsulters')} style={styles.menuItem}>
                        <Ionicons name="people-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Consultores</Text>
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

export default SideMenuAdmin;
