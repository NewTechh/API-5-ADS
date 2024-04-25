import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import React, { useState } from "react";
import { styles } from '../../styles/estilos'
import { TextInputMask } from "react-native-masked-text";
import getIpAddress from '../../../services/IPAddress';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';



type FormDataProps = {
    consultor_alianca_nome: string;
    consultor_alianca_cpf: string;
    consultor_alianca_email: string;
    consultor_alianca_senha: string;
}

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const signUpSchema = yup.object().shape({
    consultor_alianca_nome: yup.string().required("Informe o Nome"),
    consultor_alianca_email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
    consultor_alianca_cpf: yup.string().matches(cpfRegex, "CPF inválido").required("Informe o CPF/CNPJ"),
    consultor_alianca_senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type RootStackParamList = {
    ListConsultores: undefined
};

type ListPartnerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListConsultores'>;


export function SignUpConsultor() {

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const [usernameValue, setUsernameValue] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<ListPartnerScreenNavigationProp>();

    async function handleSignDados(data: FormDataProps) {

        function resetFields() {
            setUsernameValue('');
            setEmail('');
            setCpf('');
            setSenha('');
            reset();
        }

        try {
            const response = await fetch(`http://${getIpAddress()}:3001/PostConsultor/CadastroConsultor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {

                const registroLogAcao = `Novo Consultor de Aliança Cadastrado`;
                const registroLogAlteracao = `Cadastro realizado de um novo Consultor de Alianças`;
                
                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/SignUpLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Administrador --> Consultor de Aliança",
                    })
                });

                alert('Cadastro realizado!')
                setErrorMessage('');
                resetFields()
                navigation.navigate('ListConsultores')
            } else {
                const errorMessage = await response.text();
                console.error('Erro ao cadastrar consultor:', errorMessage);
                setErrorMessage(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao cadastrar consultor:', error.message);
            setErrorMessage('Erro ao cadastrar consultor. Por favor, tente novamente.');
        }

        reset();
    }

    return (


        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Cadastro de Consultores</Text>

            <Controller
                control={control}
                name='consultor_alianca_nome'
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
            {errors.consultor_alianca_nome && <Text style={styles.labelError}>{errors.consultor_alianca_nome?.message}</Text>}

            <Controller
                control={control}
                name='consultor_alianca_email'
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
            {errors.consultor_alianca_email && <Text style={styles.labelError}>{errors.consultor_alianca_email?.message}</Text>}

            <Controller
                control={control}
                name="consultor_alianca_cpf"
                render={({ field: { onChange, value } }) => (
                    <TextInputMask
                        style={styles.input}
                        onChangeText={(text) => {
                            setCpf(text)
                            onChange(text)
                        }}
                        value={cpf}
                        placeholder="CPF/CNPJ"
                        type={"cpf"}
                    />
                )}
            />
            {errors.consultor_alianca_cpf && <Text style={styles.labelError}>{errors.consultor_alianca_cpf?.message}</Text>}

            <Controller
                control={control}
                name='consultor_alianca_senha'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setSenha(text);
                            onChange(text)
                        }}
                        secureTextEntry
                        value={senha}
                        placeholder="Senha"

                    />
                )}
            />
            {errors.consultor_alianca_senha && <Text style={styles.labelError}>{errors.consultor_alianca_senha?.message}</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('ListConsultores')}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={handleSubmit(handleSignDados)}>
                    {errorMessage ? <Text style={styles.labelError}>{errorMessage}</Text> : null}
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

