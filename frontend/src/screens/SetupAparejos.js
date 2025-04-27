import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [setupGruaData, setSetupGruaData] = useState({});
  const [setupCargaData, setSetupCargaData] = useState({});
  const [setupRadioData, setSetupRadioData] = useState({});

  const [maniobraSeleccionada, setManiobraSeleccionada] = useState({ cantidad: '', tipo: null, cantidades: {} });
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState({});
  const [medidaManiobraUnica, setMedidaManiobraUnica] = useState('');
  const [medidaS1, setMedidaS1] = useState('');
  const [medidaS2, setMedidaS2] = useState('');

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  const [anguloSeleccionado, setAnguloSeleccionado] = useState(null);
  const [tableData, setTableData] = useState([]);

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

  useEffect(() => {
    if (maniobraSeleccionada.cantidad && maniobraSeleccionada.tipo?.cantidades) {
      const total = Object.values(maniobraSeleccionada.tipo.cantidades).reduce((sum, qty) => sum + qty, 0);
      setCantidadGrilletes(total.toString());

      const rows = [];
      let count = 0;
      const half = total > 1 ? total / 2 : 0;

      Object.entries(maniobraSeleccionada.tipo.cantidades).forEach(([dia, qty]) => {
        for (let i = 0; i < qty; i++) {
          const label = total === 1 ? 'S1' : count < half ? 'S1' : 'S2';
          rows.push({
            key: `${maniobraSeleccionada.tipo.type}-${dia}-${i}`,
            item: `${label}: ${maniobraSeleccionada.tipo.type} de ${dia} mm`,
            etiqueta: label,
          });
          count++;
        }
      });
      setTableData(rows);
    } else {
      setCantidadGrilletes('');
      setTableData([]);
    }
    // Reset measures on maniobra change
    setMedidaManiobraUnica('');
    setMedidaS2('');
  }, [maniobraSeleccionada]);

  const handleNavigate = () => {
    const grilleteDesc = Object.entries(tipoGrillete)
      .filter(([, qty]) => qty > 0)
      .map(([dia, qty]) => `${qty}x${dia}\"`)
      .join(', ');

    const payload = {
      cantidadManiobra: maniobraSeleccionada.cantidad,
      eslingaOEstrobo: maniobraSeleccionada.tipo?.type || '',
      cantidadGrilletes,
      tipoGrillete: grilleteDesc,
      medidaManiobra: medidaManiobraUnica,
      anguloEslinga: anguloSeleccionado ? `${anguloSeleccionado}°` : '',
      medidaS1Maniobra: medidaS1,
      medidaS2Maniobra: medidaS2,
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
    .map(([dia, qty]) => `${qty}x${dia}\"`)
    .join(', ');

  const renderAngulos = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, marginTop: 30, left: -25 }}>
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
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configuración de aparejos</Text>
          </View>

          <View style={styles.container}>
            {/* Selección de maniobra */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Maniobra: (cantidad y tipo)</Text>
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
                width={150}
              />
            </View>

            {/* Medidas S1 y S2 */}
            {maniobraSeleccionada.cantidad !== '' && (
              <>              
                <View style={styles.inputWrapper}>
                  <Text style={styles.labelText}>Medidas de maniobra y ángulo de trabajo:</Text>
                </View>
                <View style={styles.inputContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.labelText}>Medida S1 (metros):</Text>
                    <Components.NumericInput
                      value={medidaS1}
                      onChangeText={setMedidaS1}
                      placeholder="Medida S1"
                      keyboardType="numeric"
                      style={{ width: '100%' }}
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
                      style={{ width: '100%', backgroundColor: cantidadNumero === 1 ? '#eee' : '#fff' }}
                      editable={cantidadNumero !== 1}
                      showControls={false}
                      showClearButton={cantidadNumero !== 1}
                    />
                  </View>
                </View>
              </>
            )}

            {/* Ángulos e imagen para 2 o 4 maniobras */}
            {maniobraSeleccionada.tipo?.cantidades && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
              <>
                {renderAngulos()}
                <Image
                  source={require('../../assets/esl-est-grade.png')}
                  style={{ width: '100%', height: 100, resizeMode: 'contain', marginVertical: 10 }}
                />
              </>
            )}

            {/* Medida unica para 1 maniobra */}
            {cantidadNumero === 1 && (
              <>
                <Text style={styles.labelText}>Medida maniobra (m):</Text>
                <TextInput
                  value={medidaManiobraUnica}
                  onChangeText={setMedidaManiobraUnica}
                  placeholder="Medida"
                  keyboardType="numeric"
                  style={styles.inputField}
                />
              </>
            )}

            {/* Sección Grillete */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Grillete: (cantidad)</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                placeholder="Cantidad"
                editable={false}
                showControls={false}
                showClearButton={false}
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                width={150}
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
              onSelect={tipoData => setManiobraSeleccionada(prev => ({ ...prev, tipo: tipoData, cantidades: tipoData.cantidades }))}
              maxManiobra={parseInt(maniobraSeleccionada.cantidad, 10)}
            />

            {/* Botones */}
            <View style={[styles.buttonContainer, { top: 10, right: 40 }]}>
              <Components.Button label="Volver" onPress={() => navigation.goBack()} isCancel style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]} />
              <Components.Button label="Continuar" onPress={handleNavigate} disabled={!cantidadGrilletes || (cantidadNumero === 1 && !medidaManiobraUnica)} style={[styles.button, { width: '50%', right: 45 }]} />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;
