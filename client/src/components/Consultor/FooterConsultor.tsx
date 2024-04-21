import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

interface FooterProps {
    onPressMenu: () => void;
    navigation: StackNavigationProp<any, any>;
}

const FooterConsultor: React.FC<FooterProps> = ({ onPressMenu, navigation }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={onPressMenu}>
                <Ionicons name="menu" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ListPartner')}>
                <Ionicons name="home" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserScreenConsultor')}>
                <Ionicons name="person" size={32} color="black" />
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default FooterConsultor;
