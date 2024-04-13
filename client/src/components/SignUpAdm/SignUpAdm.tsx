import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './styles'
import getIpAddress from "../../../services/IPAddress";

type FormDataProps = {
    administrador_nome: string;
    administrador_email: string;
    administrador_funcao: string;
    administrador_setor: string;
    administrador_matricula: string;
    administrador_senha: string;
}

const Schema = yup.object().shape({
    administrador_nome: yup.string().required("Informe o Nome"),
    administrador_email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
    administrador_funcao: yup.string().required("Informe a Função"),
    administrador_setor: yup.string().required("Informe o Setor"),
    administrador_matricula: yup.string().required("Informe a Matricula"),
    administrador_senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
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
            
            const response = await fetch(`http://${getIpAddress()}:3001/PostAdmin/CadastroADMIN`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar administrador');
            }

            console.log('Administrador cadastrado com sucesso');
            alert('Administrador Cadastrado')
            reset();
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Erro ao cadastrar administrador');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Cadastro de{'\n'}Administrador</Text>

            <Controller
                control={control}
                name='administrador_nome'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Nome"
                    />
                )}
            />
            {errors.administrador_nome && <Text style={styles.labelError}>{errors.administrador_nome?.message}</Text>}

            <Controller
                control={control}
                name='administrador_email'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="E-mail"
                    />
                )}
            />
            {errors.administrador_email && <Text style={styles.labelError}>{errors.administrador_email?.message}</Text>}

            <Controller
                control={control}
                name='administrador_funcao'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Função"
                    />
                )}
            />
            {errors.administrador_funcao && <Text style={styles.labelError}>{errors.administrador_funcao?.message}</Text>}

            <Controller
                control={control}
                name='administrador_setor'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Setor"
                    />
                )}
            />
            {errors.administrador_setor && <Text style={styles.labelError}>{errors.administrador_setor?.message}</Text>}

            <Controller
                control={control}
                name='administrador_matricula'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Matrícula"
                    />
                )}
            />
            {errors.administrador_matricula && <Text style={styles.labelError}>{errors.administrador_matricula?.message}</Text>}

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='administrador_senha'
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

            {errors.administrador_senha && <Text style={styles.labelError}>{errors.administrador_senha?.message}</Text>}

            <Pressable style={styles.button} onPress={handleSubmit(handleNewPassword)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
        </ScrollView>
    )
}
