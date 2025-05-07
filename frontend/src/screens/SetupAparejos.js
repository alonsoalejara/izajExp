import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import { generarGrilleteSummary } from '../utils/grilleteUtils';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [setupGruaData, setSetupGruaData] = useState({});
  const [setupCargaData, setSetupCargaData] = useState({});
  const [setupRadioData, setSetupRadioData] = useState({});
  const [maniobraSeleccionada, setManiobraSeleccionada] = useState({ cantidad: '', tipo: null, cantidades: {} });
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState({});
  const [medidaS1, setMedidaS1] = useState('');
  const [medidaS2, setMedidaS2] = useState('');
  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
  const [isTipoAparejoModalVisible, setTipoAparejoModalVisible] = useState(false);
  const [anguloSeleccionado, setAnguloSeleccionado] = useState(null);
  const [tipoAparejoSeleccionado, setTipoAparejoSeleccionado] = useState('');
  const [tipoAparejoLabel, setTipoAparejoLabel] = useState('Selección del tipo de aparejo:');
  const [tipoManiobraSeleccionadoSolo, setTipoManiobraSeleccionadoSolo] = useState('');
  const [tipoWllLabel, setTipoWllLabel] = useState('Selección del aparejo según WLL:');
  const [aparejoPorWLL, setAparejoPorWLL] = useState('');
  const [isAparejoWLLModalVisible, setAparejoWLLModalVisible] = useState(false);
  const cantidadNumero = parseInt(maniobraSeleccionada.cantidad, 10) || 0;
  const [tableData, setTableData] = useState([]);
  const grilleteSummary = generarGrilleteSummary(tipoGrillete);
  const openModal = setter => setter(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('setupGruaData');
        if (data) setSetupGruaData(JSON.parse(data));
      } catch (e) {
        console.error('Error fetching setupGruaData:', e);
      }
    };
    fetchData();
    if (route.params?.setupCargaData) setSetupCargaData(route.params.setupCargaData);
    if (route.params?.setupGruaData) setSetupGruaData(route.params.setupGruaData);
    if (route.params?.setupRadioData) setSetupRadioData(route.params.setupRadioData);
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
  }, [tipoManiobraSeleccionadoSolo]);

  useEffect(() => {
    setAparejoPorWLL('');
  }, [tipoAparejoSeleccionado]);

  useEffect(() => {
    if (!maniobraSeleccionada?.cantidad) {
      setTableData([]);
      return;
    }
    const nuevaTabla = Array.from({ length: maniobraSeleccionada.cantidad }, (_, index) => ({ key: index + 1 }));
    setTableData(nuevaTabla);
  }, [maniobraSeleccionada?.cantidad]);

  useEffect(() => {
    setMedidaS1('');
    setMedidaS2('');
  }, [maniobraSeleccionada.cantidad]);

  useEffect(() => {
    if (cantidadNumero === 1) {
      setMedidaS2('0');
    }
  }, [cantidadNumero]);

  const handleManiobraSeleccionada = useCallback((maniobra) => {
    setManiobraSeleccionada(prev => ({ cantidad: prev?.cantidad || '', tipo: { type: maniobra.type, cantidades: maniobra.cantidades } }));
    setTipoManiobraSeleccionadoSolo(maniobra.type);
    setTipoAparejoSeleccionado('');
    setAparejoPorWLL(''); // Reinicia el WLL al cambiar el tipo de maniobra
  }, []);

  const handleNavigate = () => {
    const grilletePulgada = Object.keys(tipoGrillete)
      .filter(dia => tipoGrillete[dia] > 0)
      .join(', ');
    const payload = {
      cantidadManiobra: maniobraSeleccionada.cantidad,
      eslingaOEstrobo: maniobraSeleccionada.tipo?.type || '',
      cantidadGrilletes,
      tipoGrillete: grilletePulgada,
      anguloEslinga: anguloSeleccionado ? `${anguloSeleccionado}°` : '',
      medidaS1Maniobra: medidaS1,
      medidaS2Maniobra: medidaS2,
      tipoAparejo: tipoAparejoSeleccionado,
      aparejoPorWLL: aparejoPorWLL, // Incluye el aparejo por WLL en el payload
    };
    navigation.navigate('Tablas', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData: payload,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
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
              />
              <Components.ConfigButton
                label="Tipo"
                value={maniobraSeleccionada.tipo?.type || ''}
                onPress={() => openModal(setManiobraModalVisible)}
                placeholder="Esl./Estr."
                disabled={!maniobraSeleccionada.cantidad}
                width={160}
              />
            </View>

            {maniobraSeleccionada.tipo?.cantidades && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
              <View>
                <View style={[styles.inputWrapper, { top: -5 }]}>
                  <Text style={styles.labelText}>Ángulos de trabajo (°):</Text>
                </View>
                <Components.RenderAngulos anguloSeleccionado={anguloSeleccionado} setAnguloSeleccionado={setAnguloSeleccionado} />
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
              style={styles.configButton}
              disabled={!tipoManiobraSeleccionadoSolo}
            />

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
              style={styles.configButton}
              disabled={!tipoAparejoSeleccionado}
            />

            {maniobraSeleccionada.cantidad !== '' && (
              <View>
                <View style={styles.inputWrapper}><Text style={styles.labelText}>Medidas de maniobra (m):</Text></View>
                <View style={[styles.inputContainer, { marginBottom: 10 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.labelText}>Medida S1 (metros):</Text>
                    <Components.NumericInput
                      value={medidaS1}
                      onChangeText={setMedidaS1}
                      placeholder="Medida S1"
                      keyboardType="numeric"
                      style={styles.numericInput}
                      showControls={false}
                      showClearButton={true}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.labelText}>Medida S2 (metros):</Text>
                    <Components.NumericInput
                      value={medidaS2}
                      onChangeText={setMedidaS2}
                      placeholder="Medida S2"
                      keyboardType="numeric"
                      style={[styles.numericInput, cantidadNumero === 1 && styles.disabledInput]}
                      editable={cantidadNumero !== 1}
                      showControls={false}
                      showClearButton={cantidadNumero !== 1}
                    />
                  </View>
                </View>
              </View>
            )}

            <View style={[styles.inputWrapper, { top: 25 }]}>
              <Text style={styles.labelText}>Grillete: (cantidad)</Text>
            </View>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                placeholder="Cantidad"
                editable={false}
                style={styles.grilleteCantidadInput}
                showControls={false}
                showClearButton={false}
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                style={styles.grilleteTipoButton}
                disabled={!cantidadGrilletes}
              />
            </View>

            {Object.keys(tipoGrillete).length > 0 && (
              <View style={styles.selectedManiobraContainer}>
                {Object.entries(tipoGrillete).map(([dia, qty]) => (
                  <Text key={dia} style={styles.selectedManiobraText}>{`${qty} grillete(s) de ${dia}\"`}</Text>
                ))}
              </View>
            )}

            <BS.BSGrillete
              isVisible={isGrilleteModalVisible}
              onClose={() => setGrilleteModalVisible(false)}
              onSelect={setTipoGrillete}
              maxGrilletes={parseInt(cantidadGrilletes, 10)}
            />
            <BS.BSCantidad
              isVisible={isCantidadModalVisible}
              onClose={() => setCantidadModalVisible(false)}
              onSelect={cantidad => setManiobraSeleccionada(prev => ({ ...prev, cantidad: cantidad.toString() }))}
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
              onSelect={tipo => setTipoAparejoSeleccionado(tipo)}
              tipoManiobra={tipoManiobraSeleccionadoSolo}
            />
            <BS.BSWLL
              isVisible={isAparejoWLLModalVisible}
              onClose={() => setAparejoWLLModalVisible(false)}
              onSelect={setAparejoPorWLL}
              tipoAparejo={tipoAparejoSeleccionado}
              anguloSeleccionado={anguloSeleccionado}
              cantidadManiobra={cantidadNumero}
            />

            <View style={[styles.buttonContainer, { top: 45, right: 40 }]}>
              <Components.Button label="Volver" onPress={() => navigation.goBack()} isCancel style={styles.volverButton} />
              <Components.Button
                label="Continuar"
                onPress={handleNavigate}
                disabled={!cantidadGrilletes || (cantidadNumero === 1 && (!medidaS1 || medidaS1 === '')) || (cantidadNumero > 1 && (!medidaS1 || medidaS1 === '' || !medidaS2 || medidaS2 === ''))}
                style={styles.continuarButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;