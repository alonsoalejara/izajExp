import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/AddStyles';

const AddCraneWeight = ({ navigation, route }) => {
    const { nombre } = route.params;
    const [pesoEquipo, setPesoEquipo] = useState('');
    const [pesoGancho, setPesoGancho] = useState('');
    const [capacidadLevante, setCapacidadLevante] = useState('');

    const handleNext = () => {
        const craneData = {
            nombre,
            pesoEquipo,
            pesoGancho,
            capacidadLevante,
        };

        navigation.navigate('AddCraneData', craneData);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¿Qué pesos tiene esta grúa?</Text>
            <Text style={styles.subtitle}>
                Ingrese "Peso del equipo" y "Peso del gancho", en kilogramos (kg).
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Peso del equipo (kg)"
                    keyboardType="numeric"
                    value={pesoEquipo}
                    onChangeText={setPesoEquipo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Peso del gancho (kg)"
                    keyboardType="numeric"
                    value={pesoGancho}
                    onChangeText={setPesoGancho}
                />
            </View>

            <Text style={styles.subtitle}>Ingrese la capacidad de levante de la grúa, en kilogramos (kg).</Text>
            <TextInput
                style={styles.longInput}
                placeholder="Capacidad de Levante (kg)"
                keyboardType="numeric"
                value={capacidadLevante}
                onChangeText={setCapacidadLevante}
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

export default AddCraneWeight;
