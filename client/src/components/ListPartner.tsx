import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import getIpAddress from '../../services/IPAddress';
import SideMenuConsultor from './Consultor/SideMenuConsultor';
import FooterConsultor from './Consultor/FooterConsultor';

type RootStackParamList = {
    SignUpAdm: undefined;
    Cadastro: undefined;
    EditarParceiro: { parceiro: Parceiro };
}

type Parceiro = {
    parceiro_nome: string;
    parceiro_cnpj_cpf: string;
    parceiro_status: boolean; // Adicionando o campo de status do parceiro
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListPartner = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [parceiros, setParceiros] = useState<Parceiro[]>([]);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handleEditClick = (parceiro: Parceiro) => {
        navigation.navigate('EditarParceiro', { parceiro });
    };

    const handleSignUp = () => {
        navigation.navigate('Cadastro');
        setModalVisible(false);
    };

    useEffect(() => {
        fetchParceiros();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchParceiros();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchParceiros = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/Parceiros`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar parceiros');
            }
            const data = await response.json();
            setParceiros(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (parceiro_cnpj_cpf: string) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir este parceiro definitivamente? Essa ação é irreversível.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Exclusão cancelada'),
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => confirmDelete(parceiro_cnpj_cpf)
                }
            ]
        );
    };
    
    const confirmDelete = async (parceiro_cnpj_cpf: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/Parceiros/${parceiro_cnpj_cpf}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir parceiro');
            }
            fetchParceiros();
            console.log('Parceiro excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir parceiro:', error);
            Alert.alert('Erro', 'Erro ao excluir parceiro. Por favor, tente novamente.');
        }
    };

    const logicalDeletePartner = async (parceiro_cnpj_cpf: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/ExclusaoParceiro/${parceiro_cnpj_cpf}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir parceiro logicamente');
            }

            Alert.alert('Sucesso','Exclusão Lógica realizada.')
            console.log('Parceiro excluído logicamente com sucesso');
            fetchParceiros();
        } catch (error) {
            console.error('Erro ao excluir parceiro logicamente:', error);
            Alert.alert('Erro', 'Erro ao excluir parceiro logicamente. Por favor, tente novamente.');
        }
    };

    const reactivatePartner = async (parceiro_cnpj_cpf: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/ReativacaoParceiro/${parceiro_cnpj_cpf}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao reativar parceiro');
            }
            Alert.alert('Sucesso', 'Reativação realizada.')
            console.log('Parceiro reativado')
            fetchParceiros();     
        } catch (error) {
            console.error('Erro ao reativar parceiro:', error);
            Alert.alert('Erro', 'Erro ao reativar parceiro. Por favor, tente novamente.');
        }
    };


    const handleParceiroClick = async (parceiroCPF: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/ConsultaPorCPF/${parceiroCPF}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar parceiro');
            }
            const parceiroData = await response.json();
            const formattedData = formatParceiroData(parceiroData);
            Alert.alert(`Dados Adicionais do Parceiro:\n\n`, formattedData);
        } catch (error) {
            console.error('Erro ao buscar parceiro:', error);
            Alert.alert('Erro', 'Erro ao buscar dados do parceiro. Por favor, tente novamente.');
        }
    };
    
    const formatParceiroData = (parceiroData: any) => {
        return (
            `Email: ${parceiroData.parceiro_email}\n\n` +
            `Telefone: ${parceiroData.parceiro_telefone}\n\n` +
            `Logradouro: ${parceiroData.parceiro_logradouro}\n\n` +
            `Número do Logradouro: ${parceiroData.parceiro_logradouro_numero}\n\n` +
            `Bairro: ${parceiroData.parceiro_bairro}\n\n` +
            `CEP: ${parceiroData.parceiro_cep}\n\n` +
            `Cidade: ${parceiroData.parceiro_cidade}\n\n` +
            `Estado: ${parceiroData.parceiro_estado}`
        );
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
                <Text style={styles.title}>Parceiros Cadastrados</Text>

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
                        <Text style={styles.header}>CNPJ</Text>
                        <Text style={styles.header}>Ações</Text>
                    </View>
                    <View>
                        {parceiros && parceiros.map && parceiros.map((parceiro, index) => (
                            <Pressable style={styles.row} key={index} onPress={() => handleParceiroClick(parceiro.parceiro_cnpj_cpf)}>
                                <Text style={styles.data}>{parceiro.parceiro_nome}</Text>
                                <Text style={styles.data}>{parceiro.parceiro_cnpj_cpf}</Text>
                                <View style={styles.actionButtons}>
                                <Ionicons
                                    style={styles.icon}
                                    name="create"
                                    size={24}
                                    color="black"
                                    onPress={() => {handleEditClick(parceiro)}}
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name={parceiro.parceiro_status ? "trash-bin" : "power"}
                                    size={24}
                                    color="black"
                                    onPress={() => {
                                        Alert.alert(
                                            'Selecione o tipo de operação:',
                                            'Esta ação pode ser irreversível, escolha com cuidado',
                                            [
                                                {
                                                    text: 'Cancelar',
                                                    onPress: () => {
                                                        return
                                                    },
                                                },

                                                {
                                                    text: 'Exclusão Definitiva',
                                                    onPress: () => {
                                                        handleDelete(parceiro.parceiro_cnpj_cpf)
                                                    },
                                                },

                                                {
                                                    text: parceiro.parceiro_status ? 'Exclusão Lógica' : 'Reativar',
                                                    onPress: () => {
                                                        if (parceiro.parceiro_status) {
                                                            logicalDeletePartner(parceiro.parceiro_cnpj_cpf);
                                                        } else {
                                                            reactivatePartner(parceiro.parceiro_cnpj_cpf);
                                                        }
                                                    },
                                                },
                                            ]
                                        );
                                    }}
                                />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <View style={styles.separator} />
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

export default ListPartner;
