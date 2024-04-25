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

const EdicaoInfoPartner = ({ navigation, route }: Props) => {
  const { parceiro } = route.params;
  const [parceiroData, setParceiroData] = useState({
    parceiro_email: '',
    parceiro_telefone: ''
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
      } else {

        const registroLogAcao = `Edição de dados do parceiro`;
        const registroLogAlteracao = `Realizado a edição autônoma de dados do parceiro ${parceiro.parceiro_nome}`;
        
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
        value={parceiroData.parceiro_telefone}
        onChangeText={(text) => handleChange('parceiro_telefone', text)}
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

export default EdicaoInfoPartner;
