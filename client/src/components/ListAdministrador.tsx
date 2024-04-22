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
    CadastroAdministrador: undefined;
    EditarAdministrador: { administrador: Administrador };
    
}

type Administrador = {
    administrador_nome: string;
    administrador_email: string;
    administrador_cpf: string;
    administrador_status: boolean;
    administrador_funcao: string;
    administrador_setor: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListAdministradores = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [administradorData, setAdministradorData] = useState<Administrador[]>([]);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    // const handleEditClick = (administrador: Administrador) => {
    //     navigation.navigate('EditarAdministrador', { administrador });
    // };

    const handleSignUp = () => {
        navigation.navigate('SignUpAdm');
        setModalVisible(false);
    };

    useEffect(() => {
        fetchAdministradores();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAdministradores();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchAdministradores = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar Administradores.');
            }
            const data = await response.json();
            setAdministradorData(data);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleDelete = async (administrador_cpf: string) => {
    //     Alert.alert(
    //         'Confirmação',
    //         'Tem certeza de que deseja excluir este administrador definitivamente? Essa ação é irreversível.',
    //         [
    //             {
    //                 text: 'Cancelar',
    //                 onPress: () => console.log('Exclusão cancelada'),
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Excluir',
    //                 onPress: () => confirmDelete(administrador_cpf)
    //             }
    //         ]
    //     );
    // };

    // const confirmDelete = async (administrador_cpf: string) => {
    //     try {
    //         const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/Administradores/${administrador_cpf}`, {
    //             method: 'DELETE'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erro ao excluir Administrador');
    //         }
    //         fetchAdministradores();
    //         console.log('Administrador excluído com sucesso');
    //     } catch (error) {
    //         console.error('Erro ao excluir Administrador:', error);
    //         Alert.alert('Erro', 'Erro ao excluir Administrador. Por favor, tente novamente.');
    //     }
    // };

    // const logicalDeleteAdmin= async (administrador_cpf: string) => {
    //     try {
    //         const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/ExclusaoAdmin/${administrador_cpf}`, {
    //             method: 'PUT'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erro ao excluir Administrador logicamente');
    //         }

    //         Alert.alert('Sucesso','Exclusão Lógica realizada.')
    //         console.log('Administrador excluído logicamente com sucesso');
    //         fetchAdministradores();
    //     } catch (error) {
    //         console.error('Erro ao excluir Administrador logicamente:', error);
    //         Alert.alert('Erro', 'Erro ao excluir Administrador logicamente. Por favor, tente novamente.');
    //     }
    // };

    // const reactivateAdmin = async (administrador_cpf: string) => {
    //     try {
    //         const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/ReativacaoAdmin/${administrador_cpf}`, {
    //             method: 'PUT'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erro ao reativar Administrador');
    //         }
    //         Alert.alert('Sucesso', 'Reativação realizada.')
    //         console.log('Administrador reativado')
    //         fetchAdministradores();     
    //     } catch (error) {
    //         console.error('Erro ao reativar Administrador:', error);
    //         Alert.alert('Erro', 'Erro ao reativar Administrador. Por favor, tente novamente.');
    //     }
    // };

    // const handleAdministradorClick = async (administradorCPF: string) => {
    //     try {
    //         const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/ConsultarPorCPF/${administradorCPF}`, {
    //             method: 'GET'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar administrador');
    //         }
    //         const administradorData = await response.json();
    //         const formattedData = formatAdministradorData(administradorData);
    //         Alert.alert(`Dados Adicionais do Administrador de Aliança:`, formattedData);
    //     } catch (error) {
    //         console.error('Erro ao buscar Administrador:', error);
    //         Alert.alert('Erro', 'Erro ao buscar dados do Administrador. Por favor, tente novamente.');
    //     }
    // };
    
    // const formatAdministradorData = (administradorData: any) => {
    //     return (
    //         `Email: ${administradorData.administrador_email}`
    //     );
    // };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
                <Text style={styles.title}>Administradores Cadastrados</Text>

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
                        <Text style={styles.header}>Função</Text>
                        <Text style={styles.header}>Setor</Text>
                        {/* <Text style={styles.header}>Ações</Text> */}
                    </View>
                    <View>
                        {administradorData && administradorData.map && administradorData.map((administrador, index) => (
                            <Pressable style={styles.row} key={index}>
                                <Text style={styles.data}>{administrador.administrador_nome}</Text>
                                <Text style={styles.data}>{administrador.administrador_funcao}</Text>
                                <Text style={styles.data}>{administrador.administrador_setor}</Text>
                                <View style={styles.actionButtons}>
                                {/* <Ionicons
                                    style={styles.icon}
                                    name="create"
                                    size={24}
                                    color="black"
                                    onPress={() => {handleEditClick(administrador)}}
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name={administrador.administrador_status ? "trash-bin" : "power"}
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
                                                        handleDelete(administrador.administrador_cpf)
                                                    },
                                                },

                                                {
                                                    text: administrador.administrador_status ? 'Exclusão Lógica' : 'Reativar',
                                                    onPress: () => {
                                                        if (administrador.administrador_status) {
                                                            logicalDeleteAdmin(administrador.administrador_cpf);
                                                        } else {
                                                            reactivateAdmin(administrador.administrador_cpf);
                                                        }
                                                    },
                                                },
                                            ]
                                        );
                                    }}
                                /> */}
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

export default ListAdministradores;
