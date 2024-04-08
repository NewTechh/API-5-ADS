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
import ListPartner from '../src/components/ListPartner';

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={SignUp} />
        <Stack.Screen name="RecSenha" component={RecPassword} />
        <Stack.Screen name="NovaSenha" component={NewPassword} />
        <Stack.Screen name="Dashboard" component={DashboardPartner} />
        <Stack.Screen name="Cursos" component={Cursos} />
        <Stack.Screen name="DetailsCurse" component={DetailsCurse} />
        <Stack.Screen name="ListPartner" component={ListPartner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
