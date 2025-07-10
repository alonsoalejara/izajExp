import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import { validateSetupAparejos } from '../utils/validation/validateAparejos';

const EditAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [planData, setPlanData] = useState({});
  const [setupGruaData, setSetupGruaData] = useState({});
  const [setupCargaData, setSetupCargaData] = useState({});
  const [setupRadioData, setSetupRadioData] = useState({});

  const [maniobraSeleccionada, setManiobraSeleccionada] = useState({ cantidad: '', tipo: null, cantidades: {} });
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
  const [tableData, setTableData] = useState([]);
  const grilleteSummary = tipoGrillete ? `${tipoGrillete}"` : '';
  const openModal = setter => setter(true);

  const [errorCantidadManiobra, setErrorCantidadManiobra] = useState('');
  const [errorTipoManiobra, setErrorTipoManiobra] = useState('');
  const [errorCantidadGrilletes, setErrorCantidadGrilletes] = useState('');
  const [errorTipoGrillete, setErrorTipoGrillete] = useState('');
  const [errorTipoAparejo, setErrorTipoAparejo] = useState('');
  const [errorAparejoPorWLL, setErrorAparejoPorWLL] = useState('');
  const [errorAnguloSeleccionado, setErrorAnguloSeleccionado] = useState('');

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (route.params?.planData) {
      setPlanData(route.params.planData);
      console.log('Datos de SetupPlan recibidos en EditAparejos:', route.params.planData);
    }
    if (route.params?.setupCargaData) {
      setSetupCargaData(route.params.setupCargaData);
      console.log('Datos de SetupCarga recibidos en EditAparejos:', route.params.setupCargaData);
    }
    if (route.params?.setupGruaData) {
      setSetupGruaData(route.params.setupGruaData);
      console.log('Datos de SetupGrua recibidos en EditAparejos:', route.params.setupGruaData);
    }
    if (route.params?.setupRadioData) {
      setSetupRadioData(route.params.setupRadioData);
      console.log('Datos de SetupRadio recibidos en EditAparejos:', route.params.setupRadioData);
    }

    const fetchDataFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('setupGruaData');
        if (data) {
          if (!route.params?.setupGruaData) {
            setSetupGruaData(JSON.parse(data));
          }
        }
      } catch (e) {
        // console.error('Error fetching setupGruaData from AsyncStorage:', e);
      }
    };
    fetchDataFromAsyncStorage();
    setHasUnsavedChanges(false);
  }, [route.params]);

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
    setHasUnsavedChanges(true);
  }, [tipoManiobraSeleccionadoSolo]);

  useEffect(() => {
    setAparejoPorWLL('');
    setHasUnsavedChanges(true);
  }, [tipoAparejoSeleccionado]);

  useEffect(() => {
    if (!maniobraSeleccionada?.cantidad) {
      setTableData([]);
      return;
    }
    const nuevaTabla = Array.from({ length: maniobraSeleccionada.cantidad }, (_, index) => ({ key: index + 1 }));
    setTableData(nuevaTabla);
    setHasUnsavedChanges(true);
  }, [maniobraSeleccionada?.cantidad]);

  useEffect(() => {
    setCantidadGrilletes(maniobraSeleccionada.cantidad || '');
    setHasUnsavedChanges(true);
  }, [maniobraSeleccionada.cantidad]);

  const handleManiobraSeleccionada = useCallback((maniobra) => {
    setManiobraSeleccionada(prev => ({ cantidad: prev?.cantidad || '', tipo: { type: maniobra.type, cantidades: maniobra.cantidades } }));
    setTipoManiobraSeleccionadoSolo(maniobra.type);
    setErrorTipoManiobra('');
    setHasUnsavedChanges(true);
  }, []);

  const handleGuardar = () => {
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
      const setupAparejosData = {
        cantidadManiobra: maniobraSeleccionada.cantidad,
        eslingaOEstrobo: maniobraSeleccionada.tipo?.type || '',
        cantidadGrilletes,
        tipoGrillete: tipoGrillete || '',
        anguloEslinga: anguloSeleccionado ? `${anguloSeleccionado}°` : '',
        tipoAparejo: tipoAparejoSeleccionado,
        aparejoPorWLL: aparejoPorWLL,
      };

      const allDataToSend = {
        planData,
        setupCargaData,
        setupGruaData,
        setupAparejosData
      };

      console.log('Datos guardados en EditAparejos.js:', allDataToSend);

      setHasUnsavedChanges(false);
      navigation.goBack();
    }
  };

  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        "Descartar cambios",
        "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => console.log("Cancelado")
          },
          {
            text: "Descartar",
            style: "destructive",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const isGuardarDisabled =
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
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ position: 'absolute', top: 60, left: 10, zIndex: 10 }}
        >
          <Icon name="keyboard-arrow-left" size={44} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.titleContainer}><Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>Configuración de aparejos</Text></View>
          <View style={styles.container}>
            <View style={styles.inputWrapper}><Text style={styles.labelText}>Maniobra (cantidad y tipo de aparejos):</Text></View>
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

            {maniobraSeleccionada.tipo?.type && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
              <View>
                <View style={[styles.inputWrapper, { top: -5 }]}>
                  <Text style={styles.labelText}>Ángulos de trabajo (°):</Text>
                </View>
                <Components.RenderAngulos anguloSeleccionado={anguloSeleccionado} setAnguloSeleccionado={setAnguloSeleccionado} />
                {errorAnguloSeleccionado && <Text style={[styles.errorText, { top: 3 }]}>{errorAnguloSeleccionado}</Text>}
                <Image
                  source={require('../../assets/esl-est-grade.png')}
                  style={styles.eslingaImage}
                />
              </View>
            )}

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
                <Text style={styles.selectedManiobraText}>{`${cantidadGrilletes} grillete(s) de ${tipoGrillete}"`}</Text>
              </View>
            )}

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
                setHasUnsavedChanges(true);
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
                setHasUnsavedChanges(true);
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
                setHasUnsavedChanges(true);
              }}
              tipoAparejo={tipoAparejoSeleccionado}
              anguloSeleccionado={anguloSeleccionado}
              cantidadManiobra={cantidadNumero}
            />

            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Components.Button
                label="Guardar"
                onPress={handleGuardar}
                disabled={isGuardarDisabled}
                style={{ width: '88%', paddingVertical: 15, right: 23 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditAparejos;
