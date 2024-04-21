import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import getIpAddress from '../../services/IPAddress';
import FooterAdmin from './Admin/FooterAdmin';
import SideMenuAdmin from './Admin/SideMenuAdmin';

type RootStackParamList = {
    SignUpAdm: undefined;
    CadastroConsultor: undefined;
    // EditarParceiro: { parceiro: Parceiro };
}

type Consultor = {
    consultor_alianca_nome: string;
    consultor_alianca_cpf: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListConsultores = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [consultorData, setConsultorData] = useState<Consultor[]>([]);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handleEditClick = () => {
        // navigation.navigate('EditarParceiro', { parceiro });
    };

    const handleSignUp = () => {
        navigation.navigate('CadastroConsultor');
        setModalVisible(false);
    };

    const handleAdm = () => {
        navigation.navigate('SignUpAdm');
        setModalVisible(false);
    };

    useEffect(() => {
        fetchConsultores();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchConsultores();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchConsultores = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar consultores.');
            }
            const data = await response.json();
            setConsultorData(data);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleParceiroClick = async (parceiroCPF: string) => {
    //     try {
    //         const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/ConsultaPorCPF/${parceiroCPF}`, {
    //             method: 'GET'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar parceiro');
    //         }
    //         const parceiroData = await response.json();
    //         const formattedData = formatParceiroData(parceiroData);
    //         Alert.alert(`Dados Adicionais do Parceiro:\n\n`, formattedData);
    //     } catch (error) {
    //         console.error('Erro ao buscar parceiro:', error);
    //         Alert.alert('Erro', 'Erro ao buscar dados do parceiro. Por favor, tente novamente.');
    //     }
    // };
    
    // const formatParceiroData = (parceiroData: any) => {
    //     return (
    //         `Email: ${parceiroData.parceiro_email}\n\n` +
    //         `Telefone: ${parceiroData.parceiro_telefone}\n\n` +
    //         `Logradouro: ${parceiroData.parceiro_logradouro}\n\n` +
    //         `Número do Logradouro: ${parceiroData.parceiro_logradouro_numero}\n\n` +
    //         `Bairro: ${parceiroData.parceiro_bairro}\n\n` +
    //         `CEP: ${parceiroData.parceiro_cep}\n\n` +
    //         `Cidade: ${parceiroData.parceiro_cidade}\n\n` +
    //         `Estado: ${parceiroData.parceiro_estado}`
    //     );
    // };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
                <Text style={styles.title}>Consultores Cadastrados</Text>

                <Pressable style={styles.iconPlus} onPress={() => handleSignUp()}>
                    <AntDesign
                        name={'pluscircleo'}
                        size={35}
                        color='white'
                    // onPress={}
                    />
                </Pressable>

                <View style={styles.tableContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.header}>Nome</Text>
                        <Text style={styles.header}>CPF</Text>
                        <Text style={styles.header}>Ações</Text>
                    </View>
                    <View>
                        {consultorData && consultorData.map && consultorData.map((consultor, index) => (
                            <Pressable style={styles.row} key={index}>
                                <Text style={styles.data}>{consultor.consultor_alianca_nome}</Text>
                                <Text style={styles.data}>{consultor.consultor_alianca_cpf}</Text>
                                <View style={styles.actionButtons}>
                                <Ionicons
                                    style={styles.icon}
                                    name="create"
                                    size={24}
                                    color="black"
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name="trash-bin"
                                    size={24}
                                    color="black"
                                />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <View style={styles.separator} />
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    tableContainer: {
        backgroundColor: '#f0f0f0',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    header: {
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    data: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    iconPlus: {
        marginLeft: 300, // Ajuste a margem esquerda conforme necessário
        marginBottom: 7,
    },
});

export default ListConsultores;
