import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterConsultor from './Consultor/FooterConsultor';
import SideMenuConsultor from './Consultor/SideMenuConsultor';
import getIpAddress from '../../services/IPAddress';
import * as Progress from 'react-native-progress';
type RootStackParamList = {
  Dashboard: undefined;
}

type PartnerCountData = {
  trilha_nome: string;
  count: number;
};

type PartnerProgress = {
  parceiro_nome: string;
  trilha_nome: string;
  progresso: number;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardPartner = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40;
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [partnerCountData, setPartnerCountData] = useState<PartnerCountData[]>([]);
  const [partnerProgress, setPartnerProgress] = useState<PartnerProgress[]>([]);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  useEffect(() => {
    fetchPartnerProgress();
    fetchPartnerCountByTrack();
  }, []);

  const fetchPartnerProgress = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/ParceirosProgresso`);
      const data = await response.json();
      setPartnerProgress(data);
    } catch (error) {
      console.error('Erro ao obter progresso dos parceiros:', error);
    }
  };

  const fetchPartnerCountByTrack = async () => {
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/Dashboard/graficoParceirosPorTrilha`);
      const data = await response.json();
      setPartnerCountData(data);
    } catch (error) {
      console.error('Erro ao obter contagem de parceiros por trilha:', error);
    }
  };

  const data = [
    {
      name: "OCP",
      population: 8,
      color: "#F44336",
      legendFontColor: "white",
      legendFontSize: 13
    },
    {
      name: "Marketing",
      population: 10,
      color: "#9C27B0",
      legendFontColor: "white",
      legendFontSize: 13
    },
    {
      name: "Oracle DB",
      population: 15,
      color: "#2196F3",
      legendFontColor: "white",
      legendFontSize: 13
    },
    {
      name: "ZFS Storage",
      population: 30,
      color: "#4CAF50",
      legendFontColor: "white",
      legendFontSize: 13
    },
    {
      name: "CC",
      population: 37,
      color: "#FFEB3B",
      legendFontColor: "white",
      legendFontSize: 13
    }
  ];

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Progresso de Parceiros</Text>
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>Nome</Text>
            <Text style={styles.header}>Trilha</Text>
            <Text style={styles.header}>Progresso</Text>
          </View>
          {partnerProgress.map((partner, index) => (
            <View key={index}>
              <View style={styles.row}>
                <Text style={styles.data}>{partner.parceiro_nome}</Text>
                <Text style={styles.data}>{partner.trilha_nome}</Text>
                <View >
                  <Progress.Bar style={{ borderRadius: 10, marginLeft: 10, marginTop: 6, marginRight: 10, }}
                    progress={partner.progresso} width={110} height={15} borderWidth={1} color={'#17E753'} >
                    <Text style={styles.bar}>{Math.round(partner.progresso * 100)}%</Text>
                  </Progress.Bar>
                </View>
              </View>


            </View>
          ))}
        </View>
        <Text style={styles.title}>Top 5 Cursos Procurados:</Text>
        <PieChart
          data={data}
          width={chartWidth}
          height={160}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="5"
        />

        <Text style={styles.title}>Parceiros por Trilha:</Text>
        <BarChart
          data={{
            labels: partnerCountData.map(item => item.trilha_nome), // Usando os dados de contagem de parceiros por trilha
            datasets: [{
              data: partnerCountData.map(item => item.count), // Usando os dados de contagem de parceiros por trilha
            }],
          }}
          width={chartWidth}
          height={220}
          yAxisSuffix=""
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            barPercentage: 0.5
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </ScrollView>
      <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
      {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
    </>

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
    color: 'white',
  },
  tableContainer: {
    backgroundColor: '#f1f1f1',
    width: "100%",
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
  bar: {
    position: 'absolute',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginLeft: 45,
    marginTop: -3,
  },
  data: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  progress: {
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
});

export default DashboardPartner;
