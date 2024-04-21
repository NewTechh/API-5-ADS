import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from '../../services/IPAddress';
import { TextInputMask } from "react-native-masked-text";

type RootStackParamList = {
    EditarParceiro: undefined
}

type EditarParceiroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarParceiro'>;

type Props = {
  navigation: EditarParceiroScreenNavigationProp;
  route: any
};

const telefoneRegex = /^\([1-9]{2}\) 9?[0-9]{4}-[0-9]{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;

const EditarParceiro = ({ navigation, route }: Props) => {
  const { parceiro } = route.params;
  const [parceiroData, setParceiroData] = useState({
    parceiro_email: '',
    parceiro_telefone: '',
    parceiro_logradouro: '',
    parceiro_logradouro_numero: '',
    parceiro_bairro: '',
    parceiro_cep: '',
    parceiro_cidade: '',
    parceiro_estado: ''
  });

  useEffect(() => {
    // Quando o componente monta, preencha os dados do parceiro nos campos de input
    setParceiroData(parceiro);
  }, []);

  const handleChange = (name: keyof typeof parceiroData, value: string) => {
    // Atualize o estado com os novos dados do parceiro
    setParceiroData({ ...parceiroData, [name]: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    
    // Verifica se algum campo está vazio
    for (const field in parceiroData) {
        if (!parceiroData[field as keyof typeof parceiroData]) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
        }
    }
    try {
      const response = await fetch(`http://${getIpAddress()}:3001/PutParceiro/Parceiros/${parceiro.parceiro_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parceiroData)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar os dados do parceiro');
      }

      Alert.alert('Edição Realizada com sucesso')
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar os dados do parceiro:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados do parceiro. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Edição do Parceiro</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={parceiroData.parceiro_email}
            onChangeText={(text) => handleChange('parceiro_email', text)}
        />
        <TextInputMask
            style={styles.input}
            placeholder="Telefone"
            type={'cel-phone'}
            options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
            }}
            value={parceiro.parceiro_telefone}
            onChangeText={(text) => handleChange('parceiro_telefone', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Logradouro"
            value={parceiroData.parceiro_logradouro}
            onChangeText={(text) => handleChange('parceiro_logradouro', text)}
        />
        <TextInputMask
            style={styles.input}
            placeholder="Número"
            type={'only-numbers'}
            value={parceiroData.parceiro_logradouro_numero}
            onChangeText={(text) => handleChange('parceiro_logradouro_numero', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={parceiroData.parceiro_bairro}
            onChangeText={(text) => handleChange('parceiro_bairro', text)}
        />
        <TextInputMask
            style={styles.input}
            placeholder="CEP"
            type={'zip-code'}
            value={parceiro.parceiro_cep}
            onChangeText={(text) => handleChange('parceiro_cep', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={parceiroData.parceiro_cidade}
            onChangeText={(text) => handleChange('parceiro_cidade', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Estado"
            value={parceiroData.parceiro_estado}
            onChangeText={(text) => handleChange('parceiro_estado', text)}
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

export default EditarParceiro;