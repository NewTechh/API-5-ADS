import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getIpAddress from '../../services/IPAddress';
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  EditarConsultor: undefined
}

type EditarConsultorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarConsultor'>;

type Props = {
  navigation: EditarConsultorScreenNavigationProp;
  route: any
};

type ConsultorData = {
  [key: string]: any; // Aceita qualquer chave dinâmica
}

const EditarConsultor = ({ navigation, route }: Props) => {
  const { consultor } = route.params;
  const [consultorData, setConsultorData] = useState<ConsultorData>({
    consultor_alianca_email: ''
  });
  const [consultorDataBeforeEdit, setConsultorDataBeforeEdit] = useState<ConsultorData>({}); // Ajuste da tipagem aqui

  useEffect(() => {
    setConsultorData(consultor);
    setConsultorDataBeforeEdit(consultor); // Atualiza os dados antes da edição quando o componente monta
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
  
      const adminId = await AsyncStorage.getItem('usuario_id');
  
      const changes = [];
      for (const field in consultorData) {
        if (consultorData[field as keyof typeof consultorData] !== consultorDataBeforeEdit[field as keyof typeof consultorData]) {
          // Verifica se o campo alterado é o email
          if (field === 'consultor_alianca_email') {
            changes.push(`O email foi alterado de ${consultorDataBeforeEdit[field as keyof typeof consultorData]} para ${consultorData[field as keyof typeof consultorData]}`);
          } else {
            // Para outros campos, adicione a lógica aqui
          }
        }
      }
      const registroLogAlteracao = changes.join('\n');
  
      // Obtendo informações do consultor de alianças do backend usando o ID
      const adminResponse = await fetch(`http://${getIpAddress()}:3001/GetAdmin/Administradores/${adminId}`);
      const adminData = await adminResponse.json();
  
      // Construir mensagem de ação do registro de log
      const registroLogAcao = `Administrador ${adminData.administrador_nome} editou os dados do consultor de alianças ${consultor.consultor_alianca_nome}`;
  
      // Enviar o registro de log para o backend
      await fetch(`http://${getIpAddress()}:3001/Log/EdicaoConsultorLog/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registro_log_acao: registroLogAcao,
          registro_log_alteracao: registroLogAlteracao,
          registro_log_fluxo: "Administrador --> Consultor de Aliança",
          id_administrador: adminId,
          id_consultor_alianca: consultor.consultoralianca_id,
        })
      });
  
      Alert.alert('Edição Realizada com sucesso');
      navigation.goBack();
      console.log(registroLogAlteracao)
    } catch (error) {
      console.error('Erro ao salvar os dados do consultor:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados do consultor. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição do Consultor</Text>
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

export default EditarConsultor;
