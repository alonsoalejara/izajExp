import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        left: 70,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    labelAdjusted: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    normalFontWeight: {
        fontWeight: 'normal',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    readOnlyInput: {
        backgroundColor: '#e0e0e0',
        color: '#555',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color: '#ee0000',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    aparejoContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fefefe',
    },
    aparejoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    actionButtonsContainer: {
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
        width: '116%',
        left: -52,
    },
    actionButton: {
        marginBottom: 10,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ee0000',
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 0,
        paddingVertical: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomButton: {
        width: '48%',
    },
});

export default styles;