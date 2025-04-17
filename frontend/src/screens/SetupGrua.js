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

  useEffect(() => {
    const izaje = parseFloat(radioIzaje) || 0;
    const montaje = parseFloat(radioMontaje) || 0;
    const maxRadio = Math.max(izaje, montaje);
    setRadioTrabajoMaximo(maxRadio.toString());
  
    if (grua?.nombre === "Terex RT555") {
      const alturaType = getAlturaType(largoPluma);
      const radioEntero = String(Math.floor(maxRadio));
      const inclinacionMapForAltura = inclinacionMapAlturas[alturaType];
  
      if (inclinacionMapForAltura && inclinacionMapForAltura[radioEntero] !== undefined) {
        setAnguloInclinacionVisual(inclinacionMapForAltura[radioEntero]);
      } else {
        setAnguloInclinacionVisual(75);
      }
    } else {
      setAnguloInclinacionVisual(75);
    }
  }, [radioIzaje, radioMontaje, grua, largoPluma]);

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupAparejos = async () => {
    const errorsGrua = validateSetupGrua(grua);
    const errorsRadioIzaje = !radioIzaje && isInputsEnabled;
    const errorsRadioMontaje = !radioMontaje && isInputsEnabled;

    setErrorGrua(errorsGrua.grua || '');
    setErrorRadioIzaje(errorsRadioIzaje ? 'Este campo es requerido' : '');
    setErrorRadioMontaje(errorsRadioMontaje ? 'Este campo es requerido' : '');

    if (Object.keys(errorsGrua).length > 0 || errorsRadioIzaje || errorsRadioMontaje) {
      return;
    }

    console.log("Radio de trabajo maximo:", radioTrabajoMaximo);

    const setupGruaData = {
      grua,
      largoPluma,
      anguloInclinacion: anguloInclinacionVisual.toString() + "°",
      radioIzaje,
      radioMontaje,
      radioTrabajoMaximo,
      usuarioId,
    };
    await AsyncStorage.setItem('setupGruaData', JSON.stringify(setupGruaData));
    navigation.navigate('SetupAparejos', { setupGruaData, setupCargaData });
  };

  const isInputsDisabled = !grua;
  const isInputsEnabled = !!grua;
  const isContinuarDisabled = !grua || !radioIzaje || !radioMontaje;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  } else {
                    setLargoPluma("");
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
                  style={{ height: 60, width: 320, top: 7 }}
                  disabled={isInputsDisabled}
                />
                <BS.BSLargoPluma
                  isVisible={isLargoPlumaModalVisible}
                  onClose={() => setLargoPlumaModalVisible(false)}
                  onSelect={(selectedLargoPluma) => setLargoPluma(selectedLargoPluma)}
                />
              </View>

              {/* Container para Radio de Izaje y Radio de Montaje */}
              <View style={[styles.inputContainer, { marginTop: 15, marginBottom: 15 }]}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.labelText}>Radio de izaje (m):</Text>
                  <Components.NumericInput
                    value={radioIzaje}
                    onChangeText={setRadioIzaje}
                    placeholder="Radio de izaje"
                    editable={isInputsEnabled}
                    style={[styles.inputField, errorRadioIzaje && { borderColor: 'red', borderWidth: 3 }]}
                    showControls={false}
                  />
                  {errorRadioIzaje ? <Text style={styles.errorText}>{errorRadioIzaje}</Text> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelText}>Radio de montaje (m):</Text>
                  <Components.NumericInput
                    value={radioMontaje}
                    onChangeText={setRadioMontaje}
                    placeholder="Radio de montaje"
                    editable={isInputsEnabled}
                    style={[styles.inputField, errorRadioMontaje && { borderColor: 'red', borderWidth: 3 }]}
                    showControls={false}
                  />
                  {errorRadioMontaje ? <Text style={styles.errorText}>{errorRadioMontaje}</Text> : null}
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { left: 8 }]}>Visualización de la grúa:</Text>
              </View>
              {grua ? (
                <View style={{ width: 150, height: 39, top: 0, justifyContent: 'center' }}>
                  <Text style={[styles.labelText, { textAlign: 'center' }]}>Ángulo de inclinación</Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333' }}>{anguloInclinacionVisual}°</Text>
                  </View>
                </View>
              ) : (
                <View style={{ width: 150 }} />
              )}
              <View style={styles.visualizationGruaContainer}>
                {!grua ? (
                  <Text style={[styles.labelText, { color: '#ccc'}]}>
                    Debe seleccionar una grúa para visualizar.
                  </Text>
                ) : grua.nombre === "Terex RT555" ? (
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
          <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
            <Components.Button
              label="Volver"
              onPress={() => navigation.goBack()}
              isCancel={true}
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