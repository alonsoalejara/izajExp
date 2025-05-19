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
import { evaluateMovement, capacityTables } from '../data/loadCapacity';

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
  const [capacidadLevanteCalc, setCapacidadLevanteCalc] = useState(null);
  const [radioIzajeError, setRadioIzajeError] = useState(false);
  const [radioMontajeError, setRadioMontajeError] = useState(false);

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
    const izajeVal        = parseFloat(radioIzaje)        || 0;
    const montajeVal      = parseFloat(radioMontaje)      || 0;
    const boomLengthStr = largoPluma?.split(' ')[0];
    const boomLengthNum = parseFloat(boomLengthStr) || 0;
    const pesoCargaVal   = parseFloat(setupCargaData.peso) || 0;

    const hasGrua = !!grua;
    const hasRadioIzaje = radioIzaje !== '';
    const hasRadioMontaje = radioMontaje !== '';

    const esRadioIzajeEnRango = validateRadioEnRango(boomLengthStr, radioIzaje);
    const esRadioMontajeEnRango = validateRadioEnRango(boomLengthStr, radioMontaje);

    setRadioIzajeError(!esRadioIzajeEnRango && hasRadioIzaje ? 'Radio fuera de rango' : '');
    setRadioMontajeError(!esRadioMontajeEnRango && hasRadioMontaje ? 'Radio fuera de rango' : '');

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
      mensajeMovimiento = 'Ingrese ambos radios de trabajo.';
      setMovementEval({ optimum: false, message: mensajeMovimiento });
    } else if (hasGrua && (!esRadioIzajeEnRango || !esRadioMontajeEnRango) && hasRadioIzaje && hasRadioMontaje) {
      mensajeMovimiento = 'Uno o ambos radios ingresados están fuera del rango válido.';
      setMovementEval({ optimum: false, message: mensajeMovimiento });
    } else {
      setMovementEval(null);
    }

    const capInicial = esRadioIzajeEnRango && boomLengthNum ? evaluateMovement(izajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable : null;
    const capFinal   = esRadioMontajeEnRango && boomLengthNum ? evaluateMovement(montajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable : null;

    const menorCapacidad = (capInicial != null && capFinal != null)
      ? Math.min(capInicial, capFinal)
      : capInicial ?? capFinal;

    setCapacidadLevanteCalc(menorCapacidad);

    let maxRadio = 0;
    if (esRadioIzajeEnRango && esRadioMontajeEnRango) {
      maxRadio = Math.max(izajeVal, montajeVal);
      setRadioTrabajoMaximo(maxRadio.toString());
    } else {
      setRadioTrabajoMaximo('');
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

  const validateRadioEnRango = (boomLength, radio) => {
    if (!boomLength || !capacityTables[boomLength] || !radio) {
      return false;
    }

    const radios = Object.keys(capacityTables[boomLength]).map(Number).sort((a, b) => a - b);
    const radioVal = parseFloat(radio);

    return !isNaN(radioVal) && radioVal >= radios[0] && radioVal <= radios[radios.length - 1];
  };
  
  const openModal = setter => setter(true);

  const handleNavigateToSetupAparejos = async () => {
    const errors = validateSetupGrua(grua);
    const errIz = !radioIzaje && !!grua;
    const errMont = !radioMontaje && !!grua;
    setErrorGrua(errors.grua || '');
    setErrorRadioIzaje(errIz ? 'Este campo es requerido' : '');
    setErrorRadioMontaje(errMont ? 'Este campo es requerido' : '');
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
      pesoCable: grua?.pesoCable || '',
      capacidadLevante: capacidadLevanteCalc != null
        ? capacidadLevanteCalc.toFixed(1)
        : grua?.capacidadLevante || '',
    };

    for (const key in setupGruaData) {
      if (Object.prototype.hasOwnProperty.call(setupGruaData, key)) {
        console.log(`  ${key}: ${setupGruaData[key]}`);
      }
    }
    await AsyncStorage.setItem('setupGruaData', JSON.stringify(setupGruaData));
    navigation.navigate('SetupAparejos', { setupGruaData, setupCargaData });
  };

  const isInputsDisabled = !grua;
  const isContinuarDisabled = !grua || !radioIzaje || !radioMontaje || radioIzajeError || radioMontajeError;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={[styles.sectionTitle, { top: 5 }]}>Configurar grúa</Text>
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
                  style={{ height: 60, width: 330, top: 7 }}
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
                    placeholder="Radio"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[styles.inputField, { width: 160, marginTop: 10 } , radioIzajeError && { borderColor: 'red', borderWidth: 3 }]}
                  />
                  {errorRadioIzaje && <Text style={styles.errorText}>{errorRadioIzaje}</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelText}>Radio de montaje (m):</Text>
                  <Components.NumericInput
                    value={radioMontaje}
                    onChangeText={setRadioMontaje}
                    placeholder="Radio"
                    editable={!isInputsDisabled}
                    showControls={false}
                    style={[styles.inputField, { width: 160, marginTop: 10 }, radioMontajeError && { borderColor: 'red', borderWidth: 3 }]}
                  />
                  {errorRadioMontaje && <Text style={styles.errorText}>{errorRadioMontaje}</Text>}
                </View>
              </View>

              {movementEval && (
                <Text
                  style={[
                    styles.labelText,
                    { marginLeft: 8 },
                    !movementEval.optimum && { color: 'red' }, // Aplica color rojo si !optimum
                  ]}
                >
                  Optimal: {movementEval.message}
                </Text>
              )}
              {/* Visualización */}
              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { left: 8 }]}>Visualización de la grúa:</Text>
              </View>
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
