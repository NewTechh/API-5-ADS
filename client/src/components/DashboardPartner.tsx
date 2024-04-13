import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const DashboardPartner = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40;

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

  const barChartData = {
    labels: ["Product Area", "Qualifiers", "Regional Market"],
    datasets: [
      {
        data: [20, 15, 25],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
      }
    ]
  };

  // Dados de exemplo para o progresso dos parceiros
  const partnerProgress = [
    { name: "José Souza", cnpj: "1234567890001-01", progress: 70 },
    { name: "Roberta Almeida", cnpj: "9876543210001-02", progress: 40 },
    { name: "Junior Santos", cnpj: "4567891230001-03", progress: 90 }
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Progresso de Parceiros</Text>
      <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Nome</Text>
          <Text style={styles.header}>CNPJ</Text>
          <Text style={styles.header}>Progresso</Text>
        </View>
      </View>
        {partnerProgress.map((partner, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Text style={styles.data}>{partner.name}</Text>
              <Text style={styles.data}>{partner.cnpj}</Text>
              <Text style={styles.data}>{partner.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${partner.progress}%` }]} />
            </View>
            <View style={styles.separator} />
          </View>
        ))}
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

      <Text style={styles.title}>Demandas por Área:</Text>
      <BarChart
        data={barChartData}
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
    fontSize: 16,
    textAlign: 'center',
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'black',
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
