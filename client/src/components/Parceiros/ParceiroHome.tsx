import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Footer from './Footer';
import SideMenu from './SideMenu';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterAdmin from '../Admin/FooterAdmin';
import SideMenuAdmin from '../Admin/SideMenuAdmin';

type RootStackParamList = {
    SignUpAdm: undefined;
    NewPassSelf: undefined;
    EditarInfoPartner: { parceiro: Parceiro };
    EditarEnderecoPartner: { parceiro: Parceiro };
};

type Parceiro = {
    parceiro_nome: string;
    parceiro_email: string;
    parceiro_telefone: string;
    parceiro_logradouro: string;
    parceiro_logradouro_numero: string;
    parceiro_bairro: string;
    parceiro_cep: string;
    parceiro_cidade: string;
    parceiro_estado: string;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ParceiroHome = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ImageBackground style={styles.image} source={require('../../../assets/oracle.png')} />
                <Text style={styles.title}>Bem-vindo Parceiro!</Text>
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

export default ParceiroHome;
