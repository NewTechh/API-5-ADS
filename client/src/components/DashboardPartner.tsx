import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardPartner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso de Parceiros</Text>
      <View style={styles.tableContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Nome</Text>
          <Text style={styles.header}>CNPJ</Text>
          <Text style={styles.header}>Status</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.data}>José Souza</Text>
          <Text style={styles.data}>1234567890001-01</Text>
          <Text style={[styles.data, styles.active]}>Ativo</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.data}>Roberta Almeida</Text>
          <Text style={styles.data}>9876543210001-02</Text>
          <Text style={[styles.data, styles.inactive]}>Inativo</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.data}>Junior Santos</Text>
          <Text style={styles.data}>4567891230001-03</Text>
          <Text style={[styles.data, styles.active]}>Ativo</Text>
        </View>
        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#312D2A',
  },
  title: {
    fontSize: 35,
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
    fontSize: 16,
    textAlign: 'center',
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'black',
  },
});

export default DashboardPartner;
