import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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

  useEffect(() => {
    if (route.params) {
      setPlanData(route.params.planData);
      console.log('Datos recibidos en EditCarga:', route.params.planData);
    }
  }, [route.params]);

  const handleInputChange = (field, value) => {
    setCarga(prev => ({ ...prev, [field]: value }));
    setErrors(prevErrors => {
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
      forma: forma,
    };

    const geometry = calculateGeometry(
      forma,
      alturaNum,
      forma === 'Cilindro' ? diametroNum : largoNum,
      anchoNum
    );

    const cg = geometry?.cg || { cgX: 0, cgY: 0, cgZ: 0 };
    const dimensions = geometry?.dimensions || { d1x: 0, d2x: 0, d1y: 0, d2y: 0, d1z: 0, d2z: 0 };

    const navigateToEditPlan = () => {
      if (validateInputs()) {
        const updatedCargas = {
          pesoEquipo: cargaData.peso,
          pesoAparejos: 0,
          pesoGancho: 0,
          pesoCable: 0,
          pesoTotal: cargaData.peso,
          radioTrabajoMax: 0,
          anguloTrabajo: '',
          capacidadLevante: 0,
          porcentajeUtilizacion: 0
        };

        const updatedCG = {
          xAncho: dimensions.d1x,
          yLargo: dimensions.d1y,
          zAlto: dimensions.d1z,
          xCG: cg.cgX,
          yCG: cg.cgY,
          zCG: cg.cgZ,
          xPR: dimensions.d2x,
          yPR: dimensions.d2y,
          zPR: dimensions.d2z
        };

        console.log('Enviando a EditPlan desde EditCarga:', { updatedCargas, updatedCG });
        navigation.navigate('EditPlan', { updatedCargas, updatedCG });
      }
    };

    if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
      Alert.alert(
        "Dimensiones de un cubo detectadas",
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          { text: "No", onPress: navigateToEditPlan, style: "cancel" },
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
              navigateToEditPlan();
            }
          }
        ]
      );
    } else {
      navigateToEditPlan();
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5 }]}>Editar carga</Text>
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
              <Components.NumericInput
                value={peso}
                onChangeText={(value) => { setPeso(value); handleInputChange('peso', value); }}
                placeholder="Peso de carga"
                editable={!!forma}
              />
              <Components.NumericInput
                value={altura}
                onChangeText={(value) => { setAltura(value); handleInputChange('alto', value); }}
                placeholder={altoLabel.charAt(0).toUpperCase() + altoLabel.slice(1)}
                editable={!!forma}
              />
            </View>
            {forma !== 'Cilindro' && forma !== 'Cuadrado' && (
              <>
                <Text style={styles.labelText}>Ingrese el largo y ancho (m):</Text>
                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                  <Components.NumericInput
                    value={largo}
                    onChangeText={(value) => { setLargo(value); handleInputChange('largo', value); }}
                    placeholder="Largo"
                    editable={!!forma}
                  />
                  <Components.NumericInput
                    value={ancho}
                    onChangeText={(value) => { setAncho(value); handleInputChange('ancho', value); }}
                    placeholder="Ancho"
                    editable={!!forma}
                  />
                </View>
              </>
            )}
            {forma === 'Cilindro' && (
              <>
                <Text style={styles.labelText}>Ingrese el diámetro (m):</Text>
                <Components.NumericInput
                  value={diametro}
                  onChangeText={(value) => { setDiametro(value); handleInputChange('diametro', value); }}
                  placeholder="Diámetro del cilindro"
                  editable={!!forma}
                />
              </>
            )}
            {geometry && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>Centro de gravedad:</Text>
                  <Text>X: {cg.cgX.toFixed(1)} | Y: {cg.cgY.toFixed(1)} | Z: {cg.cgZ.toFixed(1)}</Text>
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
                forma={forma}
                dimensiones={{
                  largo: carga.largo,
                  ancho: carga.ancho,
                  profundidad: carga.alto,
                }}
              />
            </View>
            <RenderCG forma={forma} />
            <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
              <Components.Button
                label="Cancelar"
                onPress={() => navigation.goBack()}
                isCancel
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label="Guardar"
                onPress={handleGuardar}
                style={[styles.button, { width: '50%', right: 45 }]}
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
