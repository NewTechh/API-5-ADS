import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getIpAddress from '../../../services/IPAddress';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterAdmin from './FooterAdmin';
import SideMenuAdmin from './SideMenuAdmin';

const AdminHome = () => {
    const [administradorNome, setAdministradorNome] = useState('');
    const navigation = useNavigation<StackNavigationProp<any, any>>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    useEffect(() => {
        fetchAdministradorNome();
    }, []);

    const fetchAdministradorNome = async () => {
        try {
            const administrador_id = await AsyncStorage.getItem('usuario_id');
            const response = await axios.get(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${administrador_id}`);
            setAdministradorNome(response.data.administrador_nome);
        } catch (error) {
            console.error('Erro ao buscar nome do administrador:', error);
        }
    };

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ImageBackground style={styles.image} source={require('../../../assets/oracle.png')} />
                <Text style={styles.title}>Bem-vindo {administradorNome ? administradorNome : 'adm'}!</Text>
                <View style={styles.footerContainer}>
                </View>
            </ScrollView>
            <FooterAdmin onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuAdmin onClose={toggleSideMenu} navigation={navigation} />}
        </>
    );
};

const styles = StyleSheet.create({

    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 40,
        textAlign: 'center',
    },

    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-between'
    },

    image: {
        height: 90,
        width: 150,
    },
});

export default AdminHome;
