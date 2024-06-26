import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import getIpAddress from '../../../services/IPAddress';
import FooterAdmin from './FooterAdmin';
import SideMenuAdmin from './SideMenuAdmin';

type RootStackParamList = {
    SignUpAdm: undefined;
    CadastroAdministrador: undefined;
    EditarAdministrador: { administrador: Administrador };

}

type Administrador = {
    administrador_id: string
    administrador_nome: string;
    administrador_email: string;
    administrador_cpf: string;
    administrador_status: boolean;
    administrador_funcao: string;
    administrador_matricula: string;
    administrador_setor: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListAdministradores = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const navigation = useNavigation<ScreenNavigationProp>();
    const [administradorData, setAdministradorData] = useState<Administrador[]>([]);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handleEditClick = (administrador: Administrador) => {
        navigation.navigate('EditarAdministrador', { administrador });
    };

    const handleSignUp = () => {
        navigation.navigate('SignUpAdm');
        setModalVisible(false);
    };

    useEffect(() => {
        fetchAdministradores(currentPage);
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAdministradores(currentPage);
        });
        return unsubscribe;
    }, [currentPage, navigation]);

    const fetchAdministradores = async (page = 1) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores?page=${page}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar parceiros');
            }
            const data = await response.json();
            setAdministradorData(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleDelete = async (administradorID: string) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir este administrador definitivamente? Essa ação é irreversível.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Exclusão cancelada'),
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => confirmDelete(administradorID)
                }
            ]
        );
    };

    const confirmDelete = async (administradorID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/Administradores/${administradorID}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir Administrador');
            }
            fetchAdministradores();
            console.log('Administrador excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir Administrador:', error);
            Alert.alert('Erro', 'Erro ao excluir Administrador. Por favor, tente novamente.');
        }
    };

    const logicalDeleteAdmin = async (administradorID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/ExclusaoAdmin/${administradorID}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir Administrador logicamente');
            }

            Alert.alert('Sucesso', 'Exclusão Lógica realizada.')
            console.log('Administrador excluído logicamente com sucesso');
            fetchAdministradores();
        } catch (error) {
            console.error('Erro ao excluir Administrador logicamente:', error);
            Alert.alert('Erro', 'Erro ao excluir Administrador logicamente. Por favor, tente novamente.');
        }
    };

    const reactivateAdmin = async (administradorID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteAdmin/ReativacaoAdmin/${administradorID}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao reativar Administrador');
            }
            Alert.alert('Sucesso', 'Reativação realizada.')
            console.log('Administrador reativado')
            fetchAdministradores();
        } catch (error) {
            console.error('Erro ao reativar Administrador:', error);
            Alert.alert('Erro', 'Erro ao reativar Administrador. Por favor, tente novamente.');
        }
    };

    const handleAdministradorClick = async (administradorID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${administradorID}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar administrador');
            }
            const administradorData = await response.json();
            const formattedData = formatAdministradorData(administradorData);
            Alert.alert(`Dados Adicionais do Administrador:`, formattedData);
        } catch (error) {
            console.error('Erro ao buscar Administrador:', error);
            Alert.alert('Erro', 'Erro ao buscar dados do Administrador. Por favor, tente novamente.');
        }
    };

    const formatAdministradorData = (administradorData: any) => {
        return (
            `Email: ${administradorData.administrador_email}\n\n` +
            `Função: ${administradorData.administrador_funcao}\n\n` +
            `Setor: ${administradorData.administrador_setor}\n\n`
        );
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />

                <View style={styles.joinFields}>
                    <Text style={styles.title}>Administradores{'\n'}Cadastrados</Text>
                    <Pressable style={styles.iconPlus} onPress={() => handleSignUp()}>
                        <AntDesign
                            name={'adduser'}
                            size={35}
                            color='white'
                        />
                    </Pressable>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.header}>Nome</Text>
                        <Text style={styles.header}>Matrícula</Text>
                        <Text style={styles.header}>Ações</Text>
                    </View>
                    <View>
                        {administradorData && administradorData.map && administradorData.map((administrador, index) => (
                            <Pressable style={styles.row} key={index} onPress={() => handleAdministradorClick(administrador.administrador_id)}>
                                <Text style={styles.data}>{administrador.administrador_nome}</Text>
                                <Text style={styles.data}>{administrador.administrador_matricula}</Text>
                                <View style={[styles.data, { flexDirection: 'row', justifyContent: 'center' }]}>
                                    <Ionicons
                                        style={styles.icon}
                                        name="create"
                                        size={24}
                                        color="black"
                                        onPress={() => { handleEditClick(administrador) }}
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
                                                            handleDelete(administrador.administrador_id)
                                                        },
                                                    },

                                                    {
                                                        text: administrador.administrador_status ? 'Exclusão Lógica' : 'Reativar',
                                                        onPress: () => {
                                                            if (administrador.administrador_status) {
                                                                logicalDeleteAdmin(administrador.administrador_id);
                                                            } else {
                                                                reactivateAdmin(administrador.administrador_id);
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
                </View>

                <View style={styles.pagination}>
                    <Pressable
                        style={[styles.pageButton, { marginRight: 10 }]}
                        disabled={currentPage === 1}
                        onPress={handlePrevPage}
                    >
                        <Text style={styles.pagebuttonText}>Anterior</Text>
                    </Pressable>
                    <Pressable
                        style={styles.pageButton}
                        disabled={administradorData.length < pageSize}
                        onPress={handleNextPage}
                    >
                        <Text style={styles.pagebuttonText}>Próxima</Text>
                    </Pressable>
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
    joinFields: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    tableContainer: {
        backgroundColor: '#f0f0f0',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    pageButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#C74634',
        borderRadius: 5,
    },
    pagebuttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
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
    icon: {
        marginLeft: 10,
    },
    iconPlus: {
        right: 5,
        position: 'absolute',
    },
});

export default ListAdministradores;
