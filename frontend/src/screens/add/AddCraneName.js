import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/AddStyles';

const AddCraneName = ({ navigation }) => {
    const [nombre, setNombre] = useState('');

    const handleNext = () => {
        navigation.navigate('AddCraneWeight', { nombre });
    };

    return (
        <View style={styles.container}>
            {/* Icono de flecha hacia atrás */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¿Cuál es el nombre de la grúa?</Text>
            <Text style={styles.subtitle}>Ingrese nombre.</Text>

            <TextInput
                style={styles.longInput}
                placeholder="Nombre de la grúa"
                placeholderTextColor="#888"
                value={nombre}
                onChangeText={setNombre}
            />

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

export default AddCraneName;
