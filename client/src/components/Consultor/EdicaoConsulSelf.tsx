import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInputMask } from "react-native-masked-text";
import getIpAddress from '../../../services/IPAddress';

type RootStackParamList = {
  EditarAdminSelf: undefined
}

type EditarAdminSelfScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarAdminSelf'>;

type Props = {
  navigation: EditarAdminSelfScreenNavigationProp;
  route: any
};

const EdicaoConsulSelf = ({ navigation, route }: Props) => {
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
      } else {
        const registroLogAcao = `Edição de dados do consultor`;
        const registroLogAlteracao = `Realizado a edição autônoma de dados do consultor ${consultor.consultor_alianca_nome}`;
        
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
      console.error('Erro ao salvar os dados do consultor:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados do consultor. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edite seus dados</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={consultorData.consultor_alianca_email}
        onChangeText={(text) => handleChange('consultor_alianca_email', text)}
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
    marginBottom: 50,
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
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EdicaoConsulSelf;
