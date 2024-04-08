import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import React, { useState } from "react";
import { styles } from './styles'


type FormDataProps = {
    senha: string;
    senhaRep: string;
}

const newPasswordSchema = yup.object().shape({
    senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    senhaRep: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
});


export function NewPassword() {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(newPasswordSchema)
    });

    const [senha, setSenha] = useState('');
    const [senhaRep, setSenhaRep] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleNewPassword(data: FormDataProps) {

        reset();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Senha</Text>

            <Controller
                control={control}
                name='senha'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setSenha(text);
                            onChange(text)
                        }}

                        value={senha}
                        placeholder="Senha"

                    />
                )}
            />
            {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

            <Controller
                control={control}
                name='senhaRep'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setSenhaRep(text);
                            onChange(text)
                        }}

                        value={senhaRep}
                        placeholder="Repita a senha"

                    />
                )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleNewPassword)}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    )
}