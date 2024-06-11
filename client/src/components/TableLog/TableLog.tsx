import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable } from 'react-native';
import FooterAdmin from '../Admin/FooterAdmin';
import SideMenuAdmin from '../Admin/SideMenuAdmin';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from '../../../services/IPAddress';

type RootStackParamList = {
    SignUpAdm: undefined;
}

type RegistroLog = {
    registro_log_acao: string;
    registro_log_alteracao: string;
    registro_log_fluxo: string;
    id_destinatario: string;
    parceiro_nome: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const TableLog = () => {

    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [registrosLogs, setRegistrosLogs] = useState<RegistroLog[]>([]);
    const navigation = useNavigation<ScreenNavigationProp>();

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    useEffect(() => {
        fetchLog(currentPage);
        const unsubscribe = navigation.addListener('focus', () => {
            fetchLog(currentPage);
        });
        return unsubscribe;
    }, [currentPage, navigation]);

    const fetchLog = async (page = 1) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/Log/Logs?page=${page}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar logs');
            }
            const data = await response.json();
            setRegistrosLogs(data);
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

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#312D2A" barStyle="light-content" />
                <Text style={styles.title}>Tabela de Registros</Text>
                <View style={styles.tableContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.header}>Ação</Text>
                        <Text style={styles.header}>Alteração</Text>
                        <Text style={styles.header}>Fluxo</Text>
                    </View>
                    <View>
                        {registrosLogs && registrosLogs.map && registrosLogs.map((registro, index) => (
                            <View key={index}>
                                <View style={styles.row}>
                                    <Text style={styles.data}>{registro.registro_log_acao}</Text>
                                    <Text style={styles.data}>{registro.registro_log_alteracao}</Text>
                                    <Text style={styles.data}>{registro.registro_log_fluxo}</Text>
                                </View>
                                {index !== registrosLogs.length - 1 && <View style={styles.divider} />}
                            </View>
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
                        disabled={registrosLogs.length < pageSize}
                        onPress={handleNextPage}
                    >
                        <Text style={styles.pagebuttonText}>Próxima</Text>
                    </Pressable>
                </View>

            </ScrollView>
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 10,
    },

});

export default TableLog;