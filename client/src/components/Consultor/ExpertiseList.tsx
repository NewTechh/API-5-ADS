import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import getIpAddress from '../../../services/IPAddress';

const DetalhesEspecializacao: React.FC<{ route: any }> = ({ route }) => {
    const { especializacao_id, parceiro_id } = route.params;
    const [qualificadores, setQualificadores] = useState<{ id: string; titulo: string; descricao: string; concluido: boolean }[]>([]);

    useEffect(() => {
        const fetchQualificadores = async () => {
            try {
                const response = await fetch(`http://${getIpAddress()}:3001/Tracks/Qualificadores/${especializacao_id}/${parceiro_id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar qualificadores');
                }
                const data = await response.json();
                console.log(data)
                setQualificadores(data);
            } catch (error) {
                console.error('Erro ao carregar qualificadores:', error);
            }
        };

        fetchQualificadores();
    }, [especializacao_id, parceiro_id]);

    const renderQualificadorItem = ({ item }: { item: { id: string; titulo: string; descricao: string; concluido: boolean } }) => (
        <View style={styles.qualificadorItem}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.concluido}>{item.concluido ? 'Concluído' : 'Não concluído'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={qualificadores}
                renderItem={renderQualificadorItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    qualificadorItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descricao: {
        fontSize: 16,
        marginBottom: 5,
    },
    concluido: {
        fontSize: 16,
        color: '#008000', 
    },
});

export default DetalhesEspecializacao;
