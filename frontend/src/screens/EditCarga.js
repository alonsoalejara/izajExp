import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/render/renderForma';
import RenderCG from '../utils/render/renderCG';
import { validateCarga } from '../utils/validation/validateCarga';
import { calculateGeometry } from '../utils/calculateGeometry';

const EditCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [peso, setPeso] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [altura, setAltura] = useState('');
  const [diametro, setDiametro] = useState('');
  const [forma, setForma] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [carga, setCarga] = useState({ peso: '', largo: '', ancho: '', alto: '', forma: '' });
  const [errors, setErrors] = useState({});
  const [planData, setPlanData] = useState(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (route.params) {
      setPlanData(route.params);
      console.log('Datos de SetupPlan recibidos en EditCarga:', route.params);
      setHasUnsavedChanges(false);
    }
  }, [route.params]);

  const handleInputChange = (field, value) => {
    setCarga((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
    // Marcar que hay cambios sin guardar
    setHasUnsavedChanges(true);
  };

  const validateInputs = () => {
    const newErrors = validateCarga(peso, largo, ancho, altura, forma, diametro);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const largoNum = parseFloat(largo);
    const anchoNum = parseFloat(ancho);
    const diametroNum = parseFloat(diametro);

    let cargaData = {
      ...carga,
      peso: pesoNum,
      alto: alturaNum,
      largo: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : largoNum),
      ancho: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : anchoNum),
      diametro: forma === 'Cilindro' ? diametroNum : 0,
    };

    const navigateToNextScreen = () => {
      if (validateInputs()) {
        const allDataToSend = {
          planData: planData,
          setupCargaData: cargaData,
        };

        console.log('Datos enviados a SetupGrua.js desde EditCarga.js (incluyendo datos de Plan):', allDataToSend);

        setHasUnsavedChanges(false);
        navigation.navigate('SetupGrua', allDataToSend);
      }
    };

    if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
      Alert.alert(
        "Dimensiones de un cubo detectadas",
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          {
            text: "No",
            onPress: navigateToNextScreen,
            style: "cancel"
          },
          {
            text: "Sí",
            onPress: () => {
              setForma("Cuadrado");
              handleInputChange('forma', "Cuadrado");
              cargaData = {
                ...cargaData,
                forma: "Cuadrado",
                largo: alturaNum,
                ancho: alturaNum,
                diametro: 0,
              };
              navigateToNextScreen();
            }
          }
        ]
      );
    } else {
      navigateToNextScreen();
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

  const altoLabel = forma === 'Cilindro' ? 'altura' : forma === 'Cuadrado' ? 'lado' : 'alto';
  const geometry = calculateGeometry(
    forma,
    altura,
    forma === 'Cilindro' ? diametro : largo,
    ancho
  );
  const cg = geometry?.cg;
  const { d1x, d2x, d1y, d2y, d1z, d2z } = geometry?.dimensions || { d1x: 0, d2x: 0, d1y: 0, d2y: 0, d1z: 0, d2z: 0 };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ position: 'absolute', top: 60, left: 10, zIndex: 10 }}
        >
          <Icon name="keyboard-arrow-left" size={44} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { marginTop: 50 }]}>Editar carga</Text>
          </View>
          <View style={[styles.container, { flexGrow: 1 }]}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>
            {errors.forma && (
              <Text style={[styles.errorText, { marginTop: -17, top: 12, left: -0.4 }]}>{errors.forma}</Text>
            )}
            <Components.ConfigButton
              placeholder="Configurar Forma"
              value={forma || ''}
              onPress={() => setIsFormaVisible(true)}
              style={[{ width: 315 }, errors.forma && { borderColor: 'red', borderWidth: 3, borderRadius: 10 }]}
            />
            <Text style={styles.labelText}>
              Ingrese el peso (ton) y el {altoLabel} (m) de la carga:
            </Text>
            <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
              <View style={styles.inputField}>
                {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}
                <Components.NumericInput
                  value={peso}
                  onChangeText={(value) => {
                    setPeso(value);
                    handleInputChange('peso', value);
                  }}
                  placeholder="Peso de carga"
                  onEndEditing={() => {
                    const cleanedValue = peso.trim();
                    setPeso(cleanedValue);
                    handleInputChange('peso', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 150 }, errors.peso && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
              <View style={styles.inputField}>
                {errors.alto && <Text style={styles.errorText}>{errors.alto}</Text>}
                <Components.NumericInput
                  value={altura}
                  onChangeText={(value) => {
                    setAltura(value);
                    handleInputChange('alto', value);
                  }}
                  placeholder={altoLabel.charAt(0).toUpperCase() + altoLabel.slice(1)}
                  onEndEditing={() => {
                    const cleanedValue = altura.trim();
                    setAltura(cleanedValue);
                    handleInputChange('alto', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 150 }, errors.alto && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
            </View>
            {forma !== 'Cilindro' && forma !== 'Cuadrado' && (
              <>
                <Text style={styles.labelText}>Ingrese el largo y ancho:</Text>
                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                  <View style={styles.inputField}>
                    {errors.largo && <Text style={styles.errorText}>{errors.largo}</Text>}
                    <Components.NumericInput
                      value={largo}
                      onChangeText={(value) => {
                        setLargo(value);
                        handleInputChange('largo', value);
                      }}
                      placeholder="Largo"
                      onEndEditing={() => {
                        const cleanedValue = largo.trim();
                        setLargo(cleanedValue);
                        handleInputChange('largo', cleanedValue);
                      }}
                      editable={!!forma}
                      style={[{ width: 150 }, errors.largo && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 }]}
                    />
                  </View>
                  <View style={styles.inputField}>
                    {errors.ancho && <Text style={styles.errorText}>{errors.ancho}</Text>}
                    <Components.NumericInput
                      value={ancho}
                      onChangeText={(value) => {
                        setAncho(value);
                        handleInputChange('ancho', value);
                      }}
                      placeholder="Ancho"
                      onEndEditing={() => {
                        const cleanedValue = ancho.trim();
                        setAncho(cleanedValue);
                        handleInputChange('ancho', cleanedValue);
                      }}
                      editable={!!forma}
                      style={[{ width: 150 }, errors.ancho && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 }]}
                    />
                  </View>
                </View>
              </>
            )}
            {forma === 'Cilindro' && (
              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { top: -8 }]}>Ingrese el diámetro (m):</Text>
                {errors.diametro && <Text style={styles.errorText}>{errors.diametro}</Text>}
                <Components.NumericInput
                  value={diametro}
                  onChangeText={(value) => {
                    setDiametro(value);
                    handleInputChange('diametro', value);
                  }}
                  placeholder="Diámetro del cilindro"
                  onEndEditing={() => {
                    const cleanedValue = diametro.trim();
                    setDiametro(cleanedValue);
                    handleInputChange('diametro', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 320 }, errors.diametro && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
            )}
            {geometry && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'bold' }}>Centro de gravedad:</Text>
                    <Text>
                      X: {cg.cgX.toFixed(1)} | Y: {cg.cgY.toFixed(1)} | Z: {cg.cgZ.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
                  <Text style={{ fontWeight: 'bold' }}>Dimensiones:</Text>
                  {forma === 'Cilindro' ? (
                    <>
                      <Text>Eje X/Y: D1: {d1x.toFixed(1)} | D2: {d2x.toFixed(1)}</Text>
                      <Text>Eje Z: D1: {d1z.toFixed(1)} | D2: {d2z.toFixed(1)}</Text>
                    </>
                  ) : (
                    <>
                      <Text>Eje X: D1: {d1x.toFixed(1)} | D2: {d2x.toFixed(1)}</Text>
                      <Text>Eje Y: D1: {d1y.toFixed(1)} | D2: {d2y.toFixed(1)}</Text>
                    </>
                  )}
                </View>
              </View>
            )}
            <View style={[styles.visualizationCargaContainer, { marginBottom: 40, marginTop: 20 }]}>
              <RenderForma
                forma={carga.forma}
                dimensiones={{
                  largo: carga.largo,
                  ancho: carga.ancho,
                  profundidad: carga.alto,
                }}
              />
            </View>
            <RenderCG forma={forma} />

            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Components.Button
                label="Guardar"
                onPress={handleGuardar}
                style={{ width: '100%', paddingVertical: 15, top: -15, right: 25 }}
              />
            </View>

            <BS.BSForma
              isVisible={isFormaVisible}
              onClose={() => setIsFormaVisible(false)}
              onSelect={(selectedForma) => {
                setForma(selectedForma);
                handleInputChange('forma', selectedForma);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditCarga;