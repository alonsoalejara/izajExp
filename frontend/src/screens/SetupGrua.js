import React, { useState, useEffect } from 'react';  
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import GruaIllustration from '../components/cranes/UI/GruaIllustration';
import RenderGrid from '../utils/render/renderGrid';
import { getGridContainerStyle } from '../utils/gridStyles';
import { getGruaIllustrationStyle } from '../utils/gruaStyles';
import { getAlturaType } from '../logic/alturaLogic';
import { validateSetupGrua } from '../utils/validation/validationCrane';

const SetupGrua = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialCargaData = route.params?.setupCargaData;
  const [setupCargaData, setSetupCargaData] = useState(initialCargaData || {});
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isLargoPlumaModalVisible, setLargoPlumaModalVisible] = useState(false);
  const [grua, setGrua] = useState('');
  const [errorGrua, setErrorGrua] = useState('');
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
    const errors = validateSetupGrua(grua);
    if (Object.keys(errors).length > 0) {
      setErrorGrua(errors.grua || '');
      return;
    }
    setErrorGrua('');
    const setupGruaData = {
      grua,
      largoPluma,
      anguloInclinacion,
      usuarioId,
    };
    await AsyncStorage.setItem('setupGruaData', JSON.stringify(setupGruaData));
    navigation.navigate('SetupAparejos', { setupGruaData, setupCargaData });
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
            {errorGrua ? <Text style={[styles.errorText, { marginTop: -16 }]}>{errorGrua}</Text> : null}
            <Components.ConfigButton
              label="Configurar Grúa"
              value={grua?.nombre || ''}
              placeholder="Seleccionar grúa"
              onPress={() => openModal(setGruaModalVisible)}
              style={[ errorGrua && { borderColor: 'red', borderWidth: 3, borderRadius: 10 } ]}
            />
            <BS.BSGrua
              isVisible={isGruaModalVisible}
              onClose={() => setGruaModalVisible(false)}
              onSelect={(selectedGrua) => {
                setGrua(selectedGrua);
                setErrorGrua('');
                if (selectedGrua.nombre === "Terex RT555") {
                  setLargoPluma("10.5 m");
                  setAnguloInclinacion("75°");
                } else {
                  setLargoPluma("");
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
                onChangeText={(text) => {
                  let cleanedValue = text.replace('°', '').trim();
                  if (cleanedValue) {
                    let numValue = parseInt(cleanedValue, 10);
                    if (numValue < 10) numValue = 10;
                    if (numValue > 75) numValue = 75;
                    setAnguloInclinacion(`${numValue}°`);
                  } else {
                    setAnguloInclinacion('');
                  }
                }}
                placeholder="Ángulo (°)"
                onEndEditing={() => {
                  if (anguloInclinacion && !anguloInclinacion.includes('°')) {
                    setAnguloInclinacion(anguloInclinacion + '°');
                  }
                }}
                editable={!isInputsDisabled}
                style={{ width: 150, height: 59, top: 10 }}
                showControls={true}
                showClearButton={false}
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
              {!grua ? (
                <Text style={[styles.labelText, { color: '#ccc'}]}>Debe seleccionar una grúa para visualizar.</Text>
              ) : grua.nombre === "Terex RT555" ? (
                <View style={{ flex: 1, position: 'relative' }}>
                  <View style={getGridContainerStyle(largoPluma)}>
                    <RenderGrid />
                  </View>
                  {/* Si el ángulo es 75° se aplica la dimensión calculada; de lo contrario se pasa "sinDimensiones"
                      y se envía además el valor numérico de la inclinación */}
                  <GruaIllustration 
                    alturaType={anguloInclinacion === "75°" ? getAlturaType(largoPluma) : "sinDimensiones"}
                    inclinacion={parseInt(anguloInclinacion, 10)}
                    style={getGruaIllustrationStyle(largoPluma)}
                  />
                </View>
              ) : (
                <Text style={styles.labelText}>No disponible</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupGrua;
