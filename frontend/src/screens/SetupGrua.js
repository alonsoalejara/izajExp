import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import * as ImageManipulator from 'expo-image-manipulator';
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
import { evaluateMovement, capacityTables } from '../data/loadCapacity';

const SetupGrua = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { mode = 'create', planData = {}, setupCargaData = {} } = route.params || {};

  const [currentPlanData, setCurrentPlanData] = useState(planData || {});
  const [currentCargaData, setCurrentCargaData] = useState(setupCargaData || {});

  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isLargoPlumaModalVisible, setLargoPlumaModalVisible] = useState(false);
  const [grua, setGrua] = useState(null);
  const [errorGrua, setErrorGrua] = useState('');
  const [largoPluma, setLargoPluma] = useState('');
  const [radioIzaje, setRadioIzaje] = useState('');
  const [errorRadioIzaje, setErrorRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');
  const [errorRadioMontaje, setErrorRadioMontaje] = useState('');
  const [radioTrabajoMaximo, setRadioTrabajoMaximo] = useState('');
  const [gradoInclinacionVisual, setGradoInclinacionVisual] = useState(75);
  const [usuarioId, setUsuarioId] = useState(null);
  const [movementEval, setMovementEval] = useState(null);
  const [capacidadLevanteCalc, setCapacidadLevanteCalc] = useState(null);
  const [radioIzajeError, setRadioIzajeError] = useState(false);
  const [radioMontajeError, setRadioMontajeError] = useState(false);

  const viewShotRef = useRef();

  // 🔹 Precarga de datos si está en modo edición
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');
        if (storedUsuarioId) setUsuarioId(storedUsuarioId);

        if (mode === 'edit' && planData?.grua) {
          const gruaObj = planData.grua?._id ? planData.grua : planData.grua;
          setGrua(gruaObj || null);
          setLargoPluma(planData?.datos?.largoPluma || '');
          setRadioIzaje(String(planData?.datos?.radioIzaje || ''));
          setRadioMontaje(String(planData?.datos?.radioMontaje || ''));
          setRadioTrabajoMaximo(String(planData?.cargas?.radioTrabajoMax || ''));
          setGradoInclinacionVisual(parseFloat(planData?.datos?.gradoInclinacion) || 75);
        }
      } catch (error) {
        console.error('Error al precargar datos de grúa:', error);
      }
    };
    fetchInitialData();
  }, [mode, planData]);

  // 🔸 Evaluar radios, capacidad y ángulo
  useEffect(() => {
    const izajeVal = parseFloat(radioIzaje) || 0;
    const montajeVal = parseFloat(radioMontaje) || 0;
    const boomLengthStr = largoPluma?.split(' ')[0];
    const boomLengthNum = parseFloat(boomLengthStr) || 0;
    const pesoCargaVal =
      parseFloat(currentCargaData?.pesoTotal) ||
      parseFloat(currentCargaData?.peso) ||
      0;

    const hasGrua = !!grua;
    const hasRadioIzaje = radioIzaje !== '';
    const hasRadioMontaje = radioMontaje !== '';

    const esRadioIzajeEnRango = validateRadioEnRango(boomLengthStr, radioIzaje);
    const esRadioMontajeEnRango = validateRadioEnRango(boomLengthStr, radioMontaje);

    setErrorRadioIzaje(!esRadioIzajeEnRango && hasRadioIzaje ? 'Radio fuera de rango' : '');
    setErrorRadioMontaje(!esRadioMontajeEnRango && hasRadioMontaje ? 'Radio fuera de rango' : '');
    setRadioIzajeError(!esRadioIzajeEnRango && hasRadioIzaje);
    setRadioMontajeError(!esRadioMontajeEnRango && hasRadioMontaje);

    let movimientoOptimo = false;
    let mensajeMovimiento = '';

    if (hasGrua && hasRadioIzaje && hasRadioMontaje && esRadioIzajeEnRango && esRadioMontajeEnRango) {
      const capacidadIzaje = evaluateMovement(izajeVal, pesoCargaVal, boomLengthNum);
      const capacidadMontaje = evaluateMovement(montajeVal, pesoCargaVal, boomLengthNum);

      if (capacidadIzaje.optimum && capacidadMontaje.optimum) {
        movimientoOptimo = true;
        mensajeMovimiento = 'Movimiento óptimo';
      } else if (!capacidadIzaje.optimum) {
        mensajeMovimiento = 'Radio de izaje fuera de capacidad';
      } else if (!capacidadMontaje.optimum) {
        mensajeMovimiento = 'Radio de montaje fuera de capacidad';
      } else {
        mensajeMovimiento = 'Verificar radios y capacidad';
      }
      setMovementEval({ optimum: movimientoOptimo, message: mensajeMovimiento });
    } else if (hasGrua && (!hasRadioIzaje || !hasRadioMontaje)) {
      setMovementEval({ optimum: false, message: 'Ingrese ambos radios de trabajo.' });
    } else if (
      hasGrua &&
      (!esRadioIzajeEnRango || !esRadioMontajeEnRango) &&
      hasRadioIzaje &&
      hasRadioMontaje
    ) {
      setMovementEval({
        optimum: false,
        message: 'Uno o ambos radios ingresados están fuera del rango válido.',
      });
    } else {
      setMovementEval(null);
    }

    const capInicial =
      esRadioIzajeEnRango && boomLengthNum
        ? evaluateMovement(izajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable
        : null;
    const capFinal =
      esRadioMontajeEnRango && boomLengthNum
        ? evaluateMovement(montajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable
        : null;

    const menorCapacidad =
      capInicial != null && capFinal != null
        ? Math.min(capInicial, capFinal)
        : capInicial ?? capFinal;

    setCapacidadLevanteCalc(menorCapacidad);

    const maxRadio =
      esRadioIzajeEnRango && esRadioMontajeEnRango
        ? Math.max(izajeVal, montajeVal)
        : 0;
    setRadioTrabajoMaximo(maxRadio ? maxRadio.toString() : '');

    if (grua?.nombre === 'Terex RT555') {
      const alturaType = getAlturaType(largoPluma);
      const radioEntero = String(Math.floor(maxRadio));
      const mapAlturas = inclinacionMapAlturas[alturaType] || {};
      setGradoInclinacionVisual(
        mapAlturas[radioEntero] !== undefined ? mapAlturas[radioEntero] : 75
      );
    } else {
      setGradoInclinacionVisual(75);
    }
  }, [radioIzaje, radioMontaje, grua, largoPluma, currentCargaData]);

  const validateRadioEnRango = (boomLength, radio) => {
    if (!boomLength || !capacityTables[boomLength] || !radio) return false;
    const radios = Object.keys(capacityTables[boomLength])
      .map(Number)
      .sort((a, b) => a - b);
    const radioVal = parseFloat(radio);
    return !isNaN(radioVal) && radioVal >= radios[0] && radioVal <= radios[radios.length - 1];
  };

  const openModal = (setter) => setter(true);

  const handleNavigateToSetupAparejos = async () => {
    const errors = validateSetupGrua(grua);
    const errIz = !radioIzaje && !!grua;
    const errMont = !radioMontaje && !!grua;
    setErrorGrua(errors.grua || '');
    setErrorRadioIzaje(errIz ? 'Este campo es requerido' : '');
    setErrorRadioMontaje(errMont ? 'Este campo es requerido' : '');

    if (Object.keys(errors).length > 0 || errIz || errMont || radioIzajeError || radioMontajeError) {
      return;
    }

    const dataToSend = {
      grua,
      nombreGrua: grua?.nombre || '',
      largoPluma,
      gradoInclinacion: `${gradoInclinacionVisual}°`,
      radioIzaje,
      radioMontaje,
      radioTrabajoMaximo,
      usuarioId,
      contrapeso: grua?.contrapeso || 0,
      pesoEquipo: parseFloat(currentCargaData?.pesoTotal) || 0,
      pesoGancho: 0.5,
      pesoCable: 0.3,
      capacidadLevante:
        capacidadLevanteCalc != null
          ? capacidadLevanteCalc.toFixed(1)
          : grua?.capacidadLevante || 0,
      ilustracionGrua: 'NoDisponible',
    };

    if (viewShotRef.current && grua?.nombre === 'Terex RT555') {
      try {
        const uri = await viewShotRef.current.capture({
          format: 'jpg',
          quality: 0.6,
          result: 'tmpfile',
        });

        const manipulated = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 400 } }],
          {
            compress: 0.5,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        dataToSend.ilustracionGrua = `data:image/jpeg;base64,${manipulated.base64}`;
      } catch (error) {
        console.error('Error al capturar imagen de grúa:', error);
        dataToSend.ilustracionGrua = 'NoDisponible';
      }
    }

      navigation.navigate('SetupAparejos', {
        mode,
        planData,
        setupCargaData,
        setupGruaData,
      });
  };

  const isInputsDisabled = !grua;
  const isContinuarDisabled =
    !grua || !radioIzaje || !radioMontaje || radioIzajeError || radioMontajeError;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={[styles.sectionTitle, { top: 5 }]}>
                {mode === 'edit' ? 'Editar grúa' : 'Configurar grúa'}
              </Text>
            </View>

            <View style={styles.container}>
              <View style={styles.inputWrapper}>
                <Text style={styles.labelText}>Seleccione grúa:</Text>
              </View>
              {errorGrua && (
                <Text style={[styles.errorText, { marginTop: -16 }]}>{errorGrua}</Text>
              )}
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
                onSelect={(selected) => {
                  setGrua(selected);
                  setErrorGrua('');
                  setLargoPluma(selected.nombre === 'Terex RT555' ? '10.5 m' : '');
                  setRadioIzaje('');
                  setRadioMontaje('');
                  setErrorRadioIzaje('');
                  setErrorRadioMontaje('');
                  setRadioIzajeError(false);
                  setRadioMontajeError(false);
                }}
              />

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
                  style={{ height: 60, width: 330, top: 7 }}
                />
                <BS.BSLargoPluma
                  isVisible={isLargoPlumaModalVisible}
                  onClose={() => setLargoPlumaModalVisible(false)}
                  onSelect={setLargoPluma}
                />
              </View>

              <View style={[styles.inputContainer, { marginTop: 15, marginBottom: 15 }]}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.labelText}>Radio de izaje (m):</Text>
                  <Components.NumericInput
                    value={radioIzaje}
                    onChangeText={setRadioIzaje}
                    placeholder="Radio"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[
                      styles.inputField,
                      { width: 160, marginTop: 10 },
                      radioIzajeError && { borderColor: 'red', borderWidth: 3 },
                    ]}
                  />
                  {errorRadioIzaje && (
                    <Text style={styles.errorText}>{errorRadioIzaje}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelText}>Radio de montaje (m):</Text>
                  <Components.NumericInput
                    value={radioMontaje}
                    onChangeText={setRadioMontaje}
                    placeholder="Radio"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[
                      styles.inputField,
                      { width: 160, marginTop: 10 },
                      radioMontajeError && { borderColor: 'red', borderWidth: 3 },
                    ]}
                  />
                  {errorRadioMontaje && (
                    <Text style={styles.errorText}>{errorRadioMontaje}</Text>
                  )}
                </View>
              </View>

              {movementEval && (
                <Text
                  style={[
                    styles.labelText,
                    { marginLeft: 8 },
                    !movementEval.optimum && { color: 'red' },
                  ]}
                >
                  {movementEval.message}
                </Text>
              )}

              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { left: 8 }]}>Visualización de la grúa:</Text>
              </View>

              {grua ? (
                <View style={{ width: 150, height: 39, justifyContent: 'center' }}>
                  <Text style={[styles.labelText, { textAlign: 'center' }]}>
                    Grado de inclinación
                  </Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333' }}>
                      {gradoInclinacionVisual}°
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
                  <ViewShot
                    ref={viewShotRef}
                    options={{ format: 'jpg', quality: 0.8 }}
                    style={{ flex: 1, width: '100%' }}
                  >
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View style={getGridContainerStyle(largoPluma)}>
                        <RenderGrid boomLength={largoPluma} />
                      </View>
                      <GruaIllustration
                        alturaType={getAlturaType(largoPluma)}
                        largoPluma={largoPluma}
                        inclinacion={gradoInclinacionVisual}
                        radioTrabajoMaximo={radioTrabajoMaximo}
                        style={getGruaIllustrationStyle(largoPluma)}
                      />
                    </View>
                  </ViewShot>
                ) : (
                  <Text style={styles.labelText}>No disponible</Text>
                )}
              </View>
            </View>
          </ScrollView>

          <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
            <Components.Button
              label="Volver"
              onPress={() => navigation.goBack()}
              isCancel
              style={[
                styles.button,
                { backgroundColor: 'transparent', marginRight: -50 },
              ]}
            />
            <Components.Button
              label={mode === 'edit' ? 'Guardar y continuar' : 'Continuar'}
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
