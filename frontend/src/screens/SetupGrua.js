import React, { useState, useEffect } from 'react';  
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import GruaIllustration from '../components/cranes/UI/GruaIllustration';

const SetupGrua = () => {
  const navigation = useNavigation();
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isLargoPlumaModalVisible, setLargoPlumaModalVisible] = useState(false);
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

  const isInputsDisabled = !grua; 

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 2, height: 1000 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configurar grúa</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione grúa:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Grúa"
              value={grua?.nombre || ''}
              placeholder="Seleccionar grúa"
              onPress={() => openModal(setGruaModalVisible)}
            />
            <BS.BSGrua
              isVisible={isGruaModalVisible}
              onClose={() => setGruaModalVisible(false)}
              onSelect={(selectedGrua) => {
                setGrua(selectedGrua);
                if (selectedGrua.nombre === "Terex RT555") {
                  setAnguloInclinacion("67°");
                } else {
                  setAnguloInclinacion("");
                }
              }}
            />

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Ingrese los siguientes datos para la maniobra:</Text>
            </View>

            <View style={[styles.inputContainer, { flexDirection: 'row', marginTop: -3 }]}>              
              <Components.ConfigButton
                label="Largo de pluma"
                value={largoPluma || ''}
                placeholder="Largo pluma"
                onPress={() => openModal(setLargoPlumaModalVisible)}
                style={{ height: 60, width: 150, top: 7 }}
                disabled={isInputsDisabled}
              />

              <BS.BSLargoPluma
                isVisible={isLargoPlumaModalVisible}
                onClose={() => setLargoPlumaModalVisible(false)}
                onSelect={(selectedLargoPluma) => setLargoPluma(selectedLargoPluma)}
              />
              
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
                style={{ width: 150 }}
              />
            </View>

            <View style={[styles.buttonContainer, { right: 40, marginTop: 15, marginBottom: -20 }]}>              
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              
              <Components.Button
                label="Continuar"
                onPress={handleNavigateToSetupAparejos}
                style={[styles.button, { width: '50%', right: 45 }]}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Visualización de la grúa:</Text>
            </View>

            <View style={styles.visualizationGruaContainer}>
              {grua?.nombre === "Terex RT555" ? <GruaIllustration /> : <Text style={styles.labelText}>No disponible</Text>}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupGrua;
