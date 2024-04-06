import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Footer from './src/components/Footer';
import SideMenu from './src/components/SideMenu';
import { SignUp } from './src/components/SignUp';
import DashboardPartner from './src/components/DashboardPartner';

const App = () => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <View style={styles.container}>
            {/* <SignUp /> */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <DashboardPartner />
            </ScrollView>
            <Footer onPressMenu={toggleSideMenu} />
            {isSideMenuVisible && <SideMenu onClose={toggleSideMenu} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 1,
    },
});

export default App;
