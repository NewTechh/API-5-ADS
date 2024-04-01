import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import React, { useState } from "react";
import { styles } from './estilos'


type FormDataProps = {
    nome: string;
    endereco: string;
    selectedOption: string;
    cnpj: string;
    email: string;
    senha: string;
}

const signUpSchema = yup.object().shape({
    nome: yup.string().required('Informe o Nome'),
    endereco: yup.string().required('Informe o Endereço'),
    selectedOption: yup.string().required('Selecione uma expertise'),
    cnpj: yup.string().required('Informe o CNPJ'),
    email: yup.string().required('Informe o E-mail').email('Informe um email válido'),
    senha: yup.string().required('Informe a Senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export function SignUp() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const [usernameValue, setUsernameValue] = useState('');
    const [endereco, setEndereco] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');



    function handleSignIn(data: FormDataProps) {
        console.log(data);
        setUsernameValue('');
        setEndereco('');
        setCnpj('');
        setEmail('');
        setSenha('');
        reset();
    }


    const options = ['IaaS & PaaS', 'CX', 'Industries', 'License & Hardware'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up partners</Text>

            <Controller
                control={control}
                name='nome'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setUsernameValue(text);
                            onChange(text)
                        }}

                        value={usernameValue}
                        placeholder="Nome"

                    />
                )}
            />
            {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>}

            <Controller
                control={control}
                name='endereco'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setEndereco(text);
                            onChange(text)
                        }}

                        value={endereco}
                        placeholder="Endereço"

                    />
                )}
            />
            {errors.endereco && <Text style={styles.labelError}>{errors.endereco?.message}</Text>}

            <Controller
                control={control}
                name='selectedOption'
                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity
                            style={styles.customSelect}
                            onPress={() => setShowOptions(!showOptions)}
                        >
                            <Text style={styles.selectText}>{value || 'Clique e selecione uma expertise'}</Text>
                        </TouchableOpacity>
                        {showOptions && (
                            <View style={styles.optionsContainer}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() => {
                                            onChange(option);
                                            setShowOptions(false);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </>
                )}
            />
            {errors.selectedOption && <Text style={styles.labelError}>{errors.selectedOption?.message}</Text>}


            <Controller
                control={control}
                name='cnpj'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setCnpj(text);
                            onChange(text)
                        }}

                        value={cnpj}
                        placeholder="CNPJ"

                    />
                )}
            />
            {errors.cnpj && <Text style={styles.labelError}>{errors.cnpj?.message}</Text>}


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
                        placeholder="E-mail"

                    />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}


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


            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}
