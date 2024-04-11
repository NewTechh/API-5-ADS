import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 33,
        marginBottom: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        borderRadius: 6,
        marginBottom: 20, 
    },

    buttonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
        marginTop: 10,
    },

    iconPlus: {
        marginLeft: 330,
        marginBottom: 7,
    }
});

export { styles };