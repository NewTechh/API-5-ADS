import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import getIpAddress from '../../services/IPAddress';

type RootStackParamList = {
    SignUpAdm: undefined;
    Cadastro: undefined;
}

type Parceiro = {
    parceiro_nome: string;
    parceiro_cnpj_cpf: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListPartner = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ScreenNavigationProp>();
    const [parceiros, setParceiros] = useState<Parceiro[]>([]);

    const handleSignUp = () => {
        navigation.navigate('Cadastro');
        setModalVisible(false);
    };

    const handleAdm = () => {
        navigation.navigate('SignUpAdm');
        setModalVisible(false);
    };

    useEffect(() => {
        fetchParceiros();
    }, []);

    const fetchParceiros = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Parceiros`, {
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
            <Text style={styles.title}>Parceiros Cadastrados</Text>

            <Pressable style={styles.iconPlus} onPress={() => setModalVisible(true)}>
                <AntDesign
                    name={'pluscircleo'}
                    size={35}
                    color='white'
                // onPress={}
                />
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable onPress={handleSignUp} style={styles.modalButton}>
                            <Text style={[styles.modalText, { color: 'blue' }]}>Parceiro</Text>
                        </Pressable>
                        <Pressable onPress={handleAdm} style={styles.modalButton}>
                            <Text style={[styles.modalText, { color: 'blue' }]}>Administrador</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            <Text style={[styles.modalText, { color: 'red' }]}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Nome</Text>
                    <Text style={styles.header}>CNPJ</Text>
                    <Text style={styles.header}>Ações</Text>
                </View>
                <View>
                {parceiros && parceiros.map && parceiros.map((parceiro, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.data}>{parceiro.parceiro_nome}</Text>
                        <Text style={styles.data}>{parceiro.parceiro_cnpj_cpf}</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                ))}
                </View>
                <View style={styles.separator} />
            </View>
        </View>
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
    active: {
        color: 'green',
    },
    inactive: {
        color: 'black',
    },
    icon: {
        marginRight: 10,
    },
    iconPlus: {
        marginLeft: 330,
        marginBottom: 7,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 4,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1, // Adicionando borda
        borderColor: 'black', // Cor da borda
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButton: {
        width: 150,
        padding: 10,
    },
});

export default ListPartner;
