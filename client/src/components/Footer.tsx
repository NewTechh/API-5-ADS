import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FooterProps {
    onPressMenu: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPressMenu }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={onPressMenu}>
                <Ionicons name="menu" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="home" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
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

export default Footer;
