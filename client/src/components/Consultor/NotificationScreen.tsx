import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideMenuConsultor from './SideMenuConsultor';
import FooterConsultor from './FooterConsultor';

type RootStackParamList = {
    SignUpAdm: undefined;
    NewPassSelf: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpAdm'>;

type Notification = {
    id: number;
    message: string;
    read: boolean;
};

const notificationsMock: Notification[] = [
    { id: 1, message: 'O parceiro1 atingiu 90% do progresso.', read: true },
    { id: 2, message: 'O parceiro2 atingiu 90% do progresso.', read: false },
    { id: 3, message: 'O parceiro3 atingiu 90% do progresso.', read: false },
];

const NotificationScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
    const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
    const [notifications, setNotifications] = useState(notificationsMock);

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'read') return notification.read;
        if (filter === 'unread') return !notification.read;
        return true;
    });

    const toggleReadStatus = (id: number) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, read: !notification.read } : notification
        ));
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.whiteSquare}>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity 
                            onPress={() => setFilter('all')} 
                            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}>
                            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>Todas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setFilter('read')} 
                            style={[styles.filterButton, filter === 'read' && styles.activeFilterButton]}>
                            <Text style={[styles.filterText, filter === 'read' && styles.activeFilterText]}>Lidas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setFilter('unread')} 
                            style={[styles.filterButton, filter === 'unread' && styles.activeFilterButton]}>
                            <Text style={[styles.filterText, filter === 'unread' && styles.activeFilterText]}>Não lidas</Text>
                        </TouchableOpacity>
                    </View>
                    {filteredNotifications.length === 0 ? (
                        <Text style={styles.noNotificationsText}>Nenhuma notificação</Text>
                    ) : (
                        filteredNotifications.map(notification => (
                            <View key={notification.id} style={styles.notificationContainer}>
                                <Text style={styles.notificationText}>{notification.message}</Text>
                                <TouchableOpacity onPress={() => toggleReadStatus(notification.id)}>
                                    <Icon
                                        name={notification.read ? 'email-open-outline' : 'email-outline'}
                                        size={24}
                                        color={notification.read ? 'gray' : 'black'}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
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
        height: 600,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    filterButton: {
        marginHorizontal: 10,
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
    },
    filterText: {
        fontSize: 16,
        color: '#000000',
    },
    activeFilterButton: {
        backgroundColor: '#000000',
    },
    activeFilterText: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    noNotificationsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 16,
        color: '#000000',
        flexShrink: 1,
    },
    line: {
        width: '80%',
        height: 2,
        backgroundColor: '#000000',
        marginTop: 10,
    },
});

export default NotificationScreen;
