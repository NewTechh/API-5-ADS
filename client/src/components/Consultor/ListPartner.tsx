import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Alert, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import getIpAddress from '../../../services/IPAddress';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";

type RootStackParamList = {
    SignUpAdm: undefined;
    Cadastro: undefined;
    Trilhas: { parceiro_id: string };
    EditarParceiro: { parceiro: Parceiro };
}

type Parceiro = {
    parceiro_id: string,
    parceiro_nome: string;
    parceiro_cnpj_cpf: string;
    parceiro_status: boolean; // Adicionando o campo de status do parceiro
    trilha_id: string;
    trilha_nome: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListPartner = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<Parceiro>('' as any);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [parceiros, setParceiros] = useState<Parceiro[]>([]);
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handleEditClick = (parceiro: Parceiro) => {
        setModalVisible(false);
        navigation.navigate('EditarParceiro', { parceiro });
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleDeleteClick = (parceiro: Parceiro) => {
        Alert.alert(
            'Selecione o tipo de operação:',
            'Esta ação pode ser irreversível, escolha com cuidado',
            [{
                text: 'Cancelar',
                onPress: () => {
                    return
                },
            },

            {
                text: 'Exclusão Definitiva',
                onPress: () => {
                    handleDelete(parceiro.parceiro_id)
                },
            },

            {
                text: parceiro.parceiro_status ? 'Exclusão Lógica' : 'Reativar',
                onPress: () => {
                    if (parceiro.parceiro_status) {
                        logicalDeletePartner(parceiro.parceiro_id);
                    } else {
                        reactivatePartner(parceiro.parceiro_id);
                    }
                },
            },
            ]
        );
    }

    const handleSignUp = () => {
        navigation.navigate('Cadastro');
        setModalVisible(false);
    };

    const handleTrilhas = (parceiro_id: string) => {
        navigation.navigate('Trilhas', { parceiro_id });
        setModalVisible(false);
    };

    useEffect(() => {
        fetchParceiros(currentPage);
        const unsubscribe = navigation.addListener('focus', () => {
            fetchParceiros(currentPage);
        });
        return unsubscribe;
    }, [currentPage, navigation]);

    const fetchParceiros = async (page = 1) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/Parceiros?page=${page}`, {
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

    const parceiroID = parceiros.find(parceiros => parceiros.parceiro_id);

    const handleDelete = async (parceiro_id: string) => {
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
                    onPress: () => confirmDelete(parceiro_id)
                }
            ]
        );
    };

    const confirmDelete = async (parceiroID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/Parceiros/${parceiroID}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir parceiro');
            } else {
                const consulId = await AsyncStorage.getItem('usuario_id');
                const consulResponse = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consulId}`);
                const consulData = await consulResponse.json();

                // Encontrar o consultor com o CPF correspondente
                const parceiroExcluido = parceiros.find(parceiro => parceiro.parceiro_id === parceiroID);

                if (!parceiroExcluido) {
                    throw new Error('Parceiro não encontrado');
                }

                const registroLogAcao = `Consultor de Alianças ${consulData.consultor_alianca_nome} realizou a exclusão definitiva do parceiro ${parceiroExcluido.parceiro_nome}`;
                const registroLogAlteracao = `Exclusão Definitiva do parceiro ${parceiroExcluido.parceiro_nome} pelo Consultor de Alianças ${consulData.consultor_alianca_nome}`;

                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/DeleteLogParceiro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Consultor de Alianças --> Parceiro",
                        id_consultor: consulId
                    })
                });

                fetchParceiros();
                console.log('Parceiro excluído com sucesso');
            }
        } catch (error) {
            console.error('Erro ao excluir parceiro:', error);
            Alert.alert('Erro', 'Erro ao excluir parceiro. Por favor, tente novamente.');
        }
    };

    const logicalDeletePartner = async (parceiroID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/ExclusaoParceiro/${parceiroID}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir parceiro logicamente');
            } else {
                const consulId = await AsyncStorage.getItem('usuario_id');
                const consulResponse = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consulId}`);
                const consulData = await consulResponse.json();

                // Encontrar o consultor com o CPF correspondente
                const parceiroExcluido = parceiros.find(parceiro => parceiro.parceiro_id === parceiroID);

                if (!parceiroExcluido) {
                    throw new Error('Parceiro não encontrado');
                }

                const registroLogAcao = `Consultor de Alianças ${consulData.consultor_alianca_nome} realizou a exclusão lógica do parceiro ${parceiroExcluido.parceiro_nome}`;
                const registroLogAlteracao = `Exclusão lógica do parceiro ${parceiroExcluido.parceiro_nome} pelo Consultor de Alianças ${consulData.consultor_alianca_nome}`;

                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/EdicaoParceiroLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Consultor de Alianças --> Parceiro",
                        id_consultor: consulId,
                        id_parceiro: parceiroExcluido.parceiro_id
                    })
                });

                Alert.alert('Sucesso', 'Exclusão Lógica realizada.')
                console.log('Parceiro excluído logicamente com sucesso');
                fetchParceiros();
            }
        } catch (error) {
            console.error('Erro ao excluir parceiro logicamente:', error);
            Alert.alert('Erro', 'Erro ao excluir parceiro logicamente. Por favor, tente novamente.');
        }
    };

    const reactivatePartner = async (parceiroID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteParceiro/ReativacaoParceiro/${parceiroID}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Erro ao reativar parceiro');
            } else {
                const consulId = await AsyncStorage.getItem('usuario_id');
                const consulResponse = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consulId}`);
                const consulData = await consulResponse.json();

                // Encontrar o consultor com o CPF correspondente
                const parceiroExcluido = parceiros.find(parceiro => parceiro.parceiro_id === parceiroID);

                if (!parceiroExcluido) {
                    throw new Error('Parceiro não encontrado');
                }

                const registroLogAcao = `Consultor de Alianças ${consulData.consultor_alianca_nome} realizou a reativação do parceiro ${parceiroExcluido.parceiro_nome}`;
                const registroLogAlteracao = `Reativação do parceiro ${parceiroExcluido.parceiro_nome} pelo Consultor de Alianças ${consulData.consultor_alianca_nome}`;

                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/EdicaoParceiroLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Consultor de Alianças --> Parceiro",
                        id_consultor: consulId,
                        id_parceiro: parceiroExcluido.parceiro_id
                    })
                });

                Alert.alert('Sucesso', 'Reativação realizada.')
                console.log('Parceiro reativado')
                fetchParceiros();
            }
        } catch (error) {
            console.error('Erro ao reativar parceiro:', error);
            Alert.alert('Erro', 'Erro ao reativar parceiro. Por favor, tente novamente.');
        }
    };
    const generateRelatorio = async (parceiroID: string) => {

        const consultor_alianca_id = await AsyncStorage.getItem('usuario_id');

        try {
            const response0 = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultor_alianca_id}`, {
                method: 'GET'
            });

            if (!response0.ok) {
                throw new Error('Erro ao buscar parceiro');
            }

            const consultorData = await response0.json();

            const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/Parceiros/${parceiroID}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar parceiro');
            }

            const parceiroData = await response.json();

            const response2 = await fetch(`http://${getIpAddress()}:3001/Tracks/Progress/${parceiroData.parceiro_id}`, {
                method: 'GET'
            });

            if (!response2.ok) {
                throw new Error('Erro ao buscar parceiro');
            }

            const parceiroProgressTrilha = await response2.json();
            
            const response3 = await fetch(`http://${getIpAddress()}:3001/Tracks/Progress/${parceiroProgressTrilha[0].trilha_id}/${parceiroData.parceiro_id}`);

            if (!response3.ok) {
              throw new Error('Erro ao carregar especializações da trilha');
            }

            const especializacao = await response3.json();


            // Envia os dados do parceiro para a rota de inserção no banco de dados
            const insercaoResponse = await fetch(`http://${getIpAddress()}:3001/PostRelatorio/InsertRelatorio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    consultorData: consultorData,
                    parceiroData: parceiroData,
                    parceiroProgressTrilha: parceiroProgressTrilha,
                    especializacao: especializacao
                })
            });
    
            if (!insercaoResponse.ok) {
                throw new Error('Erro ao inserir dados do parceiro no banco');
            } else {
                Alert.alert('Sucesso', 'Relatório enviado no email.')
            }
    
        } catch (error) {
            console.error('Erro ao buscar parceiro:', error);
            Alert.alert('Erro', 'Erro ao buscar dados do parceiro. Por favor, tente novamente.');
        }
    };

    const handleParceiroClick = async (parceiroID: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetParceiro/Parceiros/${parceiroID}`, {
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
            `Estado: ${parceiroData.parceiro_estado} \n\n`
        );
    };

    const filteredParceiros = parceiros.filter(parceiro =>
        parceiro.parceiro_nome.toLowerCase().includes(searchText.toLowerCase()) ||
        parceiro.parceiro_cnpj_cpf.includes(searchText)
    );

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.joinFields}>
                    <Text style={styles.title}>Parceiros{'\n'}Cadastrados</Text>
                    <Pressable style={styles.iconPlus} onPress={() => handleSignUp()}>
                        <AntDesign
                            name={'adduser'}
                            size={35}
                            color='white'
                        />
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <TextInput
                        style={{
                            height: 30,
                            flex: 1,
                            borderWidth: 1,
                            backgroundColor: '#FFFFFF',
                            paddingHorizontal: 34,
                            borderRadius: 5,
                        }}
                        placeholder="Pesquisar por nome ou CNPJ"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <AntDesign
                        name="search1"
                        size={19}
                        color="rgba(0, 0, 0, 0.5)"
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 5,
                        }}
                    />
                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.header}>Nome</Text>
                        <Text style={styles.header}>CNPJ</Text>
                        <Text style={styles.header}>Ações</Text>
                    </View>
                    <View>
                        {filteredParceiros.map((parceiro, index) => (
                            <Pressable style={styles.row} key={index} onPress={() => handleParceiroClick(parceiro.parceiro_id)}>
                                <Text style={styles.data}>{parceiro.parceiro_nome}</Text>
                                <Text style={styles.data}>{parceiro.parceiro_cnpj_cpf}</Text>
                                <Pressable
                                    style={styles.buttonBars}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        setModalData(parceiro);
                                    }}
                                >
                                    <AntDesign
                                        name="bars"
                                        size={24}
                                        color="black"
                                    />
                                </Pressable>
                            </Pressable>
                        ))}
                    </View>

                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>

                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>{modalData?.parceiro_nome}</Text>
                                <Pressable
                                    style={{ position: 'absolute', right: 1 }}
                                    onPress={() => { setModalVisible(!modalVisible) }}
                                >
                                    <AntDesign name="close" size={40} color="black" />
                                </Pressable>

                                <Pressable
                                    style={styles.modalButtonOptions}
                                    onPress={() => { handleTrilhas(modalData?.parceiro_id) }}
                                >
                                    <AntDesign
                                        style={styles.icon}
                                        name="tag"
                                        size={30}
                                        color="black"
                                    />
                                    <Text style={{ fontSize: 20 }}>Tracks</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.modalButtonOptions}
                                    onPress={() => { handleEditClick(modalData) }}
                                >
                                    <Ionicons
                                        style={styles.icon}
                                        name="create"
                                        size={30}
                                        color="black"
                                    />
                                    <Text style={{ fontSize: 20 }}>Editar</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.modalButtonOptions}
                                    onPress={() => { handleDeleteClick(modalData) }}
                                >
                                    <Ionicons
                                        style={styles.icon}
                                        name={modalData.parceiro_status ? "trash-bin" : "power"}
                                        size={30}
                                        color="black"
                                    />
                                    <Text style={{ fontSize: 20 }}>Deletar</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.modalButtonOptions}
                                    onPress={() => { generateRelatorio(modalData.parceiro_id) }}
                                >
                                    <MaterialCommunityIcons
                                        style={styles.icon}
                                        name="file-document"
                                        size={30}
                                        color="black"
                                    />

                                    <Text style={{ fontSize: 20 }}>Relatório</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                                {/* Adicione os botões de próxima página e anterior */}
            <View style={styles.pagination}>
                <Pressable
                    style={[styles.pageButton, { marginRight: 10 }]}
                    disabled={currentPage === 1}
                    onPress={handlePrevPage}
                >
                    <Text style={styles.buttonText}>Anterior</Text>
                </Pressable>
                <Pressable
                    style={styles.pageButton}
                    disabled={parceiros.length < pageSize}
                    onPress={handleNextPage}
                >
                    <Text style={styles.buttonText}>Próxima</Text>
                </Pressable>
            </View>
                    <View style={styles.separator} />
                </View>


            </ScrollView>
            <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
        </>
    );
};


export default ListPartner;
