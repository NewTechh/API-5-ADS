import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/components/LoginScreen';
import DashboardPartner from '../src/components/DashboardPartner';
import { SignUp } from '../src/components/SignUp';
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
import ListPartner from '../src/components/ListPartner';
import ListConsultores from '../src/components/ListConsultores';
import ListAdministrador from '../src/components/ListAdministrador';


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
