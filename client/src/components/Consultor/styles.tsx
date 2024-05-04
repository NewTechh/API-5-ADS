import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#272424',
        paddingHorizontal: 16,
    },
    title: {
        flex: 1,
        fontSize: 33,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
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

    buttonOption: {
        paddingLeft: 5,
    },

    joinFields: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#312D2A',
    },
    tableContainer: {
        backgroundColor: '#f0f0f0',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    header: {
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    data: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
    },
    actionButtons: {

        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    iconPlus: {
        right: 5,
        position: 'absolute',
    },
    buttonBars: {
        flex: 1,
        alignItems: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 20,
    },
    modalButtonOptions: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    input: {
        height: 40,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
        fontSize: 17,
        borderWidth: 1,
        borderColor: 'black',
    },
    labelError: {
        alignSelf: "flex-start",
        color: "#ff375b",
        marginBottom: 8,
    },
    confirmButton: {
        height: 40,
        backgroundColor: '#C74634',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;
