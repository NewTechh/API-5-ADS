import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Rotas from './routes/Rotas';

const App = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Rotas />
        </SafeAreaView>
    );
};

export default App;