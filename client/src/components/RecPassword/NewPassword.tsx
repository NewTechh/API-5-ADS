import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './styles'


type FormDataProps = {
    senha: string;
    senhaRep: string;
}

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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordRep = () => {
        setShowPasswordRep(!showPasswordRep);
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(Schema)
    });

    const [errorMessage, setErrorMessage] = useState('');

    async function handleNewPassword(data: FormDataProps) {
        try {
            await Schema.validate(data);
            console.log('Formulário válido:', data);
            reset();
            setErrorMessage('');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errorMessage = error.errors[0];
                setErrorMessage(errorMessage);
            } else {
                console.error(error);
                setErrorMessage('Erro ao validar formulário');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Senha</Text>

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='senha' //Aqui já cria a variável, caso queira é só trocar
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
                    name='senhaRep' //Aqui já cria a variável, caso queira é só trocar
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
        </View>
    )
}