import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/AddStyles';

const AddCollabSpecial = ({ navigation }) => {
    const [specialty, setSpecialty] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handlePickerChange = (itemValue) => {
        setSpecialty(itemValue);
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

            <Text style={styles.title}>¿Cuál será su especialidad?</Text>

            <Text style={styles.subtitle}>
                Selecciona una especialidad. Estas son las especialidades que actualmente tenemos.
            </Text>

            {/* Botón para abrir el modal del Picker */}
            <TouchableOpacity 
                style={styles.specialityOutput} 
                onPress={() => setModalVisible(true)}
            >
                {/* Subtítulo dentro del mismo TouchableOpacity */}
                <Text style={styles.specialitySubtitle}>
                    Especialidad del colaborador:
                </Text>

                {/* Texto que muestra la especialidad seleccionada */}
                <Text style={styles.specialityText}>
                    {specialty ? specialty : "Seleccionar especialidad"}
                </Text>
            </TouchableOpacity>

            {/* Modal con el Picker */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Se puede cerrar con el botón de atrás
            >
                {/* Cerrar el modal solo cuando se toca fuera del Picker */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        {/* Evitar que el modal se cierre al tocar el Picker */}
                        <View style={styles.pickerBackground}>
                            <Picker
                                selectedValue={specialty}
                                onValueChange={(itemValue) => setSpecialty(itemValue)} // Solo actualiza la especialidad
                                style={styles.picker}
                                itemStyle={{ color: '#000', backgroundColor: '#ccc', fontSize: 18, fontWeight: '500' }}
                            >
                                <Picker.Item label="Estructura" value="Estructura" />
                                <Picker.Item label="Piping" value="Piping" />
                                <Picker.Item label="Obras Civiles" value="Obras Civiles" />
                                <Picker.Item label="Mecánica" value="Mecánica" />
                                <Picker.Item label="Eléctrica" value="Eléctrica" />
                            </Picker>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

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
                    navigation.pop(2);
                    navigation.goBack();
                }}
            >
                <Text style={styles.cancelButtonText}>Cancelar inscripción</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCollabSpecial;
