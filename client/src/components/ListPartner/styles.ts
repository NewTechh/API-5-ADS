import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#312D2A',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
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
        marginLeft: 300, // Ajuste a margem esquerda conforme necessário
        marginBottom: 10,
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
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonOptions: {
        flexDirection: 'row',
        marginVertical: 8,
    },
});

export default styles;