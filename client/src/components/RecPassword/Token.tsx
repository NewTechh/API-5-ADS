import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import getIpAddress from '../../../services/IPAddress';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação do AsyncStorage

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Token: undefined;
    NovaSenha: undefined;
    Login: undefined;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Token'>;

const Token = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [inputValue, setInputValue] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Função para buscar o email armazenado no AsyncStorage quando o componente montar
        const getEmailFromStorage = async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                if (email !== null) {
                    setEmail(email);
                }
            } catch (error) {
                console.log('Erro ao obter email do AsyncStorage:', error);
            }
        };

        getEmailFromStorage();

        // Função para consumir a rota e setar userId e userType no AsyncStorage
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://${getIpAddress()}:3001/Auth/emailPorID/${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter dados do usuário');
                }

                const userData = await response.json();

                // Armazenar userId e userType no AsyncStorage
                await AsyncStorage.setItem('userId', userData.userId);
                await AsyncStorage.setItem('userType', userData.userType);

                // Atualizar os estados com os dados obtidos
                setUserId(userData.userId);
                setUserType(userData.userType);
            } catch (error) {
                console.log('Erro ao obter dados do usuário:', error);
                // Tratar erro, se necessário
            }
        };

        // Chamar a função de busca de dados quando o email estiver disponível
        if (email) {
            fetchUserData();
        }
    }, [email]);

    const handleSignUp = async () => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/Auth/validar-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: inputValue }),
            });

            const data = await response.json();
            Alert.alert('Validação do Token', data.message);

            // Caso o token seja válido, navegar para a tela de Nova Senha
            if (response.ok) {
                navigation.navigate('NovaSenha');
            }
        } catch (error) {
            console.log('Erro ao validar o token:', error);
            Alert.alert('Erro', 'Erro ao validar o token');
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Token</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Digite seu token"
                onChangeText={setInputValue}
                value={inputValue}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <Pressable style={styles.backToLogin} onPress={handleLogin}>
                <Text style={{ color: "white" }}>Voltar para a página de </Text>
                <Text style={styles.TxtBackLogin}>Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
      },
    title: {
        fontSize: 34,
        marginBottom: 80,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
        fontWeight: 'bold',
    },

    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    backToLogin: {
        flexDirection: "row",
        padding: 10,
        alignItems: 'center',
    },
    TxtBackLogin: {
        fontSize: 15,
        color: "white",
        textDecorationLine: 'underline',
    }
});

export default Token;
