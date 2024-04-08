import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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

  async function handleLogin () {
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
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={parceiro_email}
        onChangeText={setParceiroEmail}
        placeholder="Digite seu email"
      />
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={parceiro_senha}
        onChangeText={setParceiroSenha}
        placeholder="Digite sua senha"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={handleRecSenha}>
          <Text style={[styles.link, styles.linkMargin, styles.signupLink]}>Esqueceu a senha?</Text>
        </TouchableOpacity>
          <Text style={styles.link}>Não tem um cadastro?</Text>
        <TouchableOpacity onPress={handleCadastroPress}>
          <Text style={styles.signupLink}>Cadastre-se</Text>
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
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
  },
  linkMargin: {
    marginBottom: 5,
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
