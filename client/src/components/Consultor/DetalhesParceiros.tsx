import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getIpAddress from '../../../services/IPAddress';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

const DetalhesParceiros = ({ navigation }) => {
    const [consultorNome, setConsultorNome] = useState('');
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    // useEffect(() => {
    //     const fetchConsultorData = async () => {
    //         try {
    //             const consultor_alianca_id = await AsyncStorage.getItem('usuario_id');
    //             const response = await axios.get(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultor_alianca_id}`);
    //             setConsultorNome(response.data?.consultor_alianca_nome || 'Consultor');
    //         } catch (error) {
    //             console.error('Erro ao buscar dados do consultor:', error);
    //         }
    //     };

    //     fetchConsultorData();
    // }, []);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Empresa X (parceiro selecionado)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Trilha: Cloud Build</Text>
          <Text style={styles.value}>Em andamento</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de aquisição:</Text>
          <Text style={styles.value}>01/01/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de início:</Text>
          <Text style={styles.value}>09/01/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Última atividade:</Text>
          <Text style={styles.value}>02/02/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expertises desenvolvidas:</Text>
          <Text style={styles.value}>2 / 8</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Trilha: Cloud Sell</Text>
          <Text style={styles.value}>Concluída</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de aquisição:</Text>
          <Text style={styles.value}>01/01/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de início:</Text>
          <Text style={styles.value}>01/01/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Última atividade:</Text>
          <Text style={styles.value}>09/01/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expertises desenvolvidas:</Text>
          <Text style={styles.value}>15 / 15</Text>
        </View>
      </View>
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