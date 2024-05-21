import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

type RootStackParamList = {
    SignUpAdm: undefined;
    NewPassSelf: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

const NotificationScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.whiteSquare}>
                    <Text style={styles.noNotificationsText}>Nenhuma notificação</Text>
                    <View style={styles.line}></View>
                </View>
            </ScrollView>
            <FooterConsultor onPressMenu={toggleSideMenu} navigation={navigation} />
            {isSideMenuVisible && <SideMenuConsultor onClose={toggleSideMenu} navigation={navigation} />}
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
    },
    whiteSquare: {
        width: '90%',
        height: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    noNotificationsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    line: {
        width: '80%',
        height: 2,
        backgroundColor: '#000000',
        marginTop: 10,
    },
});

export default NotificationScreen;
