import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

const TableLog = () => {

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
            <Text style={styles.title}>Tabela de Registros</Text>
            <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Remetente</Text>
                    <Text style={styles.header}>Ação</Text>
                    <Text style={styles.header}>Destinatário</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Jose Armando</Text>
                        <Text style={styles.data}>Exclusão</Text>
                        <Text style={styles.data}>Suporte</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Mylon Roger</Text>
                        <Text style={styles.data}>Edição</Text>
                        <Text style={styles.data}>Parceiro</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Bruno Leandro</Text>
                        <Text style={styles.data}>Exclusão</Text>
                        <Text style={styles.data}>Administrador</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.data}>Miguel Lopes</Text>
                        <Text style={styles.data}>Inativo</Text>
                        <Text style={styles.data}>Administrador</Text>
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        </ScrollView>
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

});

export default TableLog;