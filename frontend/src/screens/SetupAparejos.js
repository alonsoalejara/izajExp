import React, { useState, useEffect, useMemo } from 'react';
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

  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState({});
  const [medidaS1, setMedidaS1] = useState('');
  const [medidaS2, setMedidaS2] = useState('');

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  const [anguloSeleccionado, setAnguloSeleccionado] = useState(null);
  const [tableData, setTableData] = useState([]);

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchSetupGruaData = async () => {
      try {
        const data = await AsyncStorage.getItem('setupGruaData');
        if (data) {
          setSetupGruaData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error al recuperar datos de SetupGrua:", error);
      }
    };
    fetchSetupGruaData();

    if (route.params?.setupCargaData) {
      setSetupCargaData(route.params.setupCargaData);
    }
    if (route.params?.setupGruaData) {
      setSetupGruaData(route.params.setupGruaData);
    }
    if (route.params?.setupRadioData) {
      setSetupRadioData(route.params.setupRadioData);
    }
  }, [route.params]);

  useEffect(() => {
    if (cantidadManiobra && eslingaOEstrobo?.cantidades) {
      const totalAparejos = Object.values(eslingaOEstrobo.cantidades).reduce((sum, qty) => sum + qty, 0);
      setCantidadGrilletes(totalAparejos.toString());

      let nuevaTablaData = [];
      let contador = 0;
      const mitad = totalAparejos > 1 ? totalAparejos / 2 : 0;

      Object.entries(eslingaOEstrobo.cantidades).forEach(([diametro, cantidad]) => {
        for (let i = 0; i < cantidad; i++) {
          const key = `${eslingaOEstrobo.type}-${diametro}-${i}`;
          const etiqueta = totalAparejos === 1 ? 'S1' : contador < mitad ? 'S1' : 'S2';
          nuevaTablaData.push({ key, item: `${etiqueta}: ${eslingaOEstrobo.type} de ${diametro} mm`, etiqueta });
          contador++;
        }
      });
      setTableData(nuevaTablaData);
      setMedidaS1('');
      setMedidaS2('');
    } else {
      setCantidadGrilletes('');
      setTableData([]);
      setMedidaS1('');
      setMedidaS2('');
    }
  }, [cantidadManiobra, eslingaOEstrobo]);

  const handleNavigateToTablas = () => {
    const grilletePulgadas = Object.entries(tipoGrillete)
      .filter(([diametro, cantidad]) => cantidad > 0)
      .map(([diametro]) => `${diametro}"`)
      .join(', ');

    const setupAparejosData = {
      cantidadManiobra,
      eslingaOEstrobo: eslingaOEstrobo?.type || '',
      cantidadGrilletes,
      tipoGrillete: grilletePulgadas,
      medidaS1: tableData.find(item => item.etiqueta === 'S1')?.medida || '',
      medidaS2: tableData.find(item => item.etiqueta === 'S2')?.medida || '',
      anguloEslinga: anguloSeleccionado ? `${anguloSeleccionado}°` : '',
    };

    console.log("3. Datos que se están pasando a Tablas:");
    for (const key in setupAparejosData) {
      if (Object.prototype.hasOwnProperty.call(setupAparejosData, key)) {
        console.log(`  ${key}: ${setupAparejosData[key]}`);
      }
    }

    navigation.navigate('Tablas', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData
    });
  };

  const grilleteSummary = tipoGrillete && typeof tipoGrillete === 'object'
    ? Object.entries(tipoGrillete)
        .filter(([diametro, cantidad]) => cantidad > 0)
        .map(([diametro, cantidad]) => `${cantidad}x${diametro}"`)
        .join(', ')
    : "";

  const handleChangeMedida = (index, value) => {
    const newData = [...tableData];
    newData[index].medida = value;
    setTableData(newData);
  };

  const renderAnguloButtons = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 }}>
      {['60', '45', '30'].map(angulo => (
        <TouchableOpacity
          key={angulo}
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
          onPress={() => setAnguloSeleccionado(angulo)}
        >
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ee0000', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
            {anguloSeleccionado === angulo && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ee0000' }} />}
          </View>
          <Text>{angulo}°</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 2, paddingBottom: 50 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configuración de aparejos</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Maniobra: (cantidad y tipo)</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.ConfigButton
                label="Cantidad"
                value={cantidadManiobra && cantidadManiobra !== '0' ? `${cantidadManiobra}` : ""}
                onPress={() => openModal(setCantidadModalVisible)}
                placeholder="Maniobras"
                width={150}
              />
              <Components.ConfigButton
                label="Tipo"
                value={eslingaOEstrobo && eslingaOEstrobo.type ? `${eslingaOEstrobo.type}` : ""}
                onPress={() => openModal(setManiobraModalVisible)}
                placeholder="Esl./Estr."
                width={150}
              />
            </View>

            {(eslingaOEstrobo && eslingaOEstrobo.cantidades && Object.keys(eslingaOEstrobo.cantidades).length > 0 &&
              (parseInt(cantidadManiobra, 10) === 2 || parseInt(cantidadManiobra, 10) === 4)) && (
              <>
                {renderAnguloButtons()}
                <Image
                  source={require('../../assets/esl-est-grade.png')}
                  style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 10 }}
                />
              </>
            )}

            {eslingaOEstrobo && eslingaOEstrobo.cantidades && Object.keys(eslingaOEstrobo.cantidades).length > 0 && (
              <View>
                <Text style={styles.labelText}>Medida S1 (m):</Text>
                {tableData.filter(item => item.etiqueta === 'S1').map((item, index) => (
                  <Components.NumericInput
                    key={item.key}
                    value={item.medida}
                    onChangeText={(value) => {
                      const s1Index = tableData.findIndex(dataItem => dataItem.key === item.key);
                      if (s1Index !== -1) {
                        handleChangeMedida(s1Index, value);
                      }
                    }}
                    placeholder={`Medida ${index + 1}`}
                    showControls={false}
                    style={styles.inputField}
                  />
                ))}
                {tableData.filter(item => item.etiqueta === 'S2').length > 0 && (
                  <Text style={[styles.labelText, { marginTop: 15 }]}>Medida S2 (m):</Text>
                )}
                {tableData.filter(item => item.etiqueta === 'S2').map((item, index) => (
                  <Components.NumericInput
                    key={item.key}
                    value={item.medida}
                    onChangeText={(value) => {
                      const s2Index = tableData.findIndex(dataItem => dataItem.key === item.key);
                      if (s2Index !== -1) {
                        handleChangeMedida(s2Index, value);
                      }
                    }}
                    placeholder={`Medida ${index + 1}`}
                    showControls={false}
                    style={styles.inputField}
                  />
                ))}
              </View>
            )}

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

            {tipoGrillete && typeof tipoGrillete === 'object' && Object.keys(tipoGrillete).length > 0 && (
              <View style={styles.selectedManiobraContainer}>
                {Object.entries(tipoGrillete).map(([diametro, cantidad]) => (
                  <Text key={diametro} style={styles.selectedManiobraText}>
                    {`${cantidad} grillete(s) de ${diametro}"`}
                  </Text>
                ))}
              </View>
            )}

            <BS.BSGrillete
              isVisible={isGrilleteModalVisible} onClose={() => setGrilleteModalVisible(false)} onSelect={setTipoGrillete}
              maxGrilletes={parseInt(cantidadGrilletes, 10)}
            />
            <BS.BSCantidad
              isVisible={isCantidadModalVisible} onClose={() => setCantidadModalVisible(false)} onSelect={setCantidadManiobra}
            />
            <BS.BSManiobra
              isVisible={isManiobraModalVisible} onClose={() => setManiobraModalVisible(false)} onSelect={setEslingaOEstrobo}
              maxManiobra={parseInt(cantidadManiobra, 10)}
            />

            <View style={[styles.buttonContainer, { top: 10, right: 40 }]}
            >
              <Components.Button
                label="Volver" onPress={() => navigation.goBack()} isCancel
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label="Continuar" onPress={handleNavigateToTablas}
                disabled={!cantidadGrilletes || Object.keys(tipoGrillete).length === 0 || tableData.some(item => !item.medida && cantidadManiobra > 0)}
                style={[styles.button, { width: '50%', right: 45 }]}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;