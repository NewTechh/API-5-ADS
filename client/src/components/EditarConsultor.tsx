import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from '../../services/IPAddress';
import { TextInputMask } from "react-native-masked-text";

type RootStackParamList = {
    EditarConsultor: undefined
}

type EditarConsultorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarConsultor'>;

type Props = {
  navigation: EditarConsultorScreenNavigationProp;
  route: any
};

const EditarConsultor = ({ navigation, route }: Props) => {
  const { consultor } = route.params;
  const [consultorData, setConsultorData] = useState({
    consultor_alianca_email: ''
  });

  useEffect(() => {
    // Quando o componente monta, preencha os dados do parceiro nos campos de input
    setConsultorData(consultor);
  }, []);

  const handleChange = (name: keyof typeof consultorData, value: string) => {
    // Atualize o estado com os novos dados do parceiro
    setConsultorData({ ...consultorData, [name]: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    
    // Verifica se algum campo está vazio
    for (const field in consultorData) {
        if (!consultorData[field as keyof typeof consultorData]) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
        }
    }
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/PutConsultor/Consultores/${consultor.consultor_alianca_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consultorData)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar os dados do consultor');
      }

      Alert.alert('Edição Realizada com sucesso')
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar os dados do consultor:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados do consultor. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Edição do Parceiro</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={consultorData.consultor_alianca_email}
            onChangeText={(text) => handleChange('consultor_alianca_email', text)}
        />
      <View style={styles.buttonWrapper}>
        <Button title="Voltar" onPress={handleBack} />
        <Button title="Salvar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonWrapper: {
    flexDirection: 'row', // Posiciona os botões lado a lado
    justifyContent: 'space-between', // Distribui os botões igualmente no espaço disponível
    width: '40%', // Para garantir que os botões ocupem toda a largura
  }
});

export default EditarConsultor;
