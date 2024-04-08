import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import React, { useState } from "react";
import { styles } from './styles'


type FormDataProps = {
    email: string;
}

const recPasswordSchema = yup.object().shape({
    email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
});


export function RecPassword() {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(recPasswordSchema)
    });

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Conta</Text>

            <Controller
                control={control}
                name='email'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setEmail(text);
                            onChange(text)
                        }}

                        value={email}
                        placeholder="Insira um e-mail para recuperação"

                    />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <TouchableOpacity style={styles.button}>
                {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin}>
                <Text style={{ color: "white" }}>Voltar para a página de </Text>
                <Text style={styles.TxtBackLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}