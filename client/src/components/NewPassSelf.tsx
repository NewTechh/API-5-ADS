import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './RecPassword/styles'
import getIpAddress from "../../services/IPAddress";

type FormDataProps = {
    senhaAtual: string;
    senha: string;
    senhaRep: string;
}

type RootStackParamList = {
    Login: undefined;
    UserScreenAdmin: undefined;
    UserScreenConsultor: undefined;
    UserScreen: undefined;
    previousScreen: undefined;
};

type CursosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Schema = yup.object().shape({
    senhaAtual: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    senhaRep: yup.string()
        .required("Informe a Senha")
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .oneOf([yup.ref('senha')], 'As senhas devem ser iguais'),
});

export function NewPassSelf() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRep, setShowPasswordRep] = useState(false);
    const navigation = useNavigation<CursosScreenNavigationProp>();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordRep = () => {
        setShowPasswordRep(!showPasswordRep);
    };

    const handleback = () => {
        return
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(Schema)
    });

    const [errorMessage, setErrorMessage] = useState('');

    async function handleNewPassword(data: FormDataProps) {
        try {
            await Schema.validate(data);
            setErrorMessage('');
    
            const userId = await AsyncStorage.getItem('usuario_id');
            const userType = await AsyncStorage.getItem('usuario_tipo');
    
            const requestData = {
                userId: userId,
                userType: userType,
                user_senha: data.senha,
                user_senha_atual: data.senhaAtual
            };
    
            const response = await fetch(`http://${getIpAddress()}:3001/Auth/updatePasswordSelf/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (response.ok) {
                Alert.alert('Senha alterada com sucesso');
                reset();
                setErrorMessage('');
                navigation.goBack();
            } else if (response.status === 406) {
                const responseData = await response.json();
                Alert.alert('Erro ao atualizar a senha', responseData.message);
            }

        } catch (error: any) {
            console.error('Erro ao atualizar senha:', error);
            setErrorMessage(error.message || 'Erro ao atualizar senha');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Alterar a senha</Text>

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senhaAtual'
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.inputPass}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Senha Atual"
                            secureTextEntry={!showPassword}
                        />
                    )}
                />
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color='#000000'
                    style={styles.iconEye}
                    onPress={toggleShowPassword}
                />
            </View>

            {errors.senhaAtual && <Text style={styles.labelError}>{errors.senhaAtual?.message}</Text>}

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senha'
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.inputPass}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Senha"
                            secureTextEntry={!showPassword}
                        />
                    )}
                />
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color='#000000'
                    style={styles.iconEye}
                    onPress={toggleShowPassword}
                />
            </View>

            {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senhaRep'
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.inputPass}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Repita a senha"
                            secureTextEntry={!showPasswordRep}
                        />
                    )}
                />
                <MaterialCommunityIcons
                    name={showPasswordRep ? 'eye-off' : 'eye'}
                    size={24}
                    color='#000000'
                    style={styles.iconEye}
                    onPress={toggleShowPasswordRep}
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
