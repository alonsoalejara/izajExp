import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AddStyles';

const AddCollabName = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleNext = () => {
        navigation.navigate('AddCollabData', { nombre, apellido });
    };

    return (
        <View style={styles.container}>
            {/* Icono de flecha hacia atrás */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Icon name="keyboard-arrow-left" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¿Cómo se llama el colaborador?</Text>
            <Text style={styles.subtitle}>Ingrese nombre(s) y apellido(s).</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#888"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    placeholderTextColor="#888"
                    value={apellido}
                    onChangeText={setApellido}
                />
            </View>

            {/* Botón Siguiente */}
            <TouchableOpacity 
                style={styles.button}
                onPress={handleNext}
            >
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Cancelar inscripción</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCollabName;
