import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import styles from './styles';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

export default function Tracks() {

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.joinFields}>
                <Text style={styles.title}>Trilhas</Text>
                <Pressable style={styles.iconPlus}>
                    <AntDesign
                        name={'pluscircleo'}
                        size={35}
                        color='white'
                    />
                </Pressable>
            </View>
            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>IaaS & PaaS</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>CX</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>
                </View>
            </Pressable>

        </ScrollView>
    )
}
