import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#272424',
        paddingHorizontal: 16,
      },
    title: {
        fontSize: 34,
        marginBottom: 80,
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
    passwordInputContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
    },
    inputPass: {
        flex: 1,
        fontWeight: 'bold',
    },
    iconEye: {
        marginLeft: 10, 
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
    backToLogin: {
        flexDirection: "row",
        padding: 10,
        alignItems: 'center',
    },
    TxtBackLogin: {
        fontSize: 15,
        color: "white",
        textDecorationLine: 'underline',
    }
})

export { styles }