import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { styles } from './styles'


type FormDataProps = {
    email: string;
}

type RootStackParamList = {
    RecPassword: undefined;
    Login: undefined;
    NovaSenha: undefined;
}

type RecPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecPassword'>;

const Schema = yup.object().shape({
    email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
});


export function RecPassword() {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(Schema)
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<RecPasswordScreenNavigationProp>();

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleEnviarCodigo = (data: FormDataProps) => {
        console.log(data)
        navigation.navigate('NovaSenha');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Conta</Text>

            <Controller
                control={control}
                name='email' //Aqui já cria a variável, caso queira é só trocar
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleEnviarCodigo)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin} onPress={handleLogin}>
                <Text style={{ color: "white" }}>Voltar para a página de </Text>
                <Text style={styles.TxtBackLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}