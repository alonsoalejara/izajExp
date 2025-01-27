import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/AddStyles';
import getApiUrl from '../../utils/apiUrl';
import Button from '../../components/Button';

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
            <Button
                label="Finalizar"
                onPress={handleFinish}
                style={{ width: '100%', marginTop: 5, right: 55 }}
            />

            {/* Botón Cancelar */}
            <Button
                label="Cancelar inscripción"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={{ backgroundColor: 'transparent', marginTop: 320, left: -12 }}
            />
        </View>
    );
};

export default AddCraneData;
