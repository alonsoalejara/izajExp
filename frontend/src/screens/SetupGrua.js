import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupGrua = () => {
  const navigation = useNavigation();
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [grua, setGrua] = useState('');
  const [largoPluma, setLargoPluma] = useState('');
  const [anguloInclinacion, setAnguloInclinacion] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');
        if (storedUsuarioId) {
          setUsuarioId(storedUsuarioId);
        } else {
          console.warn("No se encontró el usuarioId en AsyncStorage");
        }
      } catch (error) {
        console.error("Error al obtener usuarioId:", error);
      }
    };
    fetchUserId();
  }, []);

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupAparejos = async () => {
    try {
      const data = {
        grua,
        largoPluma,
        anguloInclinacion,
        usuarioId,
      };
      await AsyncStorage.setItem('setupGruaData', JSON.stringify(data));
      navigation.navigate('SetupAparejos', {
        setupGruaData: data,
      });
    } catch (error) {
      console.error("Error al guardar datos en AsyncStorage:", error);
    }
  };

  const isInputsDisabled = !grua; // Si no hay grúa seleccionada, los inputs están deshabilitados

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />

        <ScrollView contentContainerStyle={{ flexGrow: 2, height: 1000 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configurar grúa</Text>
          </View>

          <View style={styles.container}>
            {/* Configurar Grúa */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione grúa:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Grúa"
              value={grua?.nombre || 'Seleccionar grúa'}
              onPress={() => openModal(setGruaModalVisible)}
            />

            <BS.BSGrua
              isVisible={isGruaModalVisible}
              onClose={() => setGruaModalVisible(false)}
              onSelect={setGrua}
            />

            {/* Formulario de Largo de Pluma y Ángulo de Inclinación */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Ingrese los siguientes datos para la maniobra:</Text>
            </View>

            <View style={styles.inputContainer}>
              {/* Componente personalizado para el largo de pluma */}
              <Components.NumericInput
                label="Largo de pluma"
                value={largoPluma}
                onChangeText={setLargoPluma}
                placeholder="Largo pluma (m.)"
                onEndEditing={() => {
                  if (largoPluma && !largoPluma.includes('m')) {
                    setLargoPluma(largoPluma + ' m');
                  }
                }}
                editable={!isInputsDisabled}
              />

              {/* Componente personalizado para el ángulo de inclinación */}
              <Components.NumericInput
                label="Ángulo de inclinación"
                value={anguloInclinacion}
                onChangeText={setAnguloInclinacion}
                placeholder="Ángulo (°)"
                onEndEditing={() => {
                  if (anguloInclinacion && !anguloInclinacion.includes('°')) {
                    setAnguloInclinacion(anguloInclinacion + '°');
                  }
                }}
                editable={!isInputsDisabled} 
              />
            </View>

            <View style={styles.visualizationContainer}>
                <Text>Hola mundo</Text>
            </View>

            <View style={[styles.buttonContainer, { right: 40 }]}>
              {/* Botón Volver */}
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]} // Ajuste en el margen entre los botones
              />

              {/* Botón Continuar */}
              <Components.Button
                label="Continuar"
                onPress={handleNavigateToSetupAparejos}
                style={[styles.button, { width: '50%', right: 45 }]} // Ajuste en el margen entre los botones
              />
            </View>


          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupGrua;
