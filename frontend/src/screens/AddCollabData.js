import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/AddStyles';

const AddCollabData = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Icono de flecha hacia atrás */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¿Cuáles son los datos del colaborador?</Text>
            <Text style={styles.subtitle}>Ingrese el RUT y teléfono de contacto.</Text>
            <View style={[styles.inputContainer, { marginTop: -10 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="RUT"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    placeholderTextColor="#888"
                />
            </View>

            <Text style={styles.subtitle}>Ingrese el correo electrónico.</Text>
            <TextInput
                style={styles.longInput}
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
            />

            {/* Botón Siguiente */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('AddCollabSpecial')}
            >
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                    navigation.pop(1);
                    navigation.goBack();
                }}
            >
                <Text style={styles.cancelButtonText}>Cancelar inscripción</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCollabData;
