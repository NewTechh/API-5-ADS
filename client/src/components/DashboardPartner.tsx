import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, TouchableOpacity, GestureResponderEvent, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterConsultor from './Consultor/FooterConsultor';
import SideMenuConsultor from './Consultor/SideMenuConsultor';
import getIpAddress from '../../services/IPAddress';
import * as Progress from 'react-native-progress';
import { PieChart, } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { BarChart } from 'react-native-gifted-charts';

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

interface BarData {
  value: number;
  label: string;
  frontColor?: string;
}

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
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BarData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllPartners, setShowAllPartners] = useState(false);

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


  const colors = ['#33FF57', '#FF5733', '#3366FF', '#FF33CC',];

  const colors2 = ['#EA4C89', '#28B2B3', '#3366FF', '#FFF500',];

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

  const Labels = ({ slices }: { slices: any }) => {
    return slices.map((slice: any, index: any) => {
      const { pieCentroid, data } = slice;
      return (
        <SvgText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={12}
          stroke={'black'}
          strokeWidth={0.5}
        >
          {data.value}
        </SvgText>
      );
    });
  };

  const navigateToPartnerDetails = (parceiroId: string) => {
    DetalhesParceiro(parceiroId); // Chama a função DetalhesParceiro passando o ID do parceiro
    navigation.navigate('DetalhesParceiros', { parceiro_id: parceiroId });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://${getIpAddress()}:3001/Dashboard/Grafico2TaxaDeConclusao`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }

        const json = await response.json();

        if (!Array.isArray(json)) {
          throw new Error('Resposta da API não é um array');
        }

        const formattedData: BarData[] = json.map((item: any, index: number) => {
          const value = parseFloat(item.taxa) * 100;
          if (isNaN(value)) {
            return null;
          }
          return {
            value,
            label: item.trilha_nome,
            frontColor: getColorForBar(index), // Define a cor individual para cada barra
          };
        }).filter(item => item !== null) as BarData[];

        setData(formattedData);
        setError(null);
      } catch (error: any) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para determinar a cor de cada barra com base no índice
  const getColorForBar = (index: number): string => {
    const colors = ['#ff6347', '#3cb371', '#1e90ff', '#ff69b4', '#ffa500'];
    return colors[index % colors.length]; // Cicla pelas cores se houver mais barras que cores
  };


  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }


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

        <View style={styles.card2}>
          <Text style={{ fontSize: 11, color: 'red', margin: 2, }}>Não iniciaram: {progressoGeralParceiros?.nao_iniciado}</Text>
          <Text style={{ fontSize: 11, color: 'blue', margin: 2, }}>Em andamento: {progressoGeralParceiros?.em_andamento}</Text>
          <Text style={{ fontSize: 11, color: 'green', margin: 2, }}>Concluído: {progressoGeralParceiros?.concluido}</Text>
          <Text style={{ fontSize: 11, color: 'black', margin: 2, fontWeight: 'bold',}}>Total: {progressoGeralParceiros?.total}</Text>
        </View>

        <View style={styles.card}>

          <View style={styles.tableContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.header}>Nome</Text>
              <Text style={styles.header}>Trilha</Text>
              <Text style={styles.header}>Progresso</Text>
            </View>
            {showAllPartners ? (
              partnerProgress.map((partner, index) => (

                <TouchableOpacity key={index} onPress={() => navigateToPartnerDetails(partner.parceiro_id)}>
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
                </TouchableOpacity>

              ))
            ) : (
              partnerProgress.slice(0, 5).map((partner, index) => (
                <TouchableOpacity key={index} onPress={() => navigateToPartnerDetails(partner.parceiro_id)}>
                  <View style={styles.row}>
                    <Text style={styles.data}>{partner.parceiro_nome}</Text>
                    <Text style={styles.data}>{partner.trilha_nome}</Text>
                    <View style={styles.progressContainer}>
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
                </TouchableOpacity>
              ))
            )}
            {/* Botão para expandir ou recolher a lista de parceiros */}
            <TouchableOpacity style={styles.button} onPress={() => setShowAllPartners(!showAllPartners)}>
              <Text style={{ color: 'white' }}>{showAllPartners ? 'Recolher' : 'Mostrar Mais'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title2}> Trilhas concluidas pelos parceiros:</Text>
          <View style={{ flex: 1, marginTop: 20 }}>
            <PieChart
              style={{ flex: 1, height: 160 }}
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
                  <Text style={{ color: '#000', marginTop: 10, }}>{item.trilha_nome} </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title2}>Parceiros por trilhas:</Text>
          <View style={{ flex: 1, marginTop: 20, }}>
            <PieChart
              style={{ flex: 1, height: 160 }}
              data={ParceirosPorTrilhas}
              innerRadius={'50%'} // Define o tamanho do buraco central
              padAngle={0.07} // Define o espaçamento entre os setores
            >
              <Labels slices={ParceirosPorTrilhas} />
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
                  <Text style={{ color: '#000', marginTop: 10, }}>{item.trilha_nome} </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title2}>Taxa de Conclusão por trilha:</Text>
          <BarChart
            data={data}
            width={chartWidth}
            height={300}
            barWidth={35}
            spacing={40}
            isAnimated
            xAxisLabelTextStyle={{
              color: 'black',
              fontSize: 8, width: 80,
              textAlign: 'center', fontWeight: 'bold',
            }}
            rulesColor={'#000'}
            yAxisTextStyle={{ color: 'black', }}
            formatYLabel={(value) => `${value}%`}
            barBorderRadius={2}
            initialSpacing={8}
            renderTooltip={(item: any, index: number) => {
              return (
                <View
                  style={{marginBottom: 20,marginLeft: -6,backgroundColor: '#ffcefe',paddingHorizontal: 6,paddingVertical: 4, borderRadius: 4,}}>
                  <Text> {`${item.value.toFixed(1)}%`}</Text>
                </View>
              );
            }}
          />

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
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
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
    marginLeft: -10,
  },
  selectedLegendItem: {
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
    marginRight: -20,
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
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColorBox: {
    width: 20,
    height: 10,
    marginRight: 5,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title2: {
    flex: 1,
    fontSize: 33,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black'
  },
  button: {
    flexDirection: 'row',
    height: 30,
    marginRight: 90,
    marginLeft: 90,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  }
});

export default DashboardPartner;