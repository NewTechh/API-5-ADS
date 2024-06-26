import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/components/LoginScreen';
import DashboardPartner from '../src/components/DashboardPartner';
import { SignUp } from '../src/components/Consultor/SignUp';
import { SignUpConsultor } from '../src/components/Admin/SignUpConsultor';
import { RecPassword } from '../src/components/RecPassword/RecPassword';
import { NewPassword } from '../src/components/RecPassword/NewPassword';
import { Cursos } from '../src/components/Cursos';
import { DetailsCurse } from '../src/components/DetailsCurse';
import { SignUpAdm } from '../src/components/SignUpAdm/SignUpAdm';
import Token from '../src/components/RecPassword/Token'
import UserScreen from '../src/components/Parceiros/UserScreen';
import UserScreenConsultor from '../src/components/Consultor/UserScreenConsultor';
import UserScreenAdmin from '../src/components/Admin/UserScreenAdmin';
import EditarParceiro from '../src/components/EditarParceiro';
import ListPartner from '../src/components/Consultor/ListPartner';
import ListConsultores from '../src/components/Admin/ListConsultores';
import ListAdministrador from '../src/components/Admin/ListAdministrador';
import EditarConsultor from '../src/components/EditarConsultor';
import EditarAdminSelf from '../src/components/Admin/EdicaoAdminSelf';
import { NewPassSelf } from '../src/components/NewPassSelf';
import EdicaoConsulSelf from '../src/components/Consultor/EdicaoConsulSelf';
import EdicaoInfoPartner from '../src/components/Parceiros/EdicaoInfoPartner';
import EdicaoEnderecoPartner from '../src/components/Parceiros/EdicaoEnderecoPartner';
import TableLog from '../src/components/TableLog/TableLog';
import ManageTracks  from '../src/components/Consultor/ManageTracks';
import AddCurse from '../src/components/Consultor/AddCurse';
import Trilhas from '../src/components/Consultor/Trilhas';
import DetalhesEspecializacao from '../src/components/Consultor/ExpertiseList';
import EspecializacoesTrilha from '../src/components/Consultor/EspecializacoesTrilha';
import AdminHome from '../src/components/Admin/AdminHome';
import ParceiroHome from '../src/components/Parceiros/ParceiroHome';
import ConsultorHome from '../src/components/Consultor/ConsultorHome';
import EditarAdministrador from '../src/components/EditarAdministrador';
import NotificationScreen from '../src/components/Consultor/NotificationScreen';
import DetalhesParceiros from '../src/components/Consultor/DetalhesParceiros';

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserScreenConsultor" component={UserScreenConsultor} options={{ headerShown: false }} />
        <Stack.Screen name="UserScreenAdmin" component={UserScreenAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroConsultor" component={SignUpConsultor} options={{ headerShown: false }} />
        <Stack.Screen name="RecSenha" component={RecPassword} options={{ headerShown: false }} />
        <Stack.Screen name="NovaSenha" component={NewPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardPartner} options={{ headerShown: false }} />
        <Stack.Screen name="Cursos" component={Cursos} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsCurse" component={DetailsCurse} options={{ headerShown: false }} />
        <Stack.Screen name="ListAdministrador" component={ListAdministrador} options={{ headerShown: false }} />
        <Stack.Screen name="ListPartner" component={ListPartner} options={{ headerShown: false }} />
        <Stack.Screen name="ListConsultores" component={ListConsultores} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpAdm" component={SignUpAdm} options={{ headerShown: false }} />
        <Stack.Screen name="Token" component={Token} options={{ headerShown: false }} />
        <Stack.Screen name="EditarParceiro" component={EditarParceiro} options={{ headerShown: false }} />
        <Stack.Screen name="EditarConsultor" component={EditarConsultor} options={{ headerShown: false }} />
        <Stack.Screen name="EditarAdministrador" component={EditarAdministrador} options={{ headerShown: false }} />
        <Stack.Screen name="EditarAdminSelf" component={EditarAdminSelf} options={{ headerShown: false }} />
        <Stack.Screen name="EditarConsulSelf" component={EdicaoConsulSelf} options={{ headerShown: false }} />
        <Stack.Screen name="EditarInfoPartner" component={EdicaoInfoPartner} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassSelf" component={NewPassSelf} options={{ headerShown: false }} />
        <Stack.Screen name="EditarEnderecoPartner" component={EdicaoEnderecoPartner} options={{ headerShown: false }} />
        <Stack.Screen name="TableLog" component={TableLog} options={{ headerShown: false }} />
        <Stack.Screen name="ManageTracks" component={ManageTracks} options={{ headerShown: false }} />
        <Stack.Screen name="AddCurse" component={AddCurse} options={{ headerShown: false }} />
        <Stack.Screen name="Trilhas" component={Trilhas} options={{ headerShown: false }} />
        <Stack.Screen name="EspecializacoesTrilha" component={EspecializacoesTrilha} options={{ headerShown: false }} />
        <Stack.Screen name="DetalhesEspecializacao" component={DetalhesEspecializacao} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }} />
        <Stack.Screen name="ParceiroHome" component={ParceiroHome} options={{ headerShown: false }} />
        <Stack.Screen name="ConsultorHome" component={ConsultorHome} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetalhesParceiros" component={DetalhesParceiros} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
