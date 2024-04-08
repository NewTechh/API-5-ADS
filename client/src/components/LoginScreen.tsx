import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type FormDataPropsLogin = {
  parceiro_email: string,
  parceiro_senha: string
}

type RootStackParamList = {
  Dashboard: undefined;
  Cadastro: undefined;
  RecSenha: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;



const LoginScreen = () => {
  const [parceiro_email, setParceiroEmail] = useState('');
  const [parceiro_senha, setParceiroSenha] = useState('');
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleRecSenha = () => {
    navigation.navigate('RecSenha');
  };

  async function handleLogin() {
    const data: FormDataPropsLogin = {
      parceiro_email: parceiro_email,
      parceiro_senha: parceiro_senha
    };

    function resetFields() {
      setParceiroEmail('');
      setParceiroSenha('');
    }

    try {
      const response = await fetch('http://192.168.42.16:3001/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json(); // Converter a resposta para JSON
        const userId = responseData.userId;
        await AsyncStorage.setItem('parceiro_id', userId);
        console.log(AsyncStorage.getItem('parceiro_id'))
        alert('Login Realizado!')
        resetFields()
        navigation.navigate('Dashboard')
      } else {
        const errorMessage = await response.text();
        console.log('Erro ao fazer login', errorMessage);
        alert("Credenciais inválidas")
      }
    } catch (error: any) {
      console.log('Erro ao fazer login', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}

        source={require('../../assets/oracle.png')}
      />
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        value={parceiro_email}
        onChangeText={setParceiroEmail}
        placeholder="Digite seu email"
      />

      <TextInput
        style={styles.input}
        value={parceiro_senha}
        onChangeText={setParceiroSenha}
        placeholder="Digite sua senha"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} >
        <Text onPress={handleLogin} style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>


      <View style={styles.content}>

        <Text style={[styles.text]} onPress={handleRecSenha}>Esqueceu a senha?</Text>

        <Text style={styles.text} onPress={handleCadastroPress}>Não tem uma conta? Crie uma!</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    paddingTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  content: {
    paddingTop: 10,
    gap: 5,
  },

  title: {
    fontSize: 34,
    marginBottom: 100,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },

  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 20,
    borderRadius: 10,
    fontWeight: 'bold',

  },
  image: {
    height: 60,
    width: 90,
    paddingVertical: 10,
    marginTop: 150,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272424',
    paddingHorizontal: 16,
    paddingBottom: 150,
    paddingTop: 50,
  },



  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#C74634',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

})


export default LoginScreen;
