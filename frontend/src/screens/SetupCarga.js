import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/render/renderForma';
import RenderCG from '../utils/render/renderCG';
import { validateCarga } from '../utils/validation/validateCarga';
import { calculateGeometry } from '../utils/calculateGeometry';
import ViewShot from 'react-native-view-shot';
import * as ImageManipulator from 'expo-image-manipulator';

const SetupCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode = 'create', planData = {} } = route.params || {};

  const [peso, setPeso] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [altura, setAltura] = useState('');
  const [diametro, setDiametro] = useState('');
  const [forma, setForma] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [planDataState, setPlanDataState] = useState(planData);

  const viewShotRef = useRef();

  // 🔹 Precarga de datos si está en modo edición
  useEffect(() => {
    if (mode === 'edit' && planData) {
      const cargas = planData?.cargas || {};
      const cg = planData?.centroGravedad || {};

      setPeso(String(cargas.pesoEquipo || ''));
      setAltura(String(cg.zAlto || ''));
      setAncho(String(cg.xAncho || ''));
      setLargo(String(cg.yLargo || ''));
      setDiametro(String(cg.diametro || ''));

      // Detección automática de forma
      if (cg.xAncho === cg.yLargo && cg.yLargo === cg.zAlto && cg.xAncho !== 0) {
        setForma('Cuadrado');
      } else if (cg.xAncho === cg.yLargo && cg.zAlto !== cg.xAncho) {
        setForma('Cilindro');
      } else if (cg.xAncho !== cg.yLargo && cg.zAlto !== 0) {
        setForma('Rectangular');
      }
    }
  }, [mode, planData]);

  const handleInputChange = (field, value) => {
    if (field === 'peso') setPeso(value);
    if (field === 'ancho') setAncho(value);
    if (field === 'largo') setLargo(value);
    if (field === 'alto') setAltura(value);
    if (field === 'diametro') setDiametro(value);
    if (field === 'forma') setForma(value);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateInputs = () => {
    const newErrors = validateCarga(peso, largo, ancho, altura, forma, diametro);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pesoNum = parseFloat(peso) || 0;
  const alturaNum = parseFloat(altura) || 0;
  const largoNum = parseFloat(largo) || 0;
  const anchoNum = parseFloat(ancho) || 0;
  const diametroNum = parseFloat(diametro) || 0;

  const largoParaCalculo = forma === 'Cuadrado' ? alturaNum : largoNum;
  const anchoParaCalculo = forma === 'Cuadrado' ? alturaNum : anchoNum;

  const geometry = calculateGeometry(forma, alturaNum, largoParaCalculo, anchoParaCalculo, diametroNum);
  const cg = geometry?.cg;
  const isCylinderVertical = forma === 'Cilindro' && alturaNum > diametroNum;

  const handleContinuar = async () => {
    if (!validateInputs()) {
      Alert.alert('Error de validación', 'Por favor, complete todos los campos de forma correcta.');
      return;
    }

    let cargaData = {
      peso: pesoNum,
      alto: alturaNum,
      largo: largoParaCalculo,
      ancho: anchoParaCalculo,
      diametro: diametroNum,
      forma,
    };

    const navigateToNextScreen = async () => {
      try {
        if (viewShotRef.current) {
          const uri = await viewShotRef.current.capture({
            format: 'jpg',
            quality: 0.8,
            result: 'tmpfile',
          });

          const manipulated = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 600 } }],
            {
              compress: 0.6,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            }
          );

          cargaData.ilustracionCarga = `data:image/jpeg;base64,${manipulated.base64}`;
        } else {
          cargaData.ilustracionCarga = 'NoDisponible';
        }
      } catch (error) {
        console.error('Error al capturar ilustración de carga:', error);
        cargaData.ilustracionCarga = 'NoDisponible';
      }

      const updatedCargas = {
        ...planDataState.cargas,
        pesoEquipo: pesoNum,
        pesoTotal:
          pesoNum +
          (planDataState.cargas?.pesoAparejos || 0) +
          (planDataState.cargas?.pesoGancho || 0) +
          (planDataState.cargas?.pesoCable || 0),
      };

      const updatedCG = {
        ...planDataState.centroGravedad,
        xAncho: forma === 'Cilindro' ? diametroNum : anchoParaCalculo,
        yLargo: forma === 'Cilindro' ? diametroNum : largoParaCalculo,
        zAlto: alturaNum,
        xCG: cg?.cgX || 0,
        yCG: cg?.cgY || 0,
        zCG: cg?.cgZ || 0,
      };

      const finalData = {
        ...planDataState,
        cargas: updatedCargas,
        centroGravedad: updatedCG,
        forma,
        diametro: diametroNum,
      };

      navigation.navigate('SetupGrua', { 
        mode, 
        planData: finalData,
        setupCargaData: finalData.cargas
      });
    };

    if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
      Alert.alert(
        'Dimensiones de un cubo detectadas',
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          {
            text: 'No',
            onPress: async () => await navigateToNextScreen(),
            style: 'cancel',
          },
          {
            text: 'Sí',
            onPress: async () => {
              setForma('Cuadrado');
              handleInputChange('forma', 'Cuadrado');
              cargaData = {
                ...cargaData,
                forma: 'Cuadrado',
                largo: alturaNum,
                ancho: alturaNum,
                diametro: 0,
              };
              await navigateToNextScreen();
            },
          },
        ]
      );
    } else {
      await navigateToNextScreen();
    }
  };

  const altoLabel = forma === 'Cilindro' ? 'altura' : forma === 'Cuadrado' ? 'lado' : 'alto';

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5 }]}>
              {mode === 'edit' ? 'Editar carga' : 'Carga'}
            </Text>
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
                  onChangeText={(value) => handleInputChange('peso', value)}
                  placeholder="Peso de carga"
                  editable={!!forma}
                  style={[{ width: 150 }, errors.peso && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
              <View style={styles.inputField}>
                {errors.alto && <Text style={styles.errorText}>{errors.alto}</Text>}
                <Components.NumericInput
                  value={altura}
                  onChangeText={(value) => handleInputChange('alto', value)}
                  placeholder={altoLabel.charAt(0).toUpperCase() + altoLabel.slice(1)}
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
                      onChangeText={(value) => handleInputChange('largo', value)}
                      placeholder="Largo"
                      editable={!!forma}
                      style={[{ width: 150 }, errors.largo && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 }]}
                    />
                  </View>
                  <View style={styles.inputField}>
                    {errors.ancho && <Text style={styles.errorText}>{errors.ancho}</Text>}
                    <Components.NumericInput
                      value={ancho}
                      onChangeText={(value) => handleInputChange('ancho', value)}
                      placeholder="Ancho"
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
                  onChangeText={(value) => handleInputChange('diametro', value)}
                  placeholder="Diámetro del cilindro"
                  editable={!!forma}
                  style={[{ width: 320 }, errors.diametro && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
            )}

            {geometry && cg && (
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
                      <Text>{isCylinderVertical ? `Altura: ${alturaNum.toFixed(1)} m` : `Largo: ${alturaNum.toFixed(1)} m`}</Text>
                      <Text>Diámetro: {diametroNum.toFixed(1)} m</Text>
                    </>
                  ) : (
                    <>
                      <Text>Largo: {forma === 'Cuadrado' ? alturaNum.toFixed(1) : largoNum.toFixed(1)} m</Text>
                      <Text>Ancho: {forma === 'Cuadrado' ? alturaNum.toFixed(1) : anchoNum.toFixed(1)} m</Text>
                      <Text>Altura: {alturaNum.toFixed(1)} m</Text>
                    </>
                  )}
                </View>
              </View>
            )}

            <ViewShot
              ref={viewShotRef}
              options={{
                format: 'jpg',
                quality: 0.9,
                result: 'tmpfile',
              }}
            >
              <View
                style={[
                  styles.visualizationCargaContainer,
                  { marginBottom: 40, marginTop: 20, borderWidth: 0 },
                ]}
              >
                <RenderForma
                  forma={forma}
                  dimensiones={{
                    largo: isCylinderVertical ? parseFloat(diametro) : parseFloat(altura),
                    ancho: isCylinderVertical ? parseFloat(diametro) : parseFloat(diametro),
                    profundidad: isCylinderVertical ? parseFloat(altura) : parseFloat(diametro),
                  }}
                />
              </View>
            </ViewShot>

            {forma !== '' && (
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', top: -30 }}>
                Visualización de la carga de lado y de frente:
              </Text>
            )}

            <RenderCG forma={forma} isCylinderVertical={isCylinderVertical} />

            <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label={mode === 'edit' ? 'Guardar y continuar' : 'Continuar'}
                onPress={handleContinuar}
                style={[styles.button, { width: '50%', right: 45 }]}
              />
            </View>

            <BS.BSForma
              isVisible={isFormaVisible}
              onClose={() => setIsFormaVisible(false)}
              onSelect={(selectedForma) => {
                setForma(selectedForma);
                handleInputChange('forma', selectedForma);
                if (selectedForma !== 'Cilindro') {
                  setDiametro('');
                  handleInputChange('diametro', '');
                } else {
                  setLargo('');
                  setAncho('');
                  handleInputChange('largo', '');
                  handleInputChange('ancho', '');
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupCarga;
