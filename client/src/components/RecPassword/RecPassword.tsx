import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styles } from './styles';
import getIpAddress from "../../../services/IPAddress";

type FormDataProps = {
    email: string;
}

type RootStackParamList = {
    RecPassword: undefined;
    Login: undefined;
    Token: undefined;
}

type RecPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecPassword'>;

const Schema = yup.object().shape({
    email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
});

export function RecPassword() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(Schema)
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<RecPasswordScreenNavigationProp>();

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleEnviarCodigo = async (data: FormDataProps) => {
        try {
            const response = await fetch(`http://${getIpAddress()}:3001/Auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                if (response.status === 404) { 
                    Alert.alert('Email não encontrado na base de dados')
                } else {
                    throw new Error('Erro ao enviar código');
                }
            } else {
                await AsyncStorage.setItem('email', data.email);
                navigation.navigate('Token');
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Recuperar Conta</Text>

            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Insira um e-mail para recuperação"
                    />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <Pressable style={styles.button} onPress={handleSubmit(handleEnviarCodigo)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Enviar código</Text>
            </Pressable>

            <Pressable style={styles.backToLogin} onPress={handleLogin}>
                <Text style={{ color: "white" }}>Voltar para a página de </Text>
                <Text style={styles.TxtBackLogin}>Login</Text>
            </Pressable>
        </ScrollView>
    )
}