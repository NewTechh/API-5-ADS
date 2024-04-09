import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './styles'


type FormDataProps = {
    email: string;
    senha: string;
}

const Schema = yup.object().shape({
    senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
});


export function SignUpAdm() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
            <Text style={styles.title}>Cadastro de{'\n'}Administrador</Text>

            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="E-mail"

                    />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

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


            <Pressable style={styles.button} onPress={handleSubmit(handleNewPassword)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
        </View>
    )
}