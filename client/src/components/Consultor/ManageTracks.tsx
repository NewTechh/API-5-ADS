import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, TextInput, Alert } from "react-native";
import styles from './styles';
import { Entypo, AntDesign } from '@expo/vector-icons';

import getIpAddress from '../../../services/IPAddress';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import FooterConsultor from "./FooterConsultor";
import SideMenuConsultor from "./SideMenuConsultor";

type RootStackParamList = {
    ManageTracks: undefined;
    AddCurse: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManageTracks'>;

type FormDataProps = {
    trilha_nome: string;
}

type Trilha = {
    trilha_id: string;
    trilha_nome: string;
}

export default function ManageTracks() {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [trilhas, setTrilhas] = useState<Trilha[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
    const [modalData, setModalData] = useState<Trilha>('' as any);

    const [trilha_nome, setTrilha_nome] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signUpSchema = yup.object().shape({
        trilha_nome: yup.string().required("Informe o Nome"),
    });

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    async function handleEdit() {
        console.log('Dados do formulário para editar:', modalData);

        try {
            const response = await fetch(`http://${getIpAddress()}:3001/PutTrack/Track/${modalData.trilha_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modalData),
            });
            console.log('Edição realizada com sucesso!');
            if (response.ok) {

                alert('Edição realizada!')
                setErrorMessage('');
                setModalVisibleEditar(false);
                fetchTrilhas();
            } else {
                const errorMessage = await response.text();
                console.error('Erro ao editar trilha:', errorMessage);
                setErrorMessage(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao editar trilha:', error.message);
            setErrorMessage('Erro ao editar trilha. Por favor, tente novamente.');
        }
    }

    const handleDelete = async (trilha_id: string) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/DeleteTrack/Track/${trilha_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir trilha');
            } else {
                fetchTrilhas();
                console.log('Trilha excluída com sucesso');
            }
        } catch (error) {
            console.error('Erro ao excluir trilha:', error);
            Alert.alert('Erro', 'Erro ao excluir trilha. Por favor, tente novamente.');
        }
    };

    const confirmDelete = async (trilha_id: string) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir esta trilha definitivamente? Essa ação é irreversível.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Exclusão cancelada'),
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => handleDelete(trilha_id)
                }
            ]
        );
    };

    async function handleSignUp(data: FormDataProps) {
        console.log('Dados do formulário:', data);
        function resetFields() {
            setTrilha_nome('');
        }

        try {
            const response = await fetch(`http://${getIpAddress()}:3001/PostTrack/CadastroTrilha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('Cadastro realizado com sucesso!');
            if (response.ok) {

                alert('Cadastro realizado!')
                setErrorMessage('');
                resetFields()
                setModalVisible(false);
                fetchTrilhas();
            } else {
                const errorMessage = await response.text();
                console.error('Erro ao cadastrar trilha:', errorMessage);
                setErrorMessage(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao cadastrar trilha:', error.message);
            setErrorMessage('Erro ao cadastrar trilha. Por favor, tente novamente.');
        }
        reset();
    }

    useEffect(() => {
        fetchTrilhas();
    }, [navigation, modalVisible]);

    const fetchTrilhas = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/Tracks/listar`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar trilhas');
            }
            const data = await response.json();
            setTrilhas(data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const handlePressTrack = () => {
        navigation.navigate('AddCurse');
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.joinFields}>
                    <Text style={styles.title}>Trilhas</Text>
                    <Pressable style={styles.iconPlus}
                        onPress={
                            () => {setModalVisible(!modalVisible);
                                setTrilha_nome('');}
                        }>
                        <AntDesign
                            name={'pluscircleo'}
                            size={35}
                            color='white'
                        />
                    </Pressable>
                </View>
                <View>
                    {trilhas && trilhas.map && trilhas.map((trilha, index) => (

                        <Pressable style={styles.button} key={index} onPress={handlePressTrack}>

                            <Text style={styles.buttonText}>{trilha.trilha_nome}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Pressable style={styles.buttonOption}
                                    onPress={() => {
                                        setModalVisibleEditar(!modalVisibleEditar);
                                        setModalData(trilha);
                                    }}>
                                    <Entypo name="edit" size={30} />
                                </Pressable>

                                <Pressable style={styles.buttonOption} onPress={() => confirmDelete(trilha.trilha_id)}>
                                    <Entypo name="trash" size={30} />
                                </Pressable>
                            </View>
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
                            <Text style={styles.modalTitle}>Cadastrar Trilha</Text>
                            <Pressable
                                style={{ position: 'absolute', right: 1 }}
                                onPress={() => { setModalVisible(!modalVisible) }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </Pressable>

                            <Controller
                                control={control}
                                name='trilha_nome'
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            setTrilha_nome(text);
                                            onChange(text)
                                        }}

                                        value={trilha_nome}
                                        placeholder="Nome da Trilha"

                                    />
                                )}
                            />
                            {errors.trilha_nome && <Text style={styles.labelError}>{errors.trilha_nome?.message}</Text>}

                            <Pressable
                                style={styles.confirmButton}
                                onPress={handleSubmit(handleSignUp)}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                            {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}

                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={modalVisibleEditar}
                    transparent={true}
                    animationType='slide'
                    onRequestClose={() => {
                        setModalVisibleEditar(!modalVisibleEditar);
                    }}>

                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Renomear Trilha</Text>
                            <Pressable
                                style={{ position: 'absolute', right: 1 }}
                                onPress={() => { setModalVisibleEditar(!modalVisibleEditar) }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </Pressable>

                            <Controller
                                control={control}
                                name='trilha_nome'
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        style={styles.input}
                                        // placeholder={modalData.trilha_nome}
                                        onChangeText={(text) => {
                                            setModalData(prevState => ({
                                                ...prevState, // mantém os campos existentes
                                                trilha_nome: text, // modifica apenas o trilha_nome
                                            }));;
                                            onChange(text)
                                        }}
                                    />
                                )}
                            />
                            {errors.trilha_nome && <Text style={styles.labelError}>{errors.trilha_nome?.message}</Text>}

                            <Pressable
                                style={styles.confirmButton}
                                onPress={handleSubmit(handleEdit)}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                            {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}

                        </View>
                    </View>
                </Modal>

            </ScrollView>
            <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
        </>
    )
}
