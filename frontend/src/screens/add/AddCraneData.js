import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/AddStyles';
import getApiUrl from '../../utils/apiUrl';

const AddCraneData = ({ route, navigation }) => {
    const { nombre, pesoEquipo, pesoGancho, capacidadLevante } = route.params;
    const [largoPluma, setLargoPluma] = useState('');
    const [contrapeso, setContrapeso] = useState('');

    const handleFinish = async () => {
        const craneFinalData = {
            nombre,
            pesoEquipo,
            pesoGancho,
            capacidadLevante,
            largoPluma,
            contrapeso,
        };

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
                return;
            }

            const response = await fetch(getApiUrl('grua/'), { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(craneFinalData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Colaborador creado exitosamente.');
                navigation.pop(3);
            } else {
                console.error('Error al guardar:', data);
                alert('Hubo un error al guardar los datos de la grúa.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al guardar la grúa.');
        }
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

            <Text style={styles.title}>Datos finales.</Text>
            <Text style={styles.subtitle}>Largo de pluma (en metros):</Text>

            <TextInput
                style={styles.longInput}
                placeholder="Largo de Pluma (mts.)"
                keyboardType="numeric"
                value={largoPluma}
                onChangeText={setLargoPluma}
            />

            <Text style={styles.subtitle}>Contrapeso de la grúa (en toneladas):</Text>

            <TextInput
                style={styles.longInput}
                placeholder="Contrapeso (ton.)"
                keyboardType="numeric"
                value={contrapeso}
                onChangeText={setContrapeso}
            />

            {/* Botón Finalizar */}
            <TouchableOpacity 
                style={styles.button}
                onPress={handleFinish}
            >
                <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => { navigation.pop(2); navigation.goBack(); }}>
                <Text style={styles.cancelButtonText}>Cancelar inscripción</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCraneData;
