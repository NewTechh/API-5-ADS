import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../services/IPAddress';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { width } from 'pdfkit/js/page';

type FormDataPropsLogin = {
  parceiro_email: string,
  parceiro_senha: string
}

type RootStackParamList = {
  Cursos: undefined;
  Cadastro: undefined;
  RecSenha: undefined;
  ListPartner: undefined;
  Dashboard: undefined;
  ListConsultores: undefined;
  ParceiroHome: undefined;
  ConsultorHome: undefined;
  AdminHome: undefined;
};

type CursosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cursos'>;

const LoginScreen = () => {
  const [parceiro_email, setParceiroEmail] = useState('');
  const [parceiro_senha, setParceiroSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<CursosScreenNavigationProp>();

  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleRecSenha = () => {
    navigation.navigate('RecSenha');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.clear();
    });
    return unsubscribe;
  }, [navigation]);

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
      const response = await fetch(`http://${getIpAddress()}:3001/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json(); // Converter a resposta para JSON
        const userId = responseData.userId;
        const userType = responseData.userType;

        await AsyncStorage.setItem('usuario_id', userId);
        await AsyncStorage.setItem('usuario_tipo', userType);

        console.log(userId)
        console.log(userType)

        resetFields()

        if (userType === 'Parceiro') {
          navigation.navigate('ParceiroHome')
        } else if (userType === 'Administrador') {
          navigation.navigate('AdminHome')
        } else if (userType === 'Consultor de Aliança') {
          navigation.navigate('ConsultorHome')
        }

      } else if (response.status === 404) {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message);

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground
        style={styles.image}

        source={require('../../assets/oracle.png')}
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        value={parceiro_email}
        onChangeText={setParceiroEmail}
        placeholder="Digite seu email"
      />

      <View style={styles.divSenha}>
        <TextInput
          style={styles.input}
          value={parceiro_senha}
          onChangeText={setParceiroSenha}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
        />

        {parceiro_senha !== '' && parceiro_senha !== undefined && (
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color='#000000'
            style={styles.iconEye}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button} >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>


      <View style={styles.content}>

        <Text style={[styles.text]} onPress={handleRecSenha}>Esqueceu a senha?</Text>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272424',
    paddingHorizontal: 16,
  },

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

  divSenha: {
    width: '100%',
    height: 40,
    marginBottom: 20,
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

  iconEye: {
    position: 'absolute',
    right: 7,
    bottom: 7,
  },

})


export default LoginScreen;
function localIpUrl() {
  throw new Error('Function not implemented.');
}

