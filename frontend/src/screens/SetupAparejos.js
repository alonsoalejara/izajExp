import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
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

  // Estado para guardar las medidas manuales para cada aparejo
  const [medidasAparejos, setMedidasAparejos] = useState({});

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  // Nuevo estado para el ángulo seleccionado
  const [anguloSeleccionado, setAnguloSeleccionado] = useState(null);

  console.log("Datos recibidos en SetupAparejos:");
  console.log("SetupGruaData:", setupGruaData);
  console.log("SetupCargaData:", setupCargaData);

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
    // Actualizar la cantidad de grilletes automáticamente
    if (cantidadManiobra && eslingaOEstrobo?.cantidades) {
      const totalAparejos = Object.values(eslingaOEstrobo.cantidades).reduce((sum, qty) => sum + qty, 0);
      setCantidadGrilletes(totalAparejos.toString());
    } else {
      setCantidadGrilletes('');
    }
  }, [cantidadManiobra, eslingaOEstrobo]);

  const handleNavigateToSetupRadio = () => {
    const setupAparejosData = {
      cantidadManiobra,
      eslingaOEstrobo,
      cantidadGrilletes,
      tipoGrillete,
      medidasAparejos, // Se envían también las medidas ingresadas manualmente
      anguloEslinga: anguloSeleccionado, // Enviar el ángulo seleccionado
    };

    navigation.navigate('SetupRadio', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData
    });
  };

  // Se genera un resumen del objeto "tipoGrillete"
  const grilleteSummary = tipoGrillete && typeof tipoGrillete === 'object'
    ? Object.entries(tipoGrillete)
        .filter(([diametro, cantidad]) => cantidad > 0)
        .map(([diametro, cantidad]) => `${cantidad}x${diametro}"`)
        .join(', ')
    : "";

  // Construir la data para la tabla de eslinga/estrobo
  const tableData = useMemo(() => {
    let arr = [];
    if (eslingaOEstrobo && eslingaOEstrobo.cantidades) {
      // Sumar todas las cantidades para saber el total de aparejos
      const totalAparejos = Object.values(eslingaOEstrobo.cantidades).reduce(
        (sum, qty) => sum + qty,
        0
      );
      // Si hay más de un aparejo, se espera que sea un número par.
      // Se determina la mitad.
      const mitad = totalAparejos > 1 ? totalAparejos / 2 : 0;

      Object.entries(eslingaOEstrobo.cantidades).forEach(([diametro, cantidad]) => {
        for (let i = 0; i < cantidad; i++) {
          const key = `${eslingaOEstrobo.type}-${diametro}-${i}`;
          let etiqueta = "";
          if (totalAparejos === 1) {
            etiqueta = "S1";
          } else {
            // Si ya se han agregado menos de 'mitad' filas, se asigna S1; de lo contrario, S2.
            if (arr.length < mitad) {
              etiqueta = "S1";
            } else {
              etiqueta = "S2";
            }
          }
          arr.push({
            key,
            item: `${etiqueta}: ${eslingaOEstrobo.type} de ${diametro} mm`,
            medida: medidasAparejos[key] || ''
          });
        }
      });
    }
    return arr;
  }, [eslingaOEstrobo, medidasAparejos]);

  // Función para actualizar la medida manual en el estado
  const handleChangeMedida = (index, value) => {
    const key = tableData[index].key;
    setMedidasAparejos(prev => ({ ...prev, [key]: value }));
  };

  const renderAnguloButtons = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
        onPress={() => setAnguloSeleccionado('60')}
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
          {anguloSeleccionado === '60' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#ee0000',
              }}
            />
          )}
        </View>
        <Text>60°</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
        onPress={() => setAnguloSeleccionado('45')}
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
          {anguloSeleccionado === '45' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#ee0000',
              }}
            />
          )}
        </View>
        <Text>45°</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => setAnguloSeleccionado('30')}
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
          {anguloSeleccionado === '30' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#ee0000',
              }}
            />
          )}
        </View>
        <Text>30°</Text>
      </TouchableOpacity>
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

            {/* Renderizar los botones de ángulo y la imagen condicionalmente */}
            {eslingaOEstrobo && eslingaOEstrobo.cantidades && Object.keys(eslingaOEstrobo.cantidades).length > 0 && (
              parseInt(cantidadManiobra, 10) === 2 || parseInt(cantidadManiobra, 10) === 4 ? (
                <>
                  {renderAnguloButtons()}
                  <Image
                    source={require('../../assets/esl-est-grade.png')}
                    style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 10 }}
                  />
                </>
              ) : null
            )}

            {/* Tabla para eslinga/estrobo con campos editables */}
            {eslingaOEstrobo && eslingaOEstrobo.cantidades && Object.keys(eslingaOEstrobo.cantidades).length > 0 && (
              <>
                <Components.Tabla
                  titulo="Medidas"
                  data={tableData}
                  editable={true}
                  onChangeMedida={handleChangeMedida}
                  style={{ marginTop: 0 }}
                />
              </>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Grillete: (cantidad)</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                placeholder="Cantidad"
                editable={false} // Deshabilitar la edición manual
                showControls={false} // Ocultar los controles de incremento/decremento
                showClearButton={false} // Ocultar el botón de limpiar
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                width={150}
                disabled={!cantidadGrilletes} // Deshabilitar si no hay cantidad de grilletes
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
              isVisible={isGrilleteModalVisible}
              onClose={() => setGrilleteModalVisible(false)}
              onSelect={setTipoGrillete}
              maxGrilletes={parseInt(cantidadGrilletes, 10)}
            />
            <BS.BSCantidad
              isVisible={isCantidadModalVisible}
              onClose={() => setCantidadModalVisible(false)}
              onSelect={setCantidadManiobra}
            />
            <BS.BSManiobra
              isVisible={isManiobraModalVisible}
              onClose={() => setManiobraModalVisible(false)}
              onSelect={setEslingaOEstrobo}
              maxManiobra={parseInt(cantidadManiobra, 10)}
            />
            <View style={[styles.buttonContainer, { top: 10, right: 40 }]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label="Continuar"
                onPress={handleNavigateToSetupRadio}
                style={[styles.button, { width: '50%', right: 45 }]}
                disabled={!cantidadGrilletes || Object.keys(tipoGrillete).length === 0} // Deshabilitar si no hay grilletes o tipo
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;