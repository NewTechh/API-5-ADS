import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Pressable, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons, AntDesign } from '@expo/vector-icons';

type RootStackParamList = {
    SignUpAdm: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const ListAdm = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    const handleSignUpAdm = () => {
        navigation.navigate('SignUpAdm');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
            <Text style={styles.title}>Administradores Cadastrados</Text>

            <Pressable style={styles.iconPlus} onPress={handleSignUpAdm}>
                <AntDesign
                    name={'pluscircleo'}
                    size={35}
                    color='white'
                />
            </Pressable>

            <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Nome</Text>
                    <Text style={styles.header}>Função</Text>
                    <Text style={styles.header}>Ações</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Jose Armando</Text>
                        <Text style={styles.data}>Desenvolvedor</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Claudia Silva</Text>
                        <Text style={styles.data}>Suporte</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Marcos Souza</Text>
                        <Text style={styles.data}>Cloud Computing</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Roberta Nobre</Text>
                        <Text style={styles.data}>Segurança Digital</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1, 
        alignItems: 'center', 
        backgroundColor: '#272424',
        paddingHorizontal: 16,
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

export default ListAdm;
