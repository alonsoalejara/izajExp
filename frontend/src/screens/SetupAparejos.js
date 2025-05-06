import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import BSTipoManiobra from '../components/bottomSheets/BSTipoManiobra'; // Asegúrate de que la ruta sea correcta

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
  const [isTipoAparejoModalVisible, setTipoAparejoModalVisible] = useState(false); // Nuevo estado para el modal de tipo de aparejo

  const [anguloSeleccionado, setAnguloSeleccionado] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tipoAparejoSeleccionado, setTipoAparejoSeleccionado] = useState(''); // Estado para almacenar el tipo de aparejo seleccionado
  const [tipoAparejoLabel, setTipoAparejoLabel] = useState('Selección del tipo de aparejo:'); // Nuevo estado para el label
  const [tipoManiobraSeleccionadoSolo, setTipoManiobraSeleccionadoSolo] = useState(''); // Nuevo estado para el tipo de maniobra

  // Convertimos cantidad a número para comparaciones
  const cantidadNumero = parseInt(maniobraSeleccionada.cantidad, 10) || 0;

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

  const handleManiobraSeleccionada = useCallback((maniobra) => {
    setManiobraSeleccionada(prev => ({
      // Mantiene la cantidad anterior
      cantidad: prev?.cantidad || '',
      // Actualiza solo el tipo seleccionado
      tipo: {
        type: maniobra.type,
        cantidades: maniobra.cantidades
      }
    }));
  
    // Actualiza el nombre del tipo (Eslinga o Estrobo)
    setTipoManiobraSeleccionadoSolo(maniobra.type);
  
    // Limpia el tipo de aparejo seleccionado
    setTipoAparejoSeleccionado('');
  }, []);

  useEffect(() => {
    if (tipoManiobraSeleccionadoSolo === 'Eslinga') {
      setTipoAparejoLabel('Selección del tipo de eslinga:');
    } else if (tipoManiobraSeleccionadoSolo === 'Estrobo') {
      setTipoAparejoLabel('Selección del tipo de estrobo:');
    } else {
      setTipoAparejoLabel('Selección del tipo de aparejo:');
    }
  }, [tipoManiobraSeleccionadoSolo]);

  useEffect(() => {
    if (!maniobraSeleccionada?.cantidad) {
      setTableData([]);
      return;
    }

    const nuevaTabla = Array.from({ length: maniobraSeleccionada.cantidad }, (_, index) => ({
      key: index + 1,
      // Puedes agregar aquí los valores iniciales para cada fila
    }));

    setTableData(nuevaTabla);
  }, [maniobraSeleccionada.cantidad]);

  useEffect(() => {
    setMedidaS1('');
    setMedidaS2('');
  }, [maniobraSeleccionada.cantidad]);

  useEffect(() => {
    if (cantidadNumero === 1) {
      setMedidaS2('0');
    }
  }, [cantidadNumero]);

  useEffect(() => {
    if (!maniobraSeleccionada?.cantidad) {
      setTableData([]);
      return;
    }
  
    const nuevaTabla = Array.from({ length: maniobraSeleccionada.cantidad }, (_, index) => ({
      key: index + 1,
      // Puedes agregar aquí los valores iniciales para cada fila
    }));
  
    setTableData(nuevaTabla);
  }, [maniobraSeleccionada.cantidad]);

  useEffect(() => {
    // toma la cantidad de maniobras y la vuelca en cantidadGrilletes
    // si no hay cantidad, la deja vacía
    setCantidadGrilletes(maniobraSeleccionada.cantidad || '');
  }, [maniobraSeleccionada.cantidad]);
  
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
    };

    navigation.navigate('Tablas', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData: payload,
    });
  };

  const grilleteSummary = Object.entries(tipoGrillete)
    .filter(([, qty]) => qty > 0)
    .map(([dia]) => `${dia}"`)
    .join(', ');

  const renderAngulos = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 5, right: 25 }}>
      {['60', '45', '30'].map(angle => (
        <TouchableOpacity
          key={angle}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setAnguloSeleccionado(angle)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#ee0000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 5,
            }}
          >
            {anguloSeleccionado === angle && (
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ee0000' }} />
            )}
          </View>
          <Text>{angle}°</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>Configuración de aparejos</Text>
          </View>

          <View style={styles.container}>
            {/* Selección de maniobra */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Maniobra (cantidad y tipo de aparejos):</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.ConfigButton
                label="Cantidad"
                value={maniobraSeleccionada.cantidad || ''}
                onPress={() => openModal(setCantidadModalVisible)}
                placeholder="Maniobras"
                width={150}
              />
              <Components.ConfigButton
                label="Tipo"
                value={maniobraSeleccionada.tipo?.type || ''}
                onPress={() => openModal(setManiobraModalVisible)}
                placeholder="Esl./Estr."
                disabled={!maniobraSeleccionada.cantidad}
                width={150}
              />
            </View>

            {/* Nuevo label y botón de Tipo de aparejos */}
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
              style={{ marginTop: 14 }}
              disabled={!tipoManiobraSeleccionadoSolo}
            />

            {/* Ángulos e imagen para 2 o 4 maniobras */}
            {maniobraSeleccionada.tipo?.cantidades && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
              <>
                <View style={[styles.inputWrapper, { top: -5 }]}>
                  <Text style={styles.labelText}>Ángulos de trabajo (°):</Text>
                </View>
                {renderAngulos()}
                <Image
                  source={require('../../assets/esl-est-grade.png')}
                  style={{ width: '100%', height: 100, resizeMode: 'contain', marginVertical: 10 }}
                />
              </>
            )}

            {/* Medidas S1 y S2 */}
            {maniobraSeleccionada.cantidad !== '' && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.labelText}>Medidas de maniobra (m):</Text>
                </View>
                <View style={[styles.inputContainer, { marginBottom: 10 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.labelText}>Medida S1 (metros):</Text>
                    <Components.NumericInput
                      value={medidaS1}
                      onChangeText={setMedidaS1}
                      placeholder="Medida S1"
                      keyboardType="numeric"
                      style={{ width: '100%', top: 25, backgroundColor: '#fff' }}
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
                      style={{ width: '100%', top: 25, backgroundColor: cantidadNumero === 1 ? '#eee' : '#fff' }}
                      editable={cantidadNumero !== 1}
                      showControls={false}
                      showClearButton={cantidadNumero !== 1}
                    />
                  </View>
                </View>
              </>
            )}

            {/* Sección Grillete */}
            <View style={[styles.inputWrapper, { top: 25 }]}>
            <Text style={styles.labelText}>Grillete: (cantidad)</Text>
            </View>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                placeholder="Cantidad"
                editable={false}
                style={{ width: '50%', height: '77%', top: 30, backgroundColor: '#fff' }}
                showControls={false}
                showClearButton={false}
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                style={{ width: '48%', top: 25, backgroundColor: '#fff' }}
                disabled={!cantidadGrilletes}
              />
            </View>

            {/* Lista de grilletes */}
            {Object.keys(tipoGrillete).length > 0 && (
              <View style={styles.selectedManiobraContainer}>
                {Object.entries(tipoGrillete).map(([dia, qty]) => (
                  <Text key={dia} style={styles.selectedManiobraText}>
                    {`${qty} grillete(s) de ${dia}\"`}
                  </Text>
                ))}
              </View>
            )}

            {/* Modals */}
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
            {/* Nuevo modal para Tipo de aparejo */}
            <BSTipoManiobra
              isVisible={isTipoAparejoModalVisible}
              onClose={() => setTipoAparejoModalVisible(false)}
              onSelect={tipo => setTipoAparejoSeleccionado(tipo)}
              tipoManiobra={tipoManiobraSeleccionadoSolo}
            />

            {/* Botones */}
            <View style={[styles.buttonContainer, { top: 45, right: 40 }]}>
              <Components.Button label="Volver" onPress={() => navigation.goBack()} isCancel style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]} />
              <Components.Button label="Continuar" onPress={handleNavigate} disabled={!cantidadGrilletes || (cantidadNumero === 1 && (!medidaS1 || medidaS1 === '')) || (cantidadNumero > 1 && (!medidaS1 || medidaS1 === '' || !medidaS2 || medidaS2 === ''))} style={[styles.button, { width: '50%', right: 45 }]} />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;