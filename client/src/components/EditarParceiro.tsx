import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from '../../services/IPAddress';
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        }

        // Obter a resposta JSON do servidor
        const responseBody = await response.json();
        const { updatedFields } = responseBody;

        // Verificar quais campos foram alterados
        const changedFields = [];
        for (const field in updatedFields) {
            if (parceiro[field as keyof typeof parceiroData] !== updatedFields[field]) {
                changedFields.push({ field, oldValue: parceiro[field as keyof typeof parceiroData], newValue: updatedFields[field] });
            }
        }

        // Construir mensagens de log com base nos campos alterados
        const logMessages = changedFields.map(({ field, oldValue, newValue }) => `O ${field.replace('parceiro_', '')} foi alterado de ${oldValue} para ${newValue}`);

        const consultorId = await AsyncStorage.getItem('usuario_id');

        // Obtendo informações do consultor de alianças do backend usando o ID
        const consultorResponse = await fetch(`http://${getIpAddress()}:3001/GetConsultor/Consultores/${consultorId}`);
        const consultorData = await consultorResponse.json();

        // Construir mensagem de ação do registro de log
        const registroLogAcao = `Consultor de Aliança ${consultorData.consultor_alianca_nome} editou os dados do parceiro ${parceiro.parceiro_nome}`;

        // Enviar o registro de log para o backend
        
        await fetch(`http://${getIpAddress()}:3001/Log/EdicaoParceiroLog/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                registro_log_acao: registroLogAcao,
                registro_log_alteracao: logMessages.join('; \n'),
                registro_log_fluxo: "Consultor de Aliança --> Parceiro",
                id_consultor: consultorId,
                id_parceiro: parceiro.parceiro_id,
            })
        });

        Alert.alert('Edição Realizada com sucesso');
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
        placeholder="CEP"
        type={'zip-code'}
        value={parceiroData.parceiro_cep}
        onChangeText={(text) => {
          handleChange('parceiro_cep', text);
          if (text.length === 9 && cepRegex.test(text)) {
            handleSearchCep(text);
          }
        }}
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
          <Text style={styles.buttonText}>Cancelar</Text>
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

export default EditarParceiro;
