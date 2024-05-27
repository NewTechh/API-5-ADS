import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterConsultor from './Consultor/FooterConsultor';
import SideMenuConsultor from './Consultor/SideMenuConsultor';
import getIpAddress from '../../services/IPAddress';
import * as Progress from 'react-native-progress';
import { PieChart } from 'react-native-svg-charts';

import { Text as SvgText } from 'react-native-svg';

type TempoMedioConclusaoTrilha = {
  trilha_id: string;
  trilha_nome: string;
  qtotal: number;
  media: number;
  total: number;
  concluiram: number;
}

type DadosTrilha = {
  trilha_id: string;
  trilha_nome: string;
  qtotal: number;
  pconcluiram: number;
}

type ProgressoGeralParceiros = {
  nao_iniciado: number;
  em_andamento: number;
  concluido: number;
  total: number;
}

type RootStackParamList = {
  Dashboard: undefined;
  DetalhesParceiros: { parceiro_id: string };
}

type PartnerCountData = {
  trilha_nome: string;
  pconcluido: number;
  count: number;
};

type PartnerProgress = {
  parceiro_nome: string;
  parceiro_id: string
  trilha_nome: string;
  progresso: number;
  count: number;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardPartner = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40;
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [tempoMedioConclusaoTrilha, setTempoMedioConclusaoTrilha] = useState<TempoMedioConclusaoTrilha[]>([]);
  const [dadosTrilha, setDadosTrilha] = useState<DadosTrilha[]>([]);
  const [progressoGeralParceiros, setProgressoGeralParceiros] = useState<ProgressoGeralParceiros | null>(null);
  const [partnerCountData, setPartnerCountData] = useState<PartnerCountData[]>([]);
  const [partnerProgress, setPartnerProgress] = useState<PartnerProgress[]>([]);
  const [parceiroTrilha, setParceiroTrilha] = useState<PartnerProgress[]>([]);
  const [selectedTrack1, setSelectedTrack1] = useState<string | null>(null);
  const [selectedTrack2, setSelectedTrack2] = useState<string | null>(null);
  const [selectedTrack3, setSelectedTrack3] = useState<string | null>(null);
  const [partnerDetails, setPartnerDetails] = useState<any>(null);


  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  useEffect(() => {
    fetchTempoMedioConclusaoTrilha();
    fetchDadosTrilha();
    fetchProgressoGeralParceiros();
    fetchPartnerProgress();
    fetchPartnerCountByTrack();
    GraficoParceirosPorTrilha()
  }, []);

  const fetchTempoMedioConclusaoTrilha = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Grafico7TempoMedioConclusao`);
      const data = await response.json();
      setTempoMedioConclusaoTrilha(data);
    } catch (error) {
      console.error('Erro ao obter os dados do tempo medio das trilhas (conclusao):', error);
    }
  };

  const fetchDadosTrilha = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Grafico6TrilhasConcluidas`);
      const data = await response.json();
      setDadosTrilha(data);
    } catch (error) {
      console.error('Erro ao obter os dados das trilhas:', error);
    }
  };

  const fetchProgressoGeralParceiros = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Grafico1ParceirosCadastrados`);
      const data = await response.json();
      setProgressoGeralParceiros(data);
    } catch (error) {
      console.error('Erro ao obter o progresso geral dos parceiros:', error);
    }
  };

  const fetchPartnerProgress = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Tabela3ProgressoParceiros`);
      const data = await response.json();
      setPartnerProgress(data);
    } catch (error) {
      console.error('Erro ao obter progresso dos parceiros:', error);
    }
  };

  const fetchPartnerCountByTrack = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Grafico2TaxaDeConclusao`);
      const data = await response.json();
      setPartnerCountData(data);
    } catch (error) {
      console.error('Erro ao obter a contagem de parceiros concluidos:', error);
    }
  };


  const GraficoParceirosPorTrilha = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Grafico5CadastrosPorTrilha`);
      const data = await response.json();
      setParceiroTrilha(data);
    } catch (error) {
      console.error('Erro ao obter contagem de parceiros por trilha:', error);
    }
  };

  const DetalhesParceiro = async (parceiroId: string) => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/Detalhes/${parceiroId}`);
      const data = await response.json();
      setPartnerDetails(data);
    } catch (error) {
      console.error('Erro ao obter detalhes do parceiro:', error);
    }
  };


  const handleLegendPress1 = (track: string) => {
    setSelectedTrack1(selectedTrack1 === track ? null : track);
  };

  const handleSectorPress1 = (event: GestureResponderEvent, track: string) => {
    setSelectedTrack1(selectedTrack1 === track ? null : track);
  };


  const handleLegendPress2 = (track: string) => {
    setSelectedTrack2(selectedTrack2 === track ? null : track);
  };

  const handleSectorPress2 = (event: GestureResponderEvent, track: string) => {
    setSelectedTrack2(selectedTrack2 === track ? null : track);
  };


  const colors = ['#33FF57', '#FF5733', '#3366FF', '#FF33CC', '#FFFF33'];
  const colors2 = ['#909090', '#2D572C', '#3366FF', '#CDA434', '#828282'];

  // const temp = [progressoGeralParceiros?.concluido, progressoGeralParceiros?.em_andamento, progressoGeralParceiros?.nao_iniciado]
  // const PieDataAndamentoParceiros = temp?.map((value: any, index: any) => ({
  //   value,
  //   label: ['Concluido', 'Em andamento', 'Não iniciou'],
  //   key: index, // Usado como identificador único
  //   svg: {
  //     fill: colors[index % colors.length],
  //     onPress: (event: GestureResponderEvent) => handleSectorPress1(event, item.trilha_nome),
  //     ...(selectedTrack1 === item.trilha_nome && { transform: [{ scale: 1.1 }] })
  //   },
  // }));

  const TrilhasConcluidas = partnerCountData.map((item: any, index: any) => ({
    value: Number(item.pconcluido),
    label: item.trilha_nome,
    key: index, // Usado como identificador único
    svg: {
      fill: colors[index % colors.length],
      onPress: (event: GestureResponderEvent) => handleSectorPress1(event, item.trilha_nome),
      ...(selectedTrack1 === item.trilha_nome && { transform: [{ scale: 1.1 }] })
    },
  }));

  const ParceirosPorTrilhas = parceiroTrilha.map((item: any, index: any) => ({
    value: Number(item.count),
    label: item.trilha_nome,
    key: index, // Usado como identificador único
    svg: {
      fill: colors2[index % colors2.length],
      onPress: (event: GestureResponderEvent) => handleSectorPress2(event, item.trilha_nome),
      ...(selectedTrack2 === item.trilha_nome && { transform: [{ scale: 1.1 }] })
    },
  }));
  const Labels = ({ slices }) => {
    return slices.map((slice: any, index: any) => {
      const { pieCentroid, data } = slice;
      return (
        <SvgText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={12}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.value}%
        </SvgText>
      );
    });
  };
  const navigateToPartnerDetails = (parceiroId: string) => {
    DetalhesParceiro(parceiroId); // Chame a função DetalhesParceiro passando o ID do parceiro
    navigation.navigate('DetalhesParceiros', { parceiro_id: parceiroId });
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>

        {/* <Text style={styles.title}>Dados das trilhas</Text>
          {dadosTrilha.map((data) => (
            <View>
              <Text>{data.trilha_nome}: {data.qtotal}</Text>
            </View>
          ))} */}

        {/* <Text style={styles.title}>Tempo medio conclusao</Text>
          {tempoMedioConclusaoTrilha.map((data) => (
            <View>
              <Text>{data.trilha_nome}: {data.media ? data.media : 'Dados insuficiente'}</Text>
            </View>
          ))} */}

        <Text style={styles.title}>Progresso de Parceiros</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Em andamento: {progressoGeralParceiros?.em_andamento}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Concluído: {progressoGeralParceiros?.concluido}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Total: {progressoGeralParceiros?.total}</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>Nome</Text>
            <Text style={styles.header}>Trilha</Text>
            <Text style={styles.header}>Progresso</Text>
          </View>

          {partnerProgress.map((partner, index) => (
            <View key={index}>
              <Pressable onPress={() => navigateToPartnerDetails(partner.parceiro_id)}>
                <View style={styles.row}>

                  <Text style={styles.data}>{partner.parceiro_nome}</Text>
                  <Text style={styles.data}>{partner.trilha_nome}</Text>
                  <View style={styles.progressContainer} >
                    <Progress.Bar
                      style={styles.progressBar}
                      progress={partner.progresso}
                      width={110}
                      height={15}

                      borderWidth={1}
                      color={'#17E753'}
                    />
                    <View style={styles.progressBarContent}>
                      <Text style={styles.bar}>{Math.round(partner.progresso * 100)}%</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
        <Text style={styles.title}> Trilhas concluidas pelos parceiros:</Text>

        <View style={{ flex: 1, height: 200, }}>
          <PieChart
            style={{ flex: 1 }}
            data={TrilhasConcluidas}
            innerRadius={'50%'} // Define o tamanho do buraco central
            padAngle={0.06} // Define o espaçamento entre os setores

          >
            <Labels slices={TrilhasConcluidas} />
          </PieChart>
          <View style={styles.legendContainer}>
            {partnerCountData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.legendItem,
                  selectedTrack1 === item.trilha_nome && styles.selectedLegendItem
                ]}
                onPress={() => handleLegendPress1(item.trilha_nome)}
                activeOpacity={0.7}
              >
                <View style={[styles.legendColorBox, { backgroundColor: colors[index % colors.length] }]} />
                <Text style={{ color: '#fff' }}>{item.trilha_nome} {item.pconcluido}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        <Text style={styles.title}>Parceiros por trilhas:</Text>

        <View style={{ flex: 1, height: 200 }}>
          <PieChart
            style={{ flex: 1 }}
            data={ParceirosPorTrilhas}
            innerRadius={'50%'} // Define o tamanho do buraco central
            padAngle={0.06} // Define o espaçamento entre os setores


          >
            <Labels slices={TrilhasConcluidas} />
          </PieChart>

          <View style={styles.legendContainer}>
            {parceiroTrilha.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.legendItem,
                  selectedTrack2 === item.trilha_nome && styles.selectedLegendItem
                ]}
                onPress={() => handleLegendPress2(item.trilha_nome)}
                activeOpacity={0.7}
              >
                <View style={[styles.legendColorBox, { backgroundColor: colors2[index % colors2.length] }]} />
                <Text style={{ color: '#fff' }}>{item.trilha_nome}: {item.count} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
      <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
      {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
    </>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#272424',
    paddingHorizontal: 16,
  },

  tableContainer: {
    backgroundColor: '#f0f0f0',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  }, selectedLegendItem: {
    transform: [{ scale: 1.1 }], // Aplica uma escala maior ao item selecionado na legenda
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  data: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  bar: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressBar: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  progressBarContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,

  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  legendColorBox: {
    width: 20,
    height: 10,
    marginRight: 5,

  },
});


export default DashboardPartner;
