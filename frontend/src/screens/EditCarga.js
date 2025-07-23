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
    // Recibe los objetos de cargas y centro de gravedad, y el callback
    const { cargas: initialCargas, centroGravedad: initialCG, onSaveCargasAndCG, planData } = route.params;

    // Estados para los campos de entrada individuales, replicando SetupCarga.js
    const [peso, setPeso] = useState('');
    const [ancho, setAncho] = useState('');
    const [largo, setLargo] = useState('');
    const [altura, setAltura] = useState('');
    const [diametro, setDiametro] = useState('');
    const [forma, setForma] = useState('');
    const [isFormaVisible, setIsFormaVisible] = useState(false);
    const [errors, setErrors] = useState({});

    // Mantener editableCargas y editableCG para otros campos y para el guardado final
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

    // Rellenar estados con los datos iniciales al montar el componente
    useEffect(() => {
        if (initialCargas) {
            setPeso(String(initialCargas.pesoTotal));
            setEditableCargas(initialCargas);
        }
        if (initialCG) {
            // Establecer las dimensiones iniciales para los campos de entrada
            setAncho(String(initialCG.xAncho));
            setLargo(String(initialCG.yLargo));
            setAltura(String(initialCG.zAlto));

            // Intentar determinar la forma basada en las dimensiones iniciales
            if (initialCG.xAncho !== 0 && initialCG.xAncho === initialCG.yLargo && initialCG.yLargo === initialCG.zAlto) {
                setForma('Cuadrado');
            } else if (initialCG.xAncho !== 0 && initialCG.xAncho === initialCG.yLargo && initialCG.zAlto !== 0) {
                setForma('Cilindro');
                setDiametro(String(initialCG.xAncho)); // El diámetro es xAncho/yLargo para un cilindro
            } else if (initialCG.xAncho !== 0 || initialCG.yLargo !== 0 || initialCG.zAlto !== 0) {
                setForma('Rectangular');
            }
            setEditableCG(initialCG);
        }
    }, [initialCargas, initialCG]);

    // Maneja los cambios para los campos de entrada específicos y actualiza los objetos editables
    const handleInputChange = (field, value) => {
        // Actualizar el estado del campo de entrada específico
        if (field === 'peso') setPeso(value);
        if (field === 'ancho') setAncho(value);
        if (field === 'largo') setLargo(value);
        if (field === 'alto') setAltura(value);
        if (field === 'diametro') setDiametro(value);
        if (field === 'forma') {
            setForma(value);
            // Restablecer dimensiones si la forma cambia
            if (value === 'Cuadrado') {
                setAncho('');
                setLargo('');
                setDiametro('');
            } else if (value === 'Cilindro') {
                setAncho('');
                setLargo('');
            } else { // Rectangular
                setDiametro('');
            }
        }

        // Limpiar el error para el campo cambiado
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
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);
        const largoNum = parseFloat(largo);
        const anchoNum = parseFloat(ancho);
        const diametroNum = parseFloat(diametro);

        let cargaDataForGeometry = { // Este objeto contiene los valores de entrada actuales para el cálculo de la geometría
            peso: pesoNum,
            alto: alturaNum,
            largo: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : largoNum),
            ancho: forma === 'Cuadrado' ? alturaNum : (forma === 'Cilindro' ? 0 : anchoNum),
            diametro: forma === 'Cilindro' ? diametroNum : 0,
            forma: forma,
        };

        const navigateAndSave = (finalCargaData) => {
            if (validateInputs()) {
                const calculatedGeometry = calculateGeometry(
                    finalCargaData.forma,
                    finalCargaData.alto,
                    finalCargaData.forma === 'Cilindro' ? finalCargaData.diametro : finalCargaData.largo,
                    finalCargaData.ancho
                );
                const calculatedCG = calculatedGeometry?.cg;

                // Preparar updatedCargas y updatedCG para el callback y la navegación
                const updatedCargas = {
                    ...editableCargas, // Mantener campos existentes no editados en esta UI
                    pesoTotal: finalCargaData.peso, // Actualizar pesoTotal desde la entrada
                };

                const updatedCG = {
                    ...editableCG, // Mantener campos existentes como xPR, yPR, zPR
                    xAncho: finalCargaData.forma === 'Cilindro' ? finalCargaData.diametro : finalCargaData.ancho,
                    yLargo: finalCargaData.forma === 'Cilindro' ? finalCargaData.diametro : finalCargaData.largo,
                    zAlto: finalCargaData.alto,
                    xCG: calculatedCG.cgX,
                    yCG: calculatedCG.cgY,
                    zCG: calculatedCG.cgZ,
                };

                // Llamar al callback pasado desde EditPlan.js con los datos actualizados
                if (onSaveCargasAndCG) {
                    onSaveCargasAndCG(updatedCargas, updatedCG);
                }

                // Navegar a EditGrua, pasando los datos actualizados
                // Se asume que EditGrua espera 'cargas' y 'centroGravedad' directamente,
                // y también se pasa 'planData' si existe, para mantener la coherencia con SetupCarga.js
                navigation.navigate('EditGrua', { planData: planData, cargas: updatedCargas, centroGravedad: updatedCG });
            }
        };

        if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
            Alert.alert(
                "Dimensiones de un cubo detectadas",
                "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
                [
                    {
                        text: "No",
                        onPress: () => navigateAndSave(cargaDataForGeometry), // Usar datos actuales
                        style: "cancel"
                    },
                    {
                        text: "Sí",
                        onPress: () => {
                            const updatedCargaDataForGeometry = {
                                ...cargaDataForGeometry,
                                forma: "Cuadrado",
                                largo: alturaNum, // Lado del cubo
                                ancho: alturaNum, // Lado del cubo
                                diametro: 0,
                            };
                            setForma("Cuadrado");
                            setLargo(String(alturaNum));
                            setAncho(String(alturaNum));
                            setDiametro('0'); // Asegurarse de que el diámetro se reinicie
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
                {/* Encabezado replicado de SetupCarga.js */}
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
                                            <Text>Eje Z: D1: {d1z.toFixed(1)} | D2: {d2z.toFixed(1)}</Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        )}
                        <View style={[styles.visualizationCargaContainer, { marginBottom: 40, marginTop: 20 }]}>
                            <RenderForma
                                forma={forma}
                                dimensiones={{
                                    largo: forma === 'Cilindro' ? diametro : largo,
                                    ancho: forma === 'Cilindro' ? diametro : ancho,
                                    profundidad: altura,
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

                {/* Contenedor de botones inferior replicado de SetupCarga.js */}
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