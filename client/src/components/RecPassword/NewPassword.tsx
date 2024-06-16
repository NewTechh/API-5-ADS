import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './styles'
import getIpAddress from "../../../services/IPAddress";

type FormDataProps = {
    senha: string;
    senhaRep: string;
}

type RootStackParamList = {
    Login: undefined
};

type CursosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Schema = yup.object().shape({
    senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    senhaRep: yup.string()
        .required("Informe a Senha")
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .oneOf([yup.ref('senha')], 'As senhas devem ser iguais'),
});

export function NewPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRep, setShowPasswordRep] = useState(false);
    const navigation = useNavigation<CursosScreenNavigationProp>();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(Schema)
    });

    const [errorMessage, setErrorMessage] = useState('');

    async function handleNewPassword(data: FormDataProps) {
        try {
            await Schema.validate(data);
            setErrorMessage('');

            const userId = await AsyncStorage.getItem('userId');
            const userType = await AsyncStorage.getItem('userType');

            const requestData = {
                userId: userId,
                userType: userType,
                user_senha: data.senha
            };

            const response = await fetch(`http://${getIpAddress()}:3001/Auth/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar senha');
            } else {
                const registroLogAcao = `Recuperação de senha`;
                const registroLogAlteracao = `Realizado a recuperação da senha do usuário por meio de token`;

                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/SignUpLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Recuperação",
                    })
                });

                const responseData = await response.json();
                Alert.alert('Senha alterada com sucesso')
                navigation.navigate('Login');
            }
            reset();
            setErrorMessage('');
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            setErrorMessage('Erro ao atualizar senha');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Nova Senha</Text>

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senha'
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                style={styles.inputPass}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Senha"
                                secureTextEntry={!showPassword}
                            />
                            {value !== '' && value !== undefined && (
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color='#000000'
                                    style={styles.iconEye}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            )}
                        </>
                    )}
                />
            </View>

            {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senhaRep'
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                style={styles.inputPass}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Repita a senha"
                                secureTextEntry={!showPasswordRep}
                            />
                            {value !== '' && value !== undefined && (
                                <MaterialCommunityIcons
                                    name={showPasswordRep ? 'eye-off' : 'eye'}
                                    size={24}
                                    color='#000000'
                                    style={styles.iconEye}
                                    onPress={() => setShowPasswordRep(!showPasswordRep)}
                                />
                            )}
                        </>
                    )}
                />
            </View>

            {errors.senhaRep && <Text style={styles.labelError}>{errors.senhaRep?.message}</Text>}
            <Text style={styles.labelError}>{errorMessage}</Text>

            <Pressable style={styles.button} onPress={handleSubmit(handleNewPassword)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Atualizar</Text>
            </Pressable>
        </ScrollView>
    )
}
