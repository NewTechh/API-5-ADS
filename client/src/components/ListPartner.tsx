import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListPartner = () => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
            <Text style={styles.title}>Parceiros Cadastrados</Text>
            <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Nome</Text>
                    <Text style={styles.header}>CNPJ</Text>
                    <Text style={styles.header}>Ações</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Jose Armando</Text>
                        <Text style={styles.data}>XX. XXX. XXX/0001-XX</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Claudia Silva</Text>
                        <Text style={styles.data}>XX. XXX. XXX/0001-XX</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Marcos Souza</Text>
                        <Text style={styles.data}>XX. XXX. XXX/0001-XX</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Roberta Nobre</Text>
                        <Text style={styles.data}>XX. XXX. XXX/0001-XX</Text>
                        <Text style={styles.data}>
                            <Ionicons style={styles.icon} name="create" size={24} color="black" />
                            <Ionicons name="trash-bin" size={24} color="black" />
                        </Text>
                    </View>
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
    }
});

export default ListPartner;
