import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import getIpAddress from '../../../services/IPAddress';
import * as Progress from 'react-native-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

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
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

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

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const renderEspecializacaoItem = ({ item }: { item: Especializacao }) => (
    <Pressable style={styles.especializacaoItem} onPress={() => handleTrilhaPress(item.especializacao_id)} >
      <Text style={styles.nome}>{item.especializacao_nome}</Text>
      <Progress.Bar style={{ borderRadius: 10, marginTop: 10, }} progress={item.progresso} borderWidth={2} width={250} height={20} color={'#17E753'}>
        <Text style={styles.progressText}>{Math.round(item.progresso * 100)}%</Text>
      </Progress.Bar>

    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={especializacoes}
        renderItem={renderEspecializacaoItem}
        keyExtractor={(item) => item.especializacao_id}
      />
      <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
      {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272424', 
  },
  especializacaoItem: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
  },
  nome: {
    fontSize: 18,
    color: 'black',

  },
  progressText: {
    position: 'absolute',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginLeft: 110,
    marginTop: -1,
  },
});

export default EspecializacoesTrilha;
