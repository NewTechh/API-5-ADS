import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import getIpAddress from '../../../services/IPAddress';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  DetalhesParceiros: { parceiro_id: string };
};

type DetalhesParceirosRouteProp = RouteProp<RootStackParamList, 'DetalhesParceiros'>;

const DetalhesParceiros = () => {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const route = useRoute<DetalhesParceirosRouteProp>();
  const [detalhesParceiros, setDetalhesParceiros] = useState<any[]>([]); // Alterado para um array
  const navigation = useNavigation();
  const { parceiro_id } = route.params;

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const fetchDetalhesParceiro = async (parceiro_id: string) => {
    try {
      const response = await axios.get(`http://${getIpAddress()}:3001/Dashboard/Detalhes/${parceiro_id}`);
      setDetalhesParceiros(response.data); // Definido como array
    } catch (error) {
      console.error('Erro ao obter detalhes do parceiro:', error);
    }
  };

  useEffect(() => {
    fetchDetalhesParceiro(parceiro_id);
  }, [parceiro_id]);


  const formatarData = (data: string) => {
    const date = new Date(data);
    date.setDate(date.getDate() + 1); // Adiciona 1 dia à data
    return date.toLocaleDateString('pt-BR');
  };

  if (!detalhesParceiros.length) {
    return (
      <View style={styles.container}>
        <Text style={{color:'#fff'}}>Carregando detalhes do parceiro...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {detalhesParceiros.map((detalhesParceiro, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Detalhes do Parceiro</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Trilha:</Text>
              <Text style={styles.value}>{detalhesParceiro.trilha_nome}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{detalhesParceiro.status}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Data de aquisição:</Text>
              <Text style={styles.value}>{formatarData(detalhesParceiro.data_aquisicao)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Data de início:</Text>
              <Text style={styles.value}>{formatarData(detalhesParceiro.data_inicio)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Última atividade:</Text>
              <Text style={styles.value}>{formatarData(detalhesParceiro.ultima_atividade)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expertises desenvolvidas:</Text>
              <Text style={styles.value}>{(detalhesParceiro.exp_concluidas)} / {detalhesParceiro.exp_total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
      {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#272424',
    paddingHorizontal: 16,
    paddingTop: 40
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});

export default DetalhesParceiros;
