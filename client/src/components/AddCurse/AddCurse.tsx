import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from './styles';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

export function AddCurse() {

    const handlePress = () => {
        console.log("Botão pressionado!");
    };

    return (
        <ScrollView style={styles.container}>
            <Ionicons name="arrow-back" size={24} color="white" style={{ position: 'absolute', left: 10, top: 10 }} />

            <View style={styles.joinFields}>
                <Text style={styles.title}>IaaS & PaaS</Text>

                <Pressable style={{paddingLeft: 20}}>
                    <AntDesign
                        name={'pluscircleo'}
                        size={35}
                        color='white'

                    // onPress={}
                    />
                </Pressable>
            </View>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Oracle Cloud</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Business Analytics</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Oracle Database</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <View style={styles.joinFields}>
                <Text style={styles.title}>Atividades</Text>

                <Pressable style={{paddingLeft: 20}}>
                    <AntDesign
                        name={'pluscircleo'}
                        size={35}
                        color='white'

                    // onPress={}
                    />
                </Pressable>
            </View>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Questão 01</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Questão 02</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <View style={styles.joinFields}>
                <Text style={styles.title}>Provas</Text>

                <Pressable style={{paddingLeft: 20}}>
                    <AntDesign
                        name={'pluscircleo'}
                        size={35}
                        color='white'

                    // onPress={}
                    />
                </Pressable>
            </View>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Prova 01</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>

            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Prova 02</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.buttonOption}>
                        <Entypo name="edit" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="trash" size={30} />
                    </Pressable>

                    <Pressable style={styles.buttonOption}>
                        <Entypo name="lock" size={30} />
                    </Pressable>
                </View>
            </Pressable>
        </ScrollView>
    )
}
