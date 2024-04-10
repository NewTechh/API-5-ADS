import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from './styles'


type FormDataProps = {
    adm_nome: string;
    adm_email: string;
    adm_funcao: string;
    adm_setor: string;
    adm_matricula: string;
    adm_senha: string;
}

const Schema = yup.object().shape({
    adm_nome: yup.string().required("Informe o Nome"),
    adm_email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
    adm_funcao: yup.string().required("Informe a Função"),
    adm_setor: yup.string().required("Informe o Setor"),
    adm_matricula: yup.string().required("Informe a Matricula"),

    adm_senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),

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
                name='adm_nome'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="Nome"

                    />
                )}
            />
            {errors.adm_email && <Text style={styles.labelError}>{errors.adm_email?.message}</Text>}

            <Controller
                control={control}
                name='adm_email'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="E-mail"

                    />
                )}
            />
            {errors.adm_email && <Text style={styles.labelError}>{errors.adm_email?.message}</Text>}

            <Controller
                control={control}
                name='adm_funcao'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="Função"

                    />
                )}
            />
            {errors.adm_funcao && <Text style={styles.labelError}>{errors.adm_funcao?.message}</Text>}

            <Controller
                control={control}
                name='adm_setor'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="Setor"

                    />
                )}
            />
            {errors.adm_setor && <Text style={styles.labelError}>{errors.adm_setor?.message}</Text>}

            <Controller
                control={control}
                name='adm_matricula'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}

                        value={value}
                        placeholder="Matrícula"

                    />
                )}
            />
            {errors.adm_matricula && <Text style={styles.labelError}>{errors.adm_matricula?.message}</Text>}

            

            <View style={styles.passwordInputContainer}>
                <Controller
                    control={control}
                    name='adm_senha' //Aqui já cria a variável, caso queira é só trocar
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

            {errors.adm_senha && <Text style={styles.labelError}>{errors.adm_senha?.message}</Text>}


            <Pressable style={styles.button} onPress={handleSubmit(handleNewPassword)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
        </View>
    )
}