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

const SideMenuConsultor: React.FC<SideMenuProps> = ({ onClose, navigation }) => {
    const sideMenuRef = useRef<View>(null);
    const [consultorData, setConsultorData] = useState<any>(null); 

    useEffect(() => {
        const fetchConsultorData = async () => {
            try {
                const consultor_alianca_id = await AsyncStorage.getItem('usuario_id'); 
                const response = await axios.get(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultor_alianca_id}`);
                setConsultorData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do consultor:', error);
            }
        };

        fetchConsultorData(); 
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
                    <Text style={styles.userName}>{consultorData ? consultorData.consultor_alianca_nome : 'Carregando...'}</Text>
                    <Text style={styles.userEmail}>{consultorData ? consultorData.consultor_alianca_email : 'Carregando...'}</Text>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListPartner')} style={styles.menuItem}>
                        <Ionicons name="home-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ListPartner')} style={styles.menuItem}>
                        <Ionicons name="people-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Parceiros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.menuItem}>
                        <Ionicons name="apps-outline" size={24} color="black" />
                        <Text style={styles.menuText}>Dashboard</Text>
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

export default SideMenuConsultor;
