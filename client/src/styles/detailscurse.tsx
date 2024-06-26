import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
      },

    title: {
        fontSize: 33,
        marginBottom: 20,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        borderRadius: 6,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15, // Adicionado para espaçamento entre texto e ícone
    },

    buttonText: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
    },

});

export { styles };
