import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInputMask } from "react-native-masked-text";
import getIpAddress from '../../../services/IPAddress';

type RootStackParamList = {
  EditarParceiro: undefined
}

type EditarParceiroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarParceiro'>;

type Props = {
  navigation: EditarParceiroScreenNavigationProp;
  route: any
};

const cepRegex = /^\d{5}-\d{3}$/;

const EdicaoEnderecoPartner = ({ navigation, route }: Props) => {
  const { parceiro } = route.params;
  const [parceiroData, setParceiroData] = useState({
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


  const handleSearchCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o CEP');
      }
      const data = await response.json();
      setParceiroData({
        ...parceiroData,
        parceiro_logradouro: data.logradouro || '',
        parceiro_bairro: data.bairro || '',
        parceiro_cidade: data.localidade || '',
        parceiro_estado: data.uf || ''
      });
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      Alert.alert('Erro', 'Erro ao buscar o CEP. Por favor, verifique se o CEP está correto e tente novamente.');
    }
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
      } else {

        const registroLogAcao = `Edição de endereço do parceiro`;
        const registroLogAlteracao = `Realizado a edição autônoma do endereço do parceiro ${parceiro.parceiro_nome}`;
        
        // Enviar o registro de log para o backend
        await fetch(`http://${getIpAddress()}:3001/Log/SignUpLog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                registro_log_acao: registroLogAcao,
                registro_log_alteracao: registroLogAlteracao,
                registro_log_fluxo: "Alteração autônoma",
            })
        });

        Alert.alert('Edição Realizada com sucesso')
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao salvar os dados do parceiro:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados do parceiro. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição do Parceiro</Text>

      <TextInputMask
        style={styles.input}
        placeholder="CEP"
        type={'zip-code'}
        value={parceiroData.parceiro_cep}
        onChangeText={(text) => {
          handleChange('parceiro_cep', text);
          if (text.length === 9) {
            handleSearchCep(text);
          }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Logradouro"
        value={parceiroData.parceiro_logradouro}
        onChangeText={(text) => handleChange('parceiro_logradouro', text)}
      />
      <TextInputMask
        style={styles.input}
        placeholder="Número do Logradouro"
        value={parceiroData.parceiro_logradouro_numero}
        type={'only-numbers'}
        onChangeText={(text) => handleChange('parceiro_logradouro_numero', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={parceiroData.parceiro_bairro}
        onChangeText={(text) => handleChange('parceiro_bairro', text)}
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
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#272424',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 20,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row', // Posiciona os botões lado a lado
    justifyContent: 'space-between', // Distribui os botões igualmente no espaço disponível
    width: '100%', // Para garantir que os botões ocupem toda a largura
    paddingHorizontal: 5, // Adiciona espaçamento horizontal para evitar que os botões fiquem muito próximos às bordas
  },
  button: {
    backgroundColor: '#C74634',
    paddingVertical: 10,
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EdicaoEnderecoPartner;
