import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import getIpAddress from '../../../services/IPAddress';
import * as Progress from 'react-native-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Especializacao {
  id: string;
  especializacao_nome: string;
  especializacao_id: string;
  progresso: number;
}

interface RouteParams {
  trilha_id: string;
  parceiro_id: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Especializacoes'>;

type RootStackParamList = {
  Especializacoes: {
    trilha_id: string,
    parceiro_id: string
  },
  DetalhesEspecializacao: {
    especializacao_id: string,
    parceiro_id: string
  }
}

const EspecializacoesTrilha: React.FC = () => {
  const route = useRoute();
  const { trilha_id, parceiro_id } = route.params as RouteParams;
  const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);
  const navigation = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    const fetchEspecializacoes = async () => {
      try {
        const response = await fetch(`http://${getIpAddress()}:3001/Tracks/Progress/${trilha_id}/${parceiro_id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar especializações da trilha');
        }
        const data = await response.json();
        setEspecializacoes(data);
        
        
      } catch (error) {
        console.error('Erro ao carregar especializações da trilha:', error);
      }
    };

    fetchEspecializacoes();
  }, [trilha_id]);

const handleTrilhaPress = (especializacao_id: string) => {
    navigation.navigate('DetalhesEspecializacao', { especializacao_id, parceiro_id });
};

 
  const renderEspecializacaoItem = ({ item }: { item: Especializacao }) => (
    <Pressable style={styles.especializacaoItem} onPress={() => handleTrilhaPress(item.especializacao_id)} >
      <Text style={styles.nome}>{item.especializacao_nome}</Text>
      <Progress.Bar progress={item.progresso} width={380} color={'#17E753'} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={especializacoes}
        renderItem={renderEspecializacaoItem}
        keyExtractor={(item) => item.especializacao_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  especializacaoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    color: 'black'
  },
  nome: {
    fontSize: 18,
    color: 'black'
  },
});

export default EspecializacoesTrilha;
