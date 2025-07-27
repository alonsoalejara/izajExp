import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import GruaIllustration from '../components/cranes/UI/GruaIllustration';
import RenderGrid from '../utils/render/renderGrid';
import { getGridContainerStyle } from '../utils/gridStyles';
import { getGruaIllustrationStyle } from '../utils/gruaStyles';
import { getAlturaType } from '../logic/alturaLogic';
import { validateSetupGrua } from '../utils/validation/validationCrane';
import { inclinacionMapAlturas } from '../utils/inclinacionMapAlturas';
import { evaluateMovement, capacityTables } from '../data/loadCapacity';
import getApiUrl from '../utils/apiUrl';

const EditGrua = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { gruaId, datos: initialDatosGrua, planData, cargas } = route.params;

    const [currentPlanData, setCurrentPlanData] = useState(planData || {});
    const [currentCargaData, setCurrentCargaData] = useState(cargas || {});

    const [isGruaModalVisible, setGruaModalVisible] = useState(false);
    const [isLargoPlumaModalVisible, setLargoPlumaModalVisible] = useState(false);
    const [grua, setGrua] = useState(null);
    const [errorGrua, setErrorGrua] = useState('');
    const [largoPluma, setLargoPluma] = useState('');
    const [radioIzaje, setRadioIzaje] = useState('');
    const [errorRadioIzaje, setErrorRadioIzaje] = useState('');
    const [radioMontaje, setRadioMontaje] = useState('');
    const [errorRadioMontaje, setErrorRadioMontaje] = useState('');
    const [radioTrabajoMaximo, setRadioTrabajoMaximo] = useState('');
    const [gradoInclinacionVisual, setGradoInclinacionVisual] = useState(75);
    const [usuarioId, setUsuarioId] = useState(null);
    const [movementEval, setMovementEval] = useState(null);
    const [capacidadLevanteCalc, setCapacidadLevanteCalc] = useState(null);
    const [radioIzajeError, setRadioIzajeError] = useState(false);
    const [radioMontajeError, setRadioMontajeError] = useState(false);

    useEffect(() => {
        const fetchAndSetInitialData = async () => {
            const storedUsuarioId = await AsyncStorage.getItem('usuarioId');
            if (storedUsuarioId) setUsuarioId(storedUsuarioId);

            if (gruaId) {
                try {
                    const token = await AsyncStorage.getItem('accessToken');
                    const response = await fetch(getApiUrl(`grua/${gruaId}`), {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const json = await response.json();
                    if (json?.data) {
                        setGrua(json.data);
                        setLargoPluma(String(initialDatosGrua?.largoPluma || json.data.largoPluma || ''));
                        setRadioIzaje(String(initialDatosGrua?.radioIzaje || ''));
                        setRadioMontaje(String(initialDatosGrua?.radioMontaje || ''));
                    }
                } catch (error) {
                    Alert.alert("Error", "No se pudo cargar los detalles de la grúa.");
                }
            } else if (initialDatosGrua?.grua) {
                setGrua(initialDatosGrua.grua);
                setLargoPluma(String(initialDatosGrua.largoPluma || ''));
                setRadioIzaje(String(initialDatosGrua.radioIzaje || ''));
                setRadioMontaje(String(initialDatosGrua.radioMontaje || ''));
            }
        };
        fetchAndSetInitialData();
    }, [gruaId, initialDatosGrua]);

    useEffect(() => {
        const izajeVal = parseFloat(radioIzaje) || 0;
        const montajeVal = parseFloat(radioMontaje) || 0;
        const boomLengthStr = (largoPluma || '').split(' ')[0];
        const boomLengthNum = parseFloat(boomLengthStr) || 0;
        const pesoCargaVal = parseFloat(currentCargaData.pesoTotal) || 0;

        const hasGrua = !!grua;
        const hasRadioIzaje = radioIzaje !== '';
        const hasRadioMontaje = radioMontaje !== '';

        const esRadioIzajeEnRango = validateRadioEnRango(boomLengthStr, radioIzaje);
        const esRadioMontajeEnRango = validateRadioEnRango(boomLengthStr, radioMontaje);

        setErrorRadioIzaje(!esRadioIzajeEnRango && hasRadioIzaje ? 'Radio fuera de rango' : '');
        setErrorRadioMontaje(!esRadioMontajeEnRango && hasRadioMontaje ? 'Radio fuera de rango' : '');
        setRadioIzajeError(!esRadioIzajeEnRango && hasRadioIzaje);
        setRadioMontajeError(!esRadioMontajeEnRango && hasRadioMontaje);

        let movimientoOptimo = false;
        let mensajeMovimiento = '';

        if (hasGrua && hasRadioIzaje && hasRadioMontaje && esRadioIzajeEnRango && esRadioMontajeEnRango) {
            const capacidadIzaje = evaluateMovement(izajeVal, pesoCargaVal, boomLengthNum);
            const capacidadMontaje = evaluateMovement(montajeVal, pesoCargaVal, boomLengthNum);

            if (capacidadIzaje.optimum && capacidadMontaje.optimum) {
                movimientoOptimo = true;
                mensajeMovimiento = 'Movimiento óptimo';
            } else if (!capacidadIzaje.optimum) {
                mensajeMovimiento = 'Radio de izaje fuera de capacidad';
            } else if (!capacidadMontaje.optimum) {
                mensajeMovimiento = 'Radio de montaje fuera de capacidad';
            } else {
                mensajeMovimiento = 'Verificar radios y capacidad';
            }
            setMovementEval({ optimum: movimientoOptimo, message: mensajeMovimiento });

        } else if (hasGrua && (!hasRadioIzaje || !hasRadioMontaje)) {
            mensajeMovimiento = 'Ingrese ambos radios de trabajo.';
            setMovementEval({ optimum: false, message: mensajeMovimiento });
        } else if (hasGrua && (!esRadioIzajeEnRango || !esRadioMontajeEnRango) && hasRadioIzaje && hasRadioMontaje) {
            mensajeMovimiento = 'Uno o ambos radios ingresados están fuera del rango válido.';
            setMovementEval({ optimum: false, message: mensajeMovimiento });
        } else {
            setMovementEval(null);
        }

        const capInicial = esRadioIzajeEnRango && boomLengthNum ? evaluateMovement(izajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable : null;
        const capFinal = esRadioMontajeEnRango && boomLengthNum ? evaluateMovement(montajeVal, pesoCargaVal, boomLengthNum).details?.capacityAvailable : null;

        const menorCapacidad = (capInicial != null && capFinal != null)
            ? Math.min(capInicial, capFinal)
            : capInicial ?? capFinal;

        setCapacidadLevanteCalc(menorCapacidad);

        let maxRadio = 0;
        if (esRadioIzajeEnRango && esRadioMontajeEnRango) {
            maxRadio = Math.max(izajeVal, montajeVal);
            setRadioTrabajoMaximo(maxRadio.toString());
        } else {
            setRadioTrabajoMaximo('');
        }

        if (grua?.nombre === "Terex RT555") {
            const alturaType = getAlturaType(largoPluma);
            const radioEntero = String(Math.floor(maxRadio));
            const mapAlturas = inclinacionMapAlturas[alturaType] || {};
            setGradoInclinacionVisual(
                mapAlturas[radioEntero] !== undefined ? mapAlturas[radioEntero] : 75
            );
        } else {
            setGradoInclinacionVisual(75);
        }
    }, [radioIzaje, radioMontaje, grua, largoPluma, currentCargaData]);

    const validateRadioEnRango = (boomLength, radio) => {
        if (!boomLength || !capacityTables[(boomLength || '').split(' ')[0]] || !radio) {
            return false;
        }

        const radios = Object.keys(capacityTables[(boomLength || '').split(' ')[0]]).map(Number).sort((a, b) => a - b);
        const radioVal = parseFloat(radio);

        return !isNaN(radioVal) && radioVal >= radios[0] && radioVal <= radios[radios.length - 1];
    };

    const openModal = setter => setter(true);

    const handleSaveChanges = async () => {
        const errors = validateSetupGrua(grua);
        const errIz = !radioIzaje && !!grua;
        const errMont = !radioMontaje && !!grua;
        setErrorGrua(errors.grua || '');
        setErrorRadioIzaje(errIz ? 'Este campo es requerido' : '');
        setErrorRadioMontaje(errMont ? 'Este campo es requerido' : '');

        const pesoTotalCarga = parseFloat(currentCargaData?.pesoTotal) || 0;

        const dataToSend = {
            grua: grua,
            nombreGrua: grua?.nombre || '',
            largoPluma,
            gradoInclinacion: `${gradoInclinacionVisual}°`,
            radioIzaje: parseFloat(radioIzaje) || 0,
            radioMontaje: parseFloat(radioMontaje) || 0,
            radioTrabajoMaximo: parseFloat(radioTrabajoMaximo) || 0,
            usuarioId,
            contrapeso: grua?.contrapeso || 0,
            pesoEquipo: pesoTotalCarga,
            pesoGancho: 0.5,
            pesoCable: 0.3,
            capacidadLevante: capacidadLevanteCalc != null
                ? capacidadLevanteCalc.toFixed(1)
                : grua?.capacidadLevante || 0,
        };

        const allDataToSend = {
            planData: currentPlanData,
            cargas: currentCargaData,
            gruaData: dataToSend,
        };

        if (Object.keys(errors).length === 0 && !errIz && !errMont && !radioIzajeError && !radioMontajeError) {
            navigation.navigate('EditAparejos', allDataToSend);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const isInputsDisabled = !grua;
    const isContinuarDisabled = !grua || !largoPluma || !radioIzaje || !radioMontaje || radioIzajeError || radioMontajeError;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Components.Header />
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.sectionTitle, { top: 5 }]}>Editar grúa</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.labelText}>Seleccione grúa:</Text>
                            </View>
                            {errorGrua && <Text style={[styles.errorText, { marginTop: -16 }]}>{errorGrua}</Text>}
                            <Components.ConfigButton
                                label="Configurar Grúa"
                                value={grua?.nombre || ''}
                                placeholder="Seleccionar grúa"
                                onPress={() => openModal(setGruaModalVisible)}
                                style={errorGrua ? { borderColor: 'red', borderWidth: 3, borderRadius: 10 } : {}}
                            />
                            <BS.BSGrua
                                isVisible={isGruaModalVisible}
                                onClose={() => setGruaModalVisible(false)}
                                onSelect={selected => {
                                    setGrua(selected);
                                    setErrorGrua('');
                                    // Siempre establecer largoPluma si es Terex RT555, o vacío
                                    setLargoPluma(selected.nombre === 'Terex RT555' ? '10.5 m' : '');
                                    setRadioIzaje('');
                                    setRadioMontaje('');
                                    setErrorRadioIzaje('');
                                    setErrorRadioMontaje('');
                                    setRadioIzajeError(false);
                                    setRadioMontajeError(false);
                                }}
                            />

                            <View style={styles.inputWrapper}>
                                <Text style={styles.labelText}>Ingrese los siguientes datos para la maniobra:</Text>
                            </View>
                            <View style={[styles.inputContainer, { flexDirection: 'row', marginTop: -3 }]}>
                                <Components.ConfigButton
                                    label="Largo de pluma"
                                    value={largoPluma}
                                    placeholder="Largo pluma"
                                    onPress={() => openModal(setLargoPlumaModalVisible)}
                                    disabled={isInputsDisabled}
                                    style={{ height: 60, width: 330, top: 7 }}
                                />
                                <BS.BSLargoPluma
                                    isVisible={isLargoPlumaModalVisible}
                                    onClose={() => setLargoPlumaModalVisible(false)}
                                    onSelect={setLargoPluma}
                                />
                            </View>

                            <View style={[styles.inputContainer, { marginTop: 15, marginBottom: 15 }]}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Text style={styles.labelText}>Radio de izaje (m):</Text>
                                    <Components.NumericInput
                                        value={radioIzaje}
                                        onChangeText={setRadioIzaje}
                                        placeholder="Radio"
                                        editable={!isInputsDisabled}
                                        showControls={false}
                                        style={[styles.inputField, { width: 160, marginTop: 10 }, radioIzajeError && { borderColor: 'red', borderWidth: 3 }]}
                                    />
                                    {errorRadioIzaje && <Text style={styles.errorText}>{errorRadioIzaje}</Text>}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.labelText}>Radio de montaje (m):</Text>
                                    <Components.NumericInput
                                        value={radioMontaje}
                                        onChangeText={setRadioMontaje}
                                        placeholder="Radio"
                                        editable={!isInputsDisabled}
                                        showControls={false}
                                        style={[styles.inputField, { width: 160, marginTop: 10 }, radioMontajeError && { borderColor: 'red', borderWidth: 3 }]}
                                    />
                                    {errorRadioMontaje && <Text style={styles.errorText}>{errorRadioMontaje}</Text>}
                                </View>
                            </View>

                            {movementEval && (
                                <Text
                                    style={[
                                        styles.labelText,
                                        { marginLeft: 8 },
                                        !movementEval.optimum && { color: 'red' },
                                    ]}
                                >
                                    Optimal: {movementEval.message}
                                </Text>
                            )}
                            <View style={styles.inputWrapper}>
                                <Text style={[styles.labelText, { left: 8 }]}>Visualización de la grúa:</Text>
                            </View>
                            {grua ? (
                                <View style={{ width: 150, height: 39, justifyContent: 'center' }}>
                                    <Text style={[styles.labelText, { textAlign: 'center' }]}>
                                        Grado de inclinación
                                    </Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: '#333' }}>
                                            {gradoInclinacionVisual}°
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={{ width: 150 }} />
                            )}
                            <View style={styles.visualizationGruaContainer}>
                                {!grua ? (
                                    <Text style={[styles.labelText, { color: '#ccc' }]}>
                                        Debe seleccionar una grúa para visualizar.
                                    </Text>
                                ) : grua.nombre === 'Terex RT555' ? (
                                    <View style={{ flex: 1, position: 'relative' }}>
                                        <View style={getGridContainerStyle(largoPluma)}>
                                            <RenderGrid />
                                        </View>
                                        <GruaIllustration
                                            alturaType={getAlturaType(largoPluma)}
                                            inclinacion={gradoInclinacionVisual}
                                            radioTrabajoMaximo={radioTrabajoMaximo}
                                            style={getGruaIllustrationStyle(largoPluma)}
                                        />
                                    </View>
                                ) : (
                                    <Text style={styles.labelText}>No disponible</Text>
                                )}
                            </View>
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
                            disabled={isContinuarDisabled}
                            style={[
                                styles.button,
                                { width: '50%', right: 45 },
                                isContinuarDisabled && { backgroundColor: '#cccccc' },
                            ]}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditGrua;