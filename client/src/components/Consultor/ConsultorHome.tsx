import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getIpAddress from '../../../services/IPAddress';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

const ConsultorHome = ({ navigation }) => {
    const [consultorNome, setConsultorNome] = useState('');
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    useEffect(() => {
        const fetchConsultorData = async () => {
            try {
                const consultor_alianca_id = await AsyncStorage.getItem('usuario_id');
                const response = await axios.get(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultor_alianca_id}`);
                setConsultorNome(response.data?.consultor_alianca_nome || 'Consultor');
            } catch (error) {
                console.error('Erro ao buscar dados do consultor:', error);
            }
        };

        fetchConsultorData();
    }, []);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ImageBackground style={styles.image} source={require('../../../assets/oracle.png')} />
                <Text style={styles.title}>Bem-vindo {consultorNome}!</Text>
                <View style={styles.footerContainer}>
                </View>
            </ScrollView>
                <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
                {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
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

export default ConsultorHome;
