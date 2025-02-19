import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AddStyles';
import Components from '../../components/Components.index';

const AddCollabData = ({ navigation, route }) => {
    const { nombre, apellido } = route.params;

    const [rut, setRut] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleNext = () => {
        const collabData = { nombre, apellido, rut, phone, email };
        navigation.navigate('AddCollabSpecial', collabData);
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

            <Text style={styles.title}>¿Cuáles son los datos del colaborador?</Text>
            <Text style={styles.subtitle}>Ingrese el RUT y teléfono de contacto.</Text>
            <View style={[styles.inputContainer, { marginTop: -10 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="RUT"
                    placeholderTextColor="#888"
                    value={rut}
                    onChangeText={setRut}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    placeholderTextColor="#888"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <Text style={styles.subtitle}>Ingrese el correo electrónico.</Text>
            <TextInput
                style={styles.longInput}
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
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
                onPress={() => {
                    navigation.pop(1);
                    navigation.goBack();
                }}
                isCancel={true}
                style={{ backgroundColor: 'transparent', marginTop: 300, left: -12 }}
            />
        </View>
    );
};

export default AddCollabData;
