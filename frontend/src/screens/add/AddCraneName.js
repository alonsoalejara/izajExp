import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/AddStyles';
import Components from '../../components/Components.index';

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
            <Components.Button
                label="Siguiente"
                onPress={handleNext}
                style={{ width: '100%', marginTop: 5, right: 55 }}
            />

            {/* Botón Cancelar */}
            <Components.Button
                label="Cancelar inscripción"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={{ backgroundColor: 'transparent', marginTop: 388, left: -12 }}
            />
        </View>
    );
};

export default AddCraneName;
