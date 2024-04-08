import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,

    },
    title: {
        fontSize: 34,
        marginBottom: 100,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    labelError: {
        alignSelf: "flex-start",
        color: "#ff375b",
        marginBottom: 8,
    },

    //select
    customSelect: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',

    },
    optionsContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
    },
    selectText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionText: {
        fontWeight: 'bold',
    }
})

export { styles }