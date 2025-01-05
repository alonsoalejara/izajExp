import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import FormularioDatosIzaje from '../components/forms/FormularioDatosIzaje';

const SetupRadio = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { grua, eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete } = route.params;

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  const handleNavigateToTablas = () => {
    if (!radioIzaje || !radioMontaje) {
      alert('Por favor, completa todos los campos de configuración: radio de izaje y montaje.');
      return;
    }

    navigation.navigate('Tablas', {
      grua: grua,
      eslingaOEstrobo: eslingaOEstrobo,
      cantidadManiobra: cantidadManiobra,
      tipoGrillete: tipoGrillete,
      cantidadGrilletes: cantidadGrilletes,
      radioIzaje: radioIzaje,
      radioMontaje: radioMontaje,
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONFIGURACIÓN DE RADIO</Text>
        </View>

        <FormularioDatosIzaje
          radioIzaje={radioIzaje}
          radioMontaje={radioMontaje}
          setRadioIzaje={setRadioIzaje}
          setRadioMontaje={setRadioMontaje}
        />

        {/* Contenedor para los botones */}
        <View style={[styles.buttonContainer, { marginTop: 275.4 }]}>
          {/* Botón "Volver" */}
          <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>

          {/* Botón "Siguiente" */}
          <TouchableOpacity style={styles.button} onPress={handleNavigateToTablas}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetupRadio;
