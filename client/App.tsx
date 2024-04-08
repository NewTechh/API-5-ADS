import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Rotas from './routes/Rotas';

const App = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={'#272424'} barStyle={'light-content'}/>
            <Rotas />
        </SafeAreaView>
    );
};

export default App;