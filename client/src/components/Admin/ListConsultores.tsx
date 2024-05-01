import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import getIpAddress from '../../../services/IPAddress';
import FooterAdmin from './FooterAdmin';
import SideMenuAdmin from './SideMenuAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    SignUpAdm: undefined;
    CadastroConsultor: undefined;
    EditarConsultor: { consultor: Consultor };
    
}

type Consultor = {
    consultor_alianca_id: string
    consultor_alianca_nome: string;
    consultor_alianca_cpf: string;
    consultor_alianca_status: boolean;
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
    
    const handleEditClick = (consultor: Consultor) => {
        navigation.navigate('EditarConsultor', { consultor });
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

    const consultorIP = consultorData.find(consultor => consultor.consultor_alianca_id);

    const handleDelete = async (consultor_alianca_id: string) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir este Consultor de Aliança definitivamente? Essa ação é irreversível.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Exclusão cancelada'),
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => confirmDelete(consultor_alianca_id)
                }
            ]
        );
    };

    const confirmDelete = async (consultorIP: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteConsultor/Consultores/${consultorIP}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir consultor');
            } else {
                const adminId = await AsyncStorage.getItem('usuario_id');
                const adminResponse = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${adminId}`);
                const adminData = await adminResponse.json();
    
                // Encontrar o consultor com o CPF correspondente
                const consultorExcluido = consultorData.find(consultor => consultor.consultor_alianca_id === consultorIP);
    
                if (!consultorExcluido) {
                    throw new Error('Consultor não encontrado');
                }
    
                const registroLogAcao = `Administrador ${adminData.administrador_nome} realizou a exclusão definitiva do consultor de alianças ${consultorExcluido.consultor_alianca_nome}`;
                const registroLogAlteracao = `Exclusão Definitiva do consultor de alianças ${consultorExcluido.consultor_alianca_nome} pelo administrador ${adminData.administrador_nome}`;
                
                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/DeleteConsultorLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Administrador --> Consultor de Aliança",
                        id_administrador: adminId
                    })
                });
    
                fetchConsultores();
                console.log('Consultor excluído com sucesso');
            }
    
        } catch (error) {
            console.error('Erro ao excluir consultor:', error);
            Alert.alert('Erro', 'Erro ao excluir consultor. Por favor, tente novamente.');
        }
    };
    

    const logicalDeleteConsul= async (consultorIP: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteConsultor/ExclusaoConsultor/${consultorIP}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir consultor logicamente');
            } else {
                const adminId = await AsyncStorage.getItem('usuario_id');
                const adminResponse = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${adminId}`);
                const adminData = await adminResponse.json();
    
                // Encontrar o consultor com o CPF correspondente
                const consultorExcluido = consultorData.find(consultor => consultor.consultor_alianca_id === consultorIP);
    
                if (!consultorExcluido) {
                    throw new Error('Consultor não encontrado');
                }
    
                const registroLogAcao = `Administrador ${adminData.administrador_nome} realizou a exclusão lógica do consultor de alianças ${consultorExcluido.consultor_alianca_nome}`;
                const registroLogAlteracao = `Exclusão Lógica do consultor de alianças ${consultorExcluido.consultor_alianca_nome} pelo administrador ${adminData.administrador_nome}`;
                
                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/DeleteLogicalConsultorLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Administrador --> Consultor de Aliança",
                        id_administrador: adminId,
                        id_consultor_alianca: consultorExcluido.consultor_alianca_id
                    })
                });

                Alert.alert('Sucesso','Exclusão Lógica realizada.')
                console.log('Consultor excluído logicamente com sucesso');
                fetchConsultores();
            }
        } catch (error) {
            console.error('Erro ao excluir consultor logicamente:', error);
            Alert.alert('Erro', 'Erro ao excluir consultor logicamente. Por favor, tente novamente.');
        }
    };

    const reactivateConsul = async (consultorIP: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteConsultor/ReativacaoConsultor/${consultorIP}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao reativar consultor');
            } else {
                const adminId = await AsyncStorage.getItem('usuario_id');
                const adminResponse = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${adminId}`);
                const adminData = await adminResponse.json();
    
                // Encontrar o consultor com o CPF correspondente
                const consultorExcluido = consultorData.find(consultor => consultor.consultor_alianca_id === consultorIP);
    
                if (!consultorExcluido) {
                    throw new Error('Consultor não encontrado');
                }
    
                const registroLogAcao = `Administrador ${adminData.administrador_nome} reativou o consultor de alianças ${consultorExcluido.consultor_alianca_nome}`;
                const registroLogAlteracao = `Reativação do consultor de alianças ${consultorExcluido.consultor_alianca_nome} pelo administrador ${adminData.administrador_nome}`;
                
                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/DeleteLogicalConsultorLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Administrador --> Consultor de Aliança",
                        id_administrador: adminId,
                        id_consultor_alianca: consultorExcluido.consultor_alianca_id
                    })
                });

                Alert.alert('Sucesso', 'Reativação realizada.')
                console.log('Consultor reativado')
                fetchConsultores();     
            }
        } catch (error) {
            console.error('Erro ao reativar consultor:', error);
            Alert.alert('Erro', 'Erro ao reativar consultor. Por favor, tente novamente.');
        }
    };

    const handleConsultorClick = async (consultorCPF: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetConsultor/ConsultarPorCPF/${consultorCPF}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar consultor');
            }
            const consultorData = await response.json();
            const formattedData = formatConsultorData(consultorData);
            Alert.alert(`Dados Adicionais do Consultor de Aliança:`, formattedData);
        } catch (error) {
            console.error('Erro ao buscar consultor:', error);
            Alert.alert('Erro', 'Erro ao buscar dados do consultor. Por favor, tente novamente.');
        }
    };
    
    const formatConsultorData = (consultorData: any) => {
        return (
            `Email: ${consultorData.consultor_alianca_email}`
        );
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
                <Text style={styles.title}>Consultores Cadastrados</Text>

                <Pressable style={styles.iconPlus} onPress={() => handleSignUp()}>
                    <AntDesign
                        name={'adduser'}
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
                            <Pressable style={styles.row} key={index} onPress={() => handleConsultorClick(consultor.consultor_alianca_cpf)}>
                                <Text style={styles.data}>{consultor.consultor_alianca_nome}</Text>
                                <Text style={styles.data}>{consultor.consultor_alianca_cpf}</Text>
                                <View style={styles.actionButtons}>
                                <Ionicons
                                    style={styles.icon}
                                    name="create"
                                    size={24}
                                    color="black"
                                    onPress={() => {handleEditClick(consultor)}}
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name={consultor.consultor_alianca_status ? "trash-bin" : "power"}
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
                                                        handleDelete(consultor.consultor_alianca_id)
                                                    },
                                                },

                                                {
                                                    text: consultor.consultor_alianca_status ? 'Exclusão Lógica' : 'Reativar',
                                                    onPress: () => {
                                                        if (consultor.consultor_alianca_status) {
                                                            logicalDeleteConsul(consultor.consultor_alianca_id);
                                                        } else {
                                                            reactivateConsul(consultor.consultor_alianca_id);
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
        marginBottom: 10,
    },
});

export default ListConsultores;
