import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    const { cargas: initialCargas, centroGravedad: initialCG, onSaveCargasAndCG, planData, gruaId, datos } = route.params;

    const [peso, setPeso] = useState('');
    const [ancho, setAncho] = useState('');
    const [largo, setLargo] = useState('');
    const [altura, setAltura] = useState('');
    const [diametro, setDiametro] = useState('');
    const [forma, setForma] = useState('');
    const [isFormaVisible, setIsFormaVisible] = useState(false);
    const [errors, setErrors] = useState({});

    const [calculatedGeometry, setCalculatedGeometry] = useState(null);
    const [calculatedCG, setCalculatedCG] = useState(null);

    const [editableCargas, setEditableCargas] = useState(initialCargas || {
        pesoEquipo: 0,
        pesoAparejos: 0,
        pesoGancho: 0,
        pesoCable: 0,
        pesoTotal: 0,
        radioTrabajoMax: 0,
        anguloTrabajo: '',
        capacidadLevante: 0,
        porcentajeUtilizacion: 0
    });

    const [editableCG, setEditableCG] = useState(initialCG || {
        xAncho: 0,
        yLargo: 0,
        zAlto: 0,
        xCG: 0,
        yCG: 0,
        zCG: 0,
        xPR: 0,
        yPR: 0,
        zPR: 0
    });

    useEffect(() => {
        if (initialCargas) {
            setPeso(String(initialCargas.pesoTotal));
            setEditableCargas(initialCargas);
        }

        let currentForma = '';
        let currentAncho = String(initialCG?.xAncho || '');
        let currentLargo = String(initialCG?.yLargo || '');
        let currentAltura = String(initialCG?.zAlto || '');
        let currentDiametro = '';

        if (initialCG) {
            if (initialCG.xAncho !== 0 || initialCG.yLargo !== 0 || initialCG.zAlto !== 0) {
                if (initialCG.xAncho === initialCG.yLargo && initialCG.yLargo === initialCG.zAlto && initialCG.xAncho !== 0) {
                    currentForma = 'Cuadrado';
                    currentDiametro = '0';
                } else if (initialCG.xAncho === initialCG.yLargo && initialCG.zAlto !== 0 && initialCG.xAncho !== 0) {
                    currentForma = 'Cilindro';
                    currentDiametro = String(initialCG.xAncho);
                } else {
                    currentForma = 'Rectangular';
                    currentDiametro = '0';
                }
            } else if (initialCG.xAncho === 0 && initialCG.yLargo === 0 && initialCG.zAlto === 0) {
                currentForma = 'Rectangular';
            }

            setAncho(currentAncho);
            setLargo(currentLargo);
            setAltura(currentAltura);
            setDiametro(currentDiametro);
            setForma(currentForma);
            setEditableCG(initialCG);

            const parsedAltura = parseFloat(currentAltura) || 0;
            const parsedLargo = parseFloat(currentLargo) || 0;
            const parsedAncho = parseFloat(currentAncho) || 0;
            const parsedDiametro = parseFloat(currentDiametro) || 0;

            if (currentForma) {
                const tempGeometry = calculateGeometry(
                    currentForma,
                    parsedAltura,
                    currentForma === 'Cilindro' ? parsedDiametro : parsedLargo,
                    currentForma === 'Cilindro' ? parsedDiametro : parsedAncho
                );
                setCalculatedGeometry(tempGeometry);
                setCalculatedCG(tempGeometry?.cg);
            }
        }
    }, [initialCargas, initialCG]);

    useEffect(() => {
        const currentAltura = parseFloat(altura) || 0;
        const currentLargo = parseFloat(largo) || 0;
        const currentAncho = parseFloat(ancho) || 0;
        const currentDiametro = parseFloat(diametro) || 0;

        if (forma) {
            const geometry = calculateGeometry(
                forma,
                currentAltura,
                forma === 'Cilindro' ? currentDiametro : currentLargo,
                forma === 'Cilindro' ? currentDiametro : currentAncho
            );
            setCalculatedGeometry(geometry);
            setCalculatedCG(geometry?.cg);
        } else {
            setCalculatedGeometry(null);
            setCalculatedCG(null);
        }
    }, [forma, altura, largo, ancho, diametro]);


    const handleInputChange = (field, value) => {
        if (field === 'peso') setPeso(value);
        if (field === 'ancho') setAncho(value);
        if (field === 'largo') setLargo(value);
        if (field === 'alto') setAltura(value);
        if (field === 'diametro') setDiametro(value);
        if (field === 'forma') {
            setForma(value);
            if (value === 'Cuadrado') {
                setAncho('');
                setLargo('');
                setDiametro('');
            } else if (value === 'Cilindro') {
                setAncho('');
                setLargo('');
            } else {
                setDiametro('');
            }
        }

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

    const handleSaveChanges = () => {
        const pesoNum = parseFloat(peso) || 0;
        const alturaNum = parseFloat(altura) || 0;
        const largoNum = parseFloat(largo) || 0;
        const anchoNum = parseFloat(ancho) || 0;
        const diametroNum = parseFloat(diametro) || 0;

        let cargaDataForGeometry = {
            peso: pesoNum,
            alto: alturaNum,
            largo: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : largoNum),
            ancho: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : anchoNum),
            diametro: forma === 'Cilindro' ? diametroNum : 0,
            forma: forma,
        };

        const navigateAndSave = (finalCargaData) => {
            if (validateInputs()) {
                const finalCalculatedCG = calculatedCG;
                const finalCalculatedGeometry = calculatedGeometry;

                if (!finalCalculatedCG || !finalCalculatedGeometry) {
                    Alert.alert("Error", "Los datos de geometría y centro de gravedad no están definidos. Por favor, revise las dimensiones.");
                    return;
                }

                const updatedCargas = {
                    ...editableCargas,
                    pesoTotal: finalCargaData.peso,
                };

                const updatedCG = {
                    ...editableCG,
                    xAncho: finalCargaData.forma === 'Cilindro' ? finalCargaData.diametro : finalCargaData.ancho,
                    yLargo: finalCargaData.forma === 'Cilindro' ? finalCargaData.diametro : finalCargaData.largo,
                    zAlto: finalCargaData.alto,
                    xCG: finalCalculatedCG.cgX,
                    yCG: finalCalculatedCG.cgY,
                    zCG: finalCalculatedCG.cgZ,
                };

                if (onSaveCargasAndCG) {
                    onSaveCargasAndCG(updatedCargas, updatedCG);
                }

                navigation.navigate('EditGrua', {
                    planData: planData,
                    cargas: updatedCargas,
                    centroGravedad: updatedCG,
                    gruaId: gruaId,
                    datos: datos,
                });
            }
        };

        if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
            Alert.alert(
                "Dimensiones de un cubo detectadas",
                "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
                [
                    {
                        text: "No",
                        onPress: () => navigateAndSave(cargaDataForGeometry),
                        style: "cancel"
                    },
                    {
                        text: "Sí",
                        onPress: () => {
                            const updatedCargaDataForGeometry = {
                                ...cargaDataForGeometry,
                                forma: "Cuadrado",
                                largo: alturaNum,
                                ancho: alturaNum,
                                diametro: 0,
                            };
                            setForma("Cuadrado");
                            setLargo(String(alturaNum));
                            setAncho(String(alturaNum));
                            setDiametro('0');
                            navigateAndSave(updatedCargaDataForGeometry);
                        }
                    }
                ]
            );
        } else {
            navigateAndSave(cargaDataForGeometry);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const altoLabel = forma === 'Cilindro' ? 'altura' : forma === 'Cuadrado' ? 'lado' : 'alto';
    const cg = calculatedCG;
    const { d1x, d2x, d1y, d2y, d1z, d2z } = calculatedGeometry?.dimensions || { d1x: 0, d2x: 0, d1y: 0, d2y: 0, d1z: 0, d2z: 0 };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Components.Header />

                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.sectionTitle, { top: 5 }]}>Editar carga</Text>
                        </View>
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
                                    onEndEditing={() => handleInputChange('peso', peso.trim())}
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
                                    onEndEditing={() => handleInputChange('alto', altura.trim())}
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
                                            onEndEditing={() => handleInputChange('largo', largo.trim())}
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
                                            onEndEditing={() => handleInputChange('ancho', ancho.trim())}
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
                                    onEndEditing={() => handleInputChange('diametro', diametro.trim())}
                                    editable={!!forma}
                                    style={[{ width: 320 }, errors.diametro && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                                />
                            </View>
                        )}
                        {calculatedGeometry && calculatedCG && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Centro de gravedad:</Text>
                                        <Text>
                                            X: {calculatedCG.cgX.toFixed(1)} | Y: {calculatedCG.cgY.toFixed(1)} | Z: {calculatedCG.cgZ.toFixed(1)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Dimensiones:</Text>
                                    {forma === 'Cilindro' ? (
                                        <>
                                            <Text>Eje X/Y: D1: {calculatedGeometry.dimensions.d1x.toFixed(1)} | D2: {calculatedGeometry.dimensions.d2x.toFixed(1)}</Text>
                                            <Text>Eje Z: D1: {calculatedGeometry.dimensions.d1z.toFixed(1)} | D2: {calculatedGeometry.dimensions.d2z.toFixed(1)}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text>Eje X: D1: {calculatedGeometry.dimensions.d1x.toFixed(1)} | D2: {calculatedGeometry.dimensions.d2x.toFixed(1)}</Text>
                                            <Text>Eje Y: D1: {calculatedGeometry.dimensions.d1y.toFixed(1)} | D2: {calculatedGeometry.dimensions.d2y.toFixed(1)}</Text>
                                            <Text>Eje Z: D1: {calculatedGeometry.dimensions.d1z.toFixed(1)} | D2: {calculatedGeometry.dimensions.d2z.toFixed(1)}</Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        )}
                        <View style={[styles.visualizationCargaContainer, { marginBottom: 40, marginTop: 20 }]}>
                            <RenderForma
                                forma={forma}
                                dimensiones={{
                                    largo: parseFloat(forma === 'Cilindro' ? diametro : largo) || 0,
                                    ancho: parseFloat(forma === 'Cilindro' ? diametro : ancho) || 0,
                                    profundidad: parseFloat(altura) || 0,
                                }}
                            />
                        </View>
                        {forma !== '' && (
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', top: -30 }}>
                                Visualización de la carga de lado y de frente:
                            </Text>
                        )}
                        <RenderCG forma={forma} />
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

                <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
                    <Components.Button
                        label="Volver"
                        onPress={handleGoBack}
                        isCancel
                        style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
                    />
                    <Components.Button
                        label="Guardar y continuar"
                        onPress={handleSaveChanges}
                        style={[
                            styles.button,
                            { width: '50%', right: 45 },
                        ]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditCarga;
