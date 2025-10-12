import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import { validateSetupAparejos } from '../utils/validation/validateAparejos';
import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    mode = 'create',
    planData: initialPlanData,
    setupCargaData: initialCargaData,
    setupGruaData: initialGruaData,
    setupRadioData: initialRadioData,
  } = route.params || {};

  const [planData, setPlanData] = useState(initialPlanData || {});
  const [setupGruaData, setSetupGruaData] = useState(initialGruaData || {});
  const [setupCargaData, setSetupCargaData] = useState(initialCargaData || {});
  const [setupRadioData, setSetupRadioData] = useState(initialRadioData || {});

  const [maniobraSeleccionada, setManiobraSeleccionada] = useState({ cantidad: '', tipo: null });
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
  const [isTipoAparejoModalVisible, setTipoAparejoModalVisible] = useState(false);
  const [anguloSeleccionado, setAnguloSeleccionado] = useState('0');
  const [tipoAparejoSeleccionado, setTipoAparejoSeleccionado] = useState('');
  const [tipoAparejoLabel, setTipoAparejoLabel] = useState('Selección del tipo de aparejo:');
  const [tipoManiobraSeleccionadoSolo, setTipoManiobraSeleccionadoSolo] = useState('');
  const [tipoWllLabel, setTipoWllLabel] = useState('Selección del aparejo según WLL:');
  const [aparejoPorWLL, setAparejoPorWLL] = useState('');
  const [isAparejoWLLModalVisible, setAparejoWLLModalVisible] = useState(false);

  const cantidadNumero = parseInt(maniobraSeleccionada.cantidad, 10) || 0;
  const grilleteSummary = tipoGrillete ? `${tipoGrillete}"` : '';
  const openModal = setter => setter(true);

  const [errorCantidadManiobra, setErrorCantidadManiobra] = useState('');
  const [errorTipoManiobra, setErrorTipoManiobra] = useState('');
  const [errorCantidadGrilletes, setErrorCantidadGrilletes] = useState('');
  const [errorTipoGrillete, setErrorTipoGrillete] = useState('');
  const [errorTipoAparejo, setErrorTipoAparejo] = useState('');
  const [errorAparejoPorWLL, setErrorAparejoPorWLL] = useState('');
  const [errorAnguloSeleccionado, setErrorAnguloSeleccionado] = useState('');

  // 🔹 Precarga de datos si está en modo edición
  useEffect(() => {
    if (mode === 'edit' && initialPlanData && initialPlanData.aparejos?.length > 0) {
      const primerAparejo = initialPlanData.aparejos[0];
      const [maniobraType, aparejoType, ...wllParts] = primerAparejo.descripcion.split(' ').filter(Boolean);
      const wll = wllParts.join(' ');

      setManiobraSeleccionada({ cantidad: String(initialPlanData.aparejos.length), tipo: { type: maniobraType, cantidades: {} } });
      setCantidadGrilletes(String(primerAparejo.cantidad));
      setTipoGrillete(primerAparejo.grillete || '');
      setTipoManiobraSeleccionadoSolo(maniobraType || '');
      setTipoAparejoSeleccionado(aparejoType || '');
      setAparejoPorWLL(wll || '');
      setAnguloSeleccionado(initialPlanData.cargas?.anguloTrabajo?.replace('°', '') || '0');
    }
  }, [mode, initialPlanData]);

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('setupGruaData');
        if (data && !route.params?.setupGruaData) {
          setSetupGruaData(JSON.parse(data));
        }
      } catch (e) {
        console.error('Error al cargar setupGruaData:', e);
      }
    };
    fetchDataFromAsyncStorage();
  }, [route.params?.setupGruaData]);

  useEffect(() => {
    if (tipoManiobraSeleccionadoSolo === 'Eslinga') {
      setTipoAparejoLabel('Selección del tipo de eslinga:');
      setTipoWllLabel('Selección de eslinga según WLL:');
    } else if (tipoManiobraSeleccionadoSolo === 'Estrobo') {
      setTipoAparejoLabel('Selección del tipo de estrobo:');
      setTipoWllLabel('Selección de estrobo según WLL:');
    } else {
      setTipoAparejoLabel('Selección del tipo de aparejo:');
      setTipoWllLabel('Selección del aparejo según WLL:');
    }
    setTipoAparejoSeleccionado('');
    setAparejoPorWLL('');
  }, [tipoManiobraSeleccionadoSolo]);

  useEffect(() => {
    setAparejoPorWLL('');
  }, [tipoAparejoSeleccionado]);

  const handleManiobraSeleccionada = useCallback((maniobra) => {
    setManiobraSeleccionada(prev => ({ ...prev, tipo: { type: maniobra.type, cantidades: maniobra.cantidades } }));
    setTipoManiobraSeleccionadoSolo(maniobra.type);
    setErrorTipoManiobra('');
  }, []);

  // 🔸 Guardar y continuar
  const handleSave = () => {
    const errors = validateSetupAparejos(
      maniobraSeleccionada,
      cantidadGrilletes,
      tipoGrillete,
      tipoAparejoSeleccionado,
      aparejoPorWLL,
      anguloSeleccionado
    );

    setErrorCantidadManiobra(errors.cantidadManiobra || '');
    setErrorTipoManiobra(errors.tipoManiobra || '');
    setErrorCantidadGrilletes(errors.cantidadGrilletes || '');
    setErrorTipoGrillete(errors.tipoGrillete || '');
    setErrorTipoAparejo(errors.tipoAparejo || '');
    setErrorAparejoPorWLL(errors.aparejoPorWLL || '');
    setErrorAnguloSeleccionado(errors.anguloSeleccionado || '');

    if (Object.keys(errors).length === 0) {
      const selectedGrillete = grilleteOptions.find(opt => opt.pulgada === tipoGrillete);
      const pesoGrilleteCalculado = selectedGrillete ? selectedGrillete.peso : 0;
      const selectedManiobraType = maniobraOptions.find(opt => opt.label === tipoManiobraSeleccionadoSolo);
      const pesoUnitarioAparejo = selectedManiobraType ? selectedManiobraType.peso : 0;
      const cantidad = parseInt(maniobraSeleccionada.cantidad, 10) || 0;

      const aparejosList = [];
      for (let i = 0; i < cantidad; i++) {
        aparejosList.push({
          descripcion: `${tipoManiobraSeleccionadoSolo} ${tipoAparejoSeleccionado} ${aparejoPorWLL}`,
          cantidad: 1,
          pesoUnitario: pesoUnitarioAparejo,
          largo: 0,
          grillete: tipoGrillete,
          pesoGrillete: pesoGrilleteCalculado,
          tension: '0',
          altura: '',
        });
      }

      const updatedCargaData = {
        ...setupCargaData,
        anguloTrabajo: anguloSeleccionado ? `${anguloSeleccionado}°` : '',
      };

      const finalPlanData = {
        ...planData,
        aparejos: aparejosList,
        cargas: updatedCargaData,
        gruaData: setupGruaData,
        radioData: setupRadioData,
      };

      if (mode === 'edit') {
        Alert.alert('Éxito', 'Datos actualizados correctamente.');
        navigation.navigate('EditPlan', {
          planData: finalPlanData,
          aparejosCompletos: true,
        });
      } else {
        navigation.navigate('Tablas', {
          planData,
          setupCargaData,
          setupGruaData,
          setupAparejosData: { aparejosList, anguloSeleccionado },
        });
      }
    } else {
      Alert.alert('Error de validación', 'Por favor, complete todos los campos requeridos.');
    }
  };

  const isDisabled =
    !maniobraSeleccionada?.cantidad ||
    !maniobraSeleccionada?.tipo?.type ||
    !tipoGrillete ||
    !tipoAparejoSeleccionado ||
    !aparejoPorWLL ||
    (['2', '4'].includes(maniobraSeleccionada?.cantidad) && !anguloSeleccionado);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>
              {mode === 'edit' ? 'Editar aparejos' : 'Configuración de aparejos'}
            </Text>
          </View>
          <View style={styles.container}>
            {/* --- Maniobra --- */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Maniobra (cantidad y tipo de aparejos):</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.ConfigButton
                label="Cantidad"
                value={maniobraSeleccionada.cantidad || ''}
                onPress={() => openModal(setCantidadModalVisible)}
                placeholder="Maniobras"
                width={165}
                style={errorCantidadManiobra ? { borderColor: 'red', borderWidth: 1 } : {}}
              />
              <Components.ConfigButton
                label="Tipo"
                value={maniobraSeleccionada.tipo?.type || ''}
                onPress={() => openModal(setManiobraModalVisible)}
                placeholder="Esl./Estr."
                disabled={!maniobraSeleccionada.cantidad}
                width={160}
                style={errorTipoManiobra ? { borderColor: 'red', borderWidth: 1 } : {}}
              />
            </View>
            {errorCantidadManiobra && <Text style={[styles.errorText, { top: 5 }]}>{errorCantidadManiobra}</Text>}
            {errorTipoManiobra && <Text style={[styles.errorText, { top: 5 }]}>{errorTipoManiobra}</Text>}

            {/* --- Ángulo --- */}
            {maniobraSeleccionada.tipo?.type && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
              <View>
                <View style={[styles.inputWrapper, { top: -5 }]}>
                  <Text style={styles.labelText}>Ángulos de trabajo (°):</Text>
                </View>
                <Components.RenderAngulos
                  anguloSeleccionado={anguloSeleccionado}
                  setAnguloSeleccionado={setAnguloSeleccionado}
                />
                {errorAnguloSeleccionado && <Text style={[styles.errorText, { top: 3 }]}>{errorAnguloSeleccionado}</Text>}
                <Image source={require('../../assets/esl-est-grade.png')} style={styles.eslingaImage} />
              </View>
            )}

            {/* --- Tipo de Aparejo --- */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>{tipoAparejoLabel}</Text>
            </View>
            <Components.ConfigButton
              label="Tipo de aparejos"
              value={tipoAparejoSeleccionado || ''}
              onPress={() => openModal(setTipoAparejoModalVisible)}
              placeholder="Tipo de aparejos"
              width="101%"
              align="center"
              style={[styles.configButton, errorTipoAparejo ? { borderColor: 'red', borderWidth: 1 } : {}]}
              disabled={!tipoManiobraSeleccionadoSolo}
            />
            {errorTipoAparejo && <Text style={[styles.errorText, { top: 3 }]}>{errorTipoAparejo}</Text>}

            {/* --- WLL --- */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>{tipoWllLabel}</Text>
            </View>
            <Components.ConfigButton
              label="Aparejo WLL"
              value={aparejoPorWLL}
              onPress={() => openModal(setAparejoWLLModalVisible)}
              placeholder="Seleccione por WLL"
              width="101%"
              align="center"
              style={[styles.configButton, errorAparejoPorWLL ? { borderColor: 'red', borderWidth: 1 } : {}]}
              disabled={!tipoAparejoSeleccionado}
            />
            {errorAparejoPorWLL && <Text style={[styles.errorText, { top: 3 }]}>{errorAparejoPorWLL}</Text>}

            {/* --- Grilletes --- */}
            <View style={[styles.inputWrapper, { top: 25 }]}>
              <Text style={styles.labelText}>Grillete: (cantidad y tipo)</Text>
            </View>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                placeholder="Cantidad"
                editable={false}
                style={[styles.grilleteCantidadInput, errorCantidadGrilletes ? { borderColor: 'red', borderWidth: 1 } : {}]}
                showControls={false}
                showClearButton={false}
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                style={[styles.grilleteTipoButton, errorTipoGrillete ? { borderColor: 'red', borderWidth: 1 } : {}]}
                disabled={!cantidadGrilletes}
              />
            </View>
            {errorCantidadGrilletes && <Text style={[styles.errorText, { top: 3 }]}>{errorCantidadGrilletes}</Text>}
            {errorTipoGrillete && <Text style={[styles.errorText, { top: 3 }]}>{errorTipoGrillete}</Text>}

            {tipoGrillete && (
              <View style={styles.selectedManiobraContainer}>
                <Text style={styles.selectedManiobraText}>
                  {`${cantidadGrilletes} grillete(s) de ${tipoGrillete}"`}
                </Text>
              </View>
            )}

            {/* --- Bottom Sheets --- */}
            <BS.BSGrillete
              isVisible={isGrilleteModalVisible}
              onClose={() => setGrilleteModalVisible(false)}
              onSelect={setTipoGrillete}
            />
            <BS.BSCantidad
              isVisible={isCantidadModalVisible}
              onClose={() => setCantidadModalVisible(false)}
              onSelect={cantidad => {
                setManiobraSeleccionada(prev => ({ ...prev, cantidad: cantidad.toString() }));
                setCantidadGrilletes(cantidad.toString());
                setErrorCantidadManiobra('');
              }}
            />
            <BS.BSManiobra
              isVisible={isManiobraModalVisible}
              onClose={() => setManiobraModalVisible(false)}
              onSelect={handleManiobraSeleccionada}
              maxManiobra={parseInt(maniobraSeleccionada.cantidad, 10)}
            />
            <BS.BSTipoManiobra
              isVisible={isTipoAparejoModalVisible}
              onClose={() => setTipoAparejoModalVisible(false)}
              onSelect={tipo => {
                setTipoAparejoSeleccionado(tipo);
                setErrorTipoAparejo('');
              }}
              tipoManiobra={tipoManiobraSeleccionadoSolo}
              cantidadManiobra={cantidadNumero}
            />
            <BS.BSWLL
              isVisible={isAparejoWLLModalVisible}
              onClose={() => setAparejoWLLModalVisible(false)}
              onSelect={wll => {
                setAparejoPorWLL(wll);
                setErrorAparejoPorWLL('');
              }}
              tipoAparejo={tipoAparejoSeleccionado}
              anguloSeleccionado={anguloSeleccionado}
              pesoCarga={setupCargaData?.peso || null}
              cantidadManiobra={cantidadNumero}
            />

            {/* --- Botones --- */}
            <View style={[styles.buttonContainer, { marginBottom: -20, right: 40 }]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel
                style={styles.volverButton}
              />
              <Components.Button
                label={mode === 'edit' ? 'Guardar' : 'Continuar'}
                onPress={handleSave}
                disabled={isDisabled}
                style={[styles.continuarButton, { width: '60%', left: -38 }]}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;
