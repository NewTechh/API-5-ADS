import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import React, { useState, useEffect } from "react";
import { styles } from '../../styles/estilos'
import { TextInputMask } from "react-native-masked-text";
import getIpAddress from '../../../services/IPAddress';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'rn-inkpad';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

interface FormDataProps {
    parceiro_nome: string;
    parceiro_email: string;
    parceiro_cnpj_cpf: string;
    parceiro_telefone: string;
    parceiro_logradouro: string;
    parceiro_logradouro_numero: string;
    parceiro_bairro: string;
    parceiro_cep: string;
    parceiro_cidade: string;
    parceiro_estado: string;
    parceiro_senha: string;
    trilha_id: string[];
}
interface Trilha {
    trilha_id: string;
    trilha_nome: string;
    selecionado: boolean;
}

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const telefoneRegex = /^\([1-9]{2}\) 9?[0-9]{4}-[0-9]{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;

const signUpSchema = yup.object().shape({
    parceiro_nome: yup.string().required("Informe o Nome"),
    parceiro_email: yup.string().required("Informe o E-mail").email("Informe um email válido"),
    parceiro_cnpj_cpf: yup.string().matches(cnpjRegex, "CNPJ inválido").required("Informe o CNPJ"),
    parceiro_telefone: yup.string().matches(telefoneRegex, "Telefone inválido").required("Informe o número de telefone"),
    parceiro_logradouro: yup.string().required("Informe o logradouro"),
    parceiro_logradouro_numero: yup.string().required("Informe o número do logradouro"),
    parceiro_bairro: yup.string().required("Informe o bairro"),
    parceiro_cep: yup.string().matches(cepRegex, "CEP inválido").required("Informe o CEP"),
    parceiro_cidade: yup.string().required("Informe a cidade"),
    parceiro_estado: yup.string().required("Informe o estado"),
    parceiro_senha: yup.string().required("Informe a Senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
    trilha_id: yup.array().of(yup.string().required()).min(1, "Informe ao menos uma trilha").default([]),
});

type RootStackParamList = {
    ListPartner: undefined
};

type ListPartnerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListPartner'>;


export function SignUp() {

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const [usernameValue, setUsernameValue] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [logradouro_numero, setLogradouro_numero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [trilhas, setTrilhas] = useState<Trilha[]>([]);
    const [selectedTrilhaId, setSelectedTrilhaId] = useState<string[]>([]);
    const navigation = useNavigation<ListPartnerScreenNavigationProp>();
    const [checked, setIsChecked] = useState(false);
    const [showTrilhas, setShowTrilhas] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSignDados(data: FormDataProps) {
        console.log('Dados do formulário:', data);
        function resetFields() {
            setUsernameValue('');
            setEmail('');
            setCnpj('');
            setTelefone('');
            setLogradouro('');
            setLogradouro_numero('');
            setBairro('');
            setCep('');
            setCidade('');
            setEstado('');
            setSenha('');
            setSelectedTrilhaId(['']);
            reset();
        }

        try {
            const response = await fetch(`http://${getIpAddress()}:3001/PostParceiro/CadastroParceirosTrilha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('Cadastro realizado com sucesso!');
            if (response.ok) {

                const registroLogAcao = `Novo parceiro Cadastrado`;
                const registroLogAlteracao = `Cadastro realizado de um novo parceiro`;

                // Enviar o registro de log para o backend
                await fetch(`http://${getIpAddress()}:3001/Log/SignUpLog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        registro_log_acao: registroLogAcao,
                        registro_log_alteracao: registroLogAlteracao,
                        registro_log_fluxo: "Consultor de Alianças --> Parceiro",
                    })
                });

                alert('Cadastro realizado!')
                setErrorMessage('');
                resetFields()
                navigation.navigate('ListPartner')
            } else {
                const errorMessage = await response.text();
                console.error('Erro ao cadastrar parceiro:', errorMessage);
                setErrorMessage(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao cadastrar parceiro:', error.message);
            setErrorMessage('Erro ao cadastrar parceiro. Por favor, tente novamente.');
        }

        reset();
    }

    async function searchCEP(cep: string) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (response.ok) {
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setEstado(data.uf);

                setValue('parceiro_logradouro', data.logradouro);
                setValue('parceiro_bairro', data.bairro);
                setValue('parceiro_cidade', data.localidade);
                setValue('parceiro_estado', data.uf);

            } else {
                setErrorMessage('CEP não encontrado. Por favor, verifique o CEP digitado.');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            setErrorMessage('Erro ao buscar CEP. Por favor, tente novamente.');
        }
    }

    const fetchTrilhas = () => {
        fetch(`http://${getIpAddress()}:3001/Tracks/listar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTrilhas(data)
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        fetchTrilhas();
    }, []);

    return (


        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Cadastro de Parceiros</Text>

            <Controller
                control={control}
                name='parceiro_nome'
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
            {errors.parceiro_nome && <Text style={styles.labelError}>{errors.parceiro_nome?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_email'
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
            {errors.parceiro_email && <Text style={styles.labelError}>{errors.parceiro_email?.message}</Text>}

            <Controller
                control={control}
                name="parceiro_cnpj_cpf"
                render={({ field: { onChange, value } }) => (
                    <TextInputMask
                        style={styles.input}
                        onChangeText={(text) => {
                            setCnpj(text)
                            onChange(text)
                        }}
                        value={cnpj}
                        placeholder="CNPJ"
                        type={"cnpj"}
                    />
                )}
            />
            {errors.parceiro_cnpj_cpf && <Text style={styles.labelError}>{errors.parceiro_cnpj_cpf?.message}</Text>}

            <Controller
                control={control}
                name="parceiro_cep"
                render={({ field: { onChange, value } }) => (
                    <TextInputMask
                        style={styles.input}

                        onChangeText={onChange}
                        onBlur={async () => {
                            if (value.length === 9) {
                                await searchCEP(value);
                            }
                        }}
                        value={cep}
                        placeholder="CEP"
                        type={"zip-code"}
                    />
                )}
            />
            {errors.parceiro_cep && <Text style={styles.labelError}>{errors.parceiro_cep?.message}</Text>}

            <Controller
                control={control}
                name="parceiro_telefone"
                render={({ field: { onChange, value } }) => (
                    <TextInputMask
                        style={styles.input}
                        onChangeText={(text) => {
                            setTelefone(text);
                            onChange(text)
                        }}
                        value={telefone}
                        placeholder="Telefone"
                        type={"cel-phone"}
                        options={{
                            maskType: "BRL",
                            withDDD: true,
                            dddMask: "(99) ",
                        }}
                    />
                )}
            />
            {errors.parceiro_telefone && <Text style={styles.labelError}>{errors.parceiro_telefone?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_logradouro'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setLogradouro(text);
                            onChange(text)
                        }}

                        value={logradouro}
                        placeholder="Logradouro"

                    />
                )}
            />
            {errors.parceiro_logradouro && <Text style={styles.labelError}>{errors.parceiro_logradouro?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_logradouro_numero'
                render={({ field: { onChange } }) => (
                    <TextInputMask
                        style={styles.input}
                        onChangeText={(text) => {
                            setLogradouro_numero(text);
                            onChange(text)
                        }}
                        value={logradouro_numero}
                        placeholder="Número do Logradouro"
                        type={"only-numbers"}
                    />
                )}
            />
            {errors.parceiro_logradouro_numero && <Text style={styles.labelError}>{errors.parceiro_logradouro_numero?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_bairro'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setBairro(text);
                            onChange(text)
                        }}

                        value={bairro}
                        placeholder="Bairro"

                    />
                )}
            />
            {errors.parceiro_bairro && <Text style={styles.labelError}>{errors.parceiro_bairro?.message}</Text>}



            <Controller
                control={control}
                name='parceiro_cidade'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setCidade(text);
                            onChange(text)
                        }}

                        value={cidade}
                        placeholder="Cidade"

                    />
                )}
            />
            {errors.parceiro_cidade && <Text style={styles.labelError}>{errors.parceiro_cidade?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_estado'
                render={({ field: { onChange } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setEstado(text);
                            onChange(text)
                        }}

                        value={estado}
                        placeholder="Estado"

                    />
                )}
            />

            {errors.parceiro_estado && <Text style={styles.labelError}>{errors.parceiro_estado?.message}</Text>}

            <Controller
                control={control}
                name='parceiro_senha'
                render={({ field: { onChange } }) => (
                    <View style={{width: '100%', height: 40, marginBottom: 8, flexDirection: 'row'}}>
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
                        {senha !== '' && senha !== undefined && (
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color='#000000'
                                style={styles.iconEye}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </View>
                )}
            />
            {errors.parceiro_senha && <Text style={styles.labelError}>{errors.parceiro_senha?.message}</Text>}

            <Controller
                control={control}
                name="trilha_id"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                    value = value || [];
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowTrilhas(!showTrilhas)}
                                style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}
                            >
                                <AntDesign
                                    name={showTrilhas ? "upcircleo" : "downcircleo"}
                                    size={24}
                                    color="black"
                                />
                                <Text
                                    style={{ flex: 1, textAlignVertical: 'center', fontWeight: 'bold', paddingLeft: 10 }}
                                >
                                    {showTrilhas ? 'Esconder Trilhas' : 'Escolha a trilha adquirida pelo parceiro'}
                                </Text>
                            </TouchableOpacity>

                            {showTrilhas && trilhas.map((trilha) => (
                                <CheckBox
                                    key={trilha.trilha_id}
                                    checked={value.includes(trilha.trilha_id)}
                                    iconColor={'#C74634'}
                                    style={styles.input}
                                    title={trilha.trilha_nome}
                                    onChange={() => {
                                        if (value.includes(trilha.trilha_id)) {
                                            onChange(value.filter((id: string) => id !== trilha.trilha_id));
                                        } else {
                                            onChange([...value, trilha.trilha_id]);
                                        }
                                    }}
                                />
                            ))}
                        </>
                    )
                }}
            />
            {errors.trilha_id && <Text style={styles.labelError}>{errors.trilha_id?.message}</Text>}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('ListPartner')}>
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

