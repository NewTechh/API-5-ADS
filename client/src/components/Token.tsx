import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, TouchableOpacity, Pressable } from 'react-native'; // Adicionado Pressable
import getIpAddress from '../../services/IPAddress';

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

    const handleSignUp = () => {
        navigation.navigate('NovaSenha');
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
