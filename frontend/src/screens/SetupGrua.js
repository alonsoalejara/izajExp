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
import { inclinacionMapAlturas } from '../utils/inclinacionMapAlturas';
import { evaluateMovement } from '../data/loadCapacity';

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
  const [radioIzaje, setRadioIzaje] = useState('');
  const [errorRadioIzaje, setErrorRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');
  const [errorRadioMontaje, setErrorRadioMontaje] = useState('');
  const [radioTrabajoMaximo, setRadioTrabajoMaximo] = useState('');
  const [anguloInclinacionVisual, setAnguloInclinacionVisual] = useState(75);
  const [usuarioId, setUsuarioId] = useState(null);
  const [movementEval, setMovementEval] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');
        if (storedUsuarioId) setUsuarioId(storedUsuarioId);
        else console.warn("No se encontró el usuarioId en AsyncStorage");
      } catch (error) {
        console.error("Error al obtener usuarioId:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const izajeVal = parseFloat(radioIzaje) || 0;
    const montajeVal = parseFloat(radioMontaje) || 0;
    const maxRadio = Math.max(izajeVal, montajeVal);
    setRadioTrabajoMaximo(maxRadio.toString());

    const pesoCargaVal = parseFloat(setupCargaData.peso) || 0;
    if (!isNaN(maxRadio) && !isNaN(pesoCargaVal) && largoPluma) {
      const boomLength = parseFloat(largoPluma) || 0;
      setMovementEval(evaluateMovement(maxRadio, pesoCargaVal, boomLength));
    } else {
      setMovementEval(null);
    }

    if (grua?.nombre === "Terex RT555") {
      const alturaType = getAlturaType(largoPluma);
      const radioEntero = String(Math.floor(maxRadio));
      const mapAlturas = inclinacionMapAlturas[alturaType] || {};
      setAnguloInclinacionVisual(
        mapAlturas[radioEntero] !== undefined ? mapAlturas[radioEntero] : 75
      );
    } else {
      setAnguloInclinacionVisual(75);
    }
  }, [radioIzaje, radioMontaje, grua, largoPluma, setupCargaData]);

  const openModal = setter => setter(true);

  const handleNavigateToSetupAparejos = async () => {
    const errors = validateSetupGrua(grua);
    const errIz = !radioIzaje && !!grua;
    const errMont = !radioMontaje && !!grua;
    setErrorGrua(errors.grua || '');
    setErrorRadioIzaje(errIz ? 'Este campo es requerido' : '');
    setErrorRadioMontaje(errMont ? 'Este campo es requerido' : '');

    console.log("2. Datos que se están pasando a SetupAparejos:");
    const setupGruaData = {
      nombreGrua: grua?.nombre || '',
      largoPluma,
      anguloInclinacion: `${anguloInclinacionVisual}°`,
      radioIzaje,
      radioMontaje,
      radioTrabajoMaximo,
      usuarioId,
      contrapeso: grua?.contrapeso || '',
      pesoEquipo: grua?.pesoEquipo || '',
      pesoGancho: grua?.pesoGancho || '',
    };
    for (const key in setupGruaData) {
      if (Object.prototype.hasOwnProperty.call(setupGruaData, key)) {
        console.log(`  ${key}: ${setupGruaData[key]}`);
      }
    }
    console.log("Datos de setupGruaData antes de guardar:", setupGruaData);
    await AsyncStorage.setItem('setupGruaData', JSON.stringify(setupGruaData));
    navigation.navigate('SetupAparejos', { setupGruaData, setupCargaData });
  };
  

  const isInputsDisabled = !grua;
  const isContinuarDisabled = !grua || !radioIzaje || !radioMontaje;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Configurar grúa</Text>
            </View>
            <View style={styles.container}>
              {/* Selección de grúa */}
              <View style={styles.inputWrapper}>
                <Text style={styles.labelText}>Seleccione grúa:</Text>
              </View>
              {errorGrua && <Text style={[styles.errorText, { marginTop: -16 }]}>{errorGrua}</Text>}
              <Components.ConfigButton
                label="Configurar Grúa"
                value={grua?.nombre || ''}
                placeholder="Seleccionar grúa"
                onPress={() => openModal(setGruaModalVisible)}
                style={errorGrua ? { borderColor: 'red', borderWidth: 3, borderRadius: 10 } : {}}
              />
              <BS.BSGrua
                isVisible={isGruaModalVisible}
                onClose={() => setGruaModalVisible(false)}
                onSelect={selected => {
                  setGrua(selected);
                  setErrorGrua('');
                  setLargoPluma(selected.nombre === 'Terex RT555' ? '10.5 m' : '');
                }}
              />

              {/* Datos de maniobra */}
              <View style={styles.inputWrapper}>
                <Text style={styles.labelText}>Ingrese los siguientes datos para la maniobra:</Text>
              </View>
              <View style={[styles.inputContainer, { flexDirection: 'row', marginTop: -3 }]}>
                <Components.ConfigButton
                  label="Largo de pluma"
                  value={largoPluma}
                  placeholder="Largo pluma"
                  onPress={() => openModal(setLargoPlumaModalVisible)}
                  disabled={isInputsDisabled}
                  style={{ height: 60, width: 320, top: 7 }}
                />
                <BS.BSLargoPluma
                  isVisible={isLargoPlumaModalVisible}
                  onClose={() => setLargoPlumaModalVisible(false)}
                  onSelect={setLargoPluma}
                />
              </View>

              {/* Radios */}
              <View style={[styles.inputContainer, { marginTop: 15, marginBottom: 15 }]}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.labelText}>Radio de izaje (m):</Text>
                  <Components.NumericInput
                    value={radioIzaje}
                    onChangeText={setRadioIzaje}
                    placeholder="Radio de izaje"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[styles.inputField, errorRadioIzaje && { borderColor: 'red', borderWidth: 3 }]}
                  />
                  {errorRadioIzaje && <Text style={styles.errorText}>{errorRadioIzaje}</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelText}>Radio de montaje (m):</Text>
                  <Components.NumericInput
                    value={radioMontaje}
                    onChangeText={setRadioMontaje}
                    placeholder="Radio de montaje"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[styles.inputField, errorRadioMontaje && { borderColor: 'red', borderWidth: 3 }]}
                  />
                  {errorRadioMontaje && <Text style={styles.errorText}>{errorRadioMontaje}</Text>}
                </View>
              </View>

              {/* Visualización */}
              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { left: 8 }]}>Visualización de la grúa:</Text>
              </View>
              {movementEval && (
                <Text style={[styles.labelText, { marginLeft: 8 }]}>
                  Optimal: {movementEval.message}
                </Text>
              )}
              {grua ? (
                <View style={{ width: 150, height: 39, justifyContent: 'center' }}>
                  <Text style={[styles.labelText, { textAlign: 'center' }]}>
                    Ángulo de inclinación
                  </Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333' }}>
                      {anguloInclinacionVisual}°
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ width: 150 }} />
              )}
              <View style={styles.visualizationGruaContainer}>
                {!grua ? (
                  <Text style={[styles.labelText, { color: '#ccc' }]}>
                    Debe seleccionar una grúa para visualizar.
                  </Text>
                ) : grua.nombre === 'Terex RT555' ? (
                  <View style={{ flex: 1, position: 'relative' }}>
                    <View style={getGridContainerStyle(largoPluma)}>
                      <RenderGrid />
                    </View>
                    <GruaIllustration
                      alturaType={getAlturaType(largoPluma)}
                      inclinacion={anguloInclinacionVisual}
                      radioTrabajoMaximo={radioTrabajoMaximo}
                      style={getGruaIllustrationStyle(largoPluma)}
                    />
                  </View>
                ) : (
                  <Text style={styles.labelText}>No disponible</Text>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Botones */}
          <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
            <Components.Button
              label="Volver"
              onPress={() => navigation.goBack()}
              isCancel
              style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
            />
            <Components.Button
              label="Continuar"
              onPress={handleNavigateToSetupAparejos}
              disabled={isContinuarDisabled}
              style={[
                styles.button,
                { width: '50%', right: 45 },
                isContinuarDisabled && { backgroundColor: '#cccccc' },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupGrua;
