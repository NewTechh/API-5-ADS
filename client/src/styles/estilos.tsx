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
        marginBottom: 50,
        textAlign: 'center',
        marginTop: 50,
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
    select: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        paddingLeft: 0,
        borderRadius: 8,
        fontWeight: 'bold',
        justifyContent: 'center',
        paddingVertical: 10,
      
       
    },

    button1: {
        width: '40%',
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        marginRight: 25,
    },
    button2: {
        width: '40%',
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
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
    text:{
        color: '#696969',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
})

export { styles }