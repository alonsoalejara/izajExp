import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import { validateSetupAparejos } from '../utils/validation/validateAparejos';

// Importa los datos de los grilletes y maniobras
import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

const EditAparejos = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Capturamos todos los datos iniciales que vienen por la ruta
    const { planData: initialPlanData, cargas: initialCargaData, gruaData: initialGruaData, radioData: initialRadioData } = route.params;

    // Inicializamos los estados con los datos iniciales para asegurar su persistencia
    const [planData, setPlanData] = useState(initialPlanData || {});
    const [setupGruaData, setSetupGruaData] = useState(initialGruaData || {});
    const [setupCargaData, setSetupCargaData] = useState(initialCargaData || {});
    const [setupRadioData, setSetupRadioData] = useState(initialRadioData || {}); // Asegurar que setupRadioData también se inicialice

    const [maniobraSeleccionada, setManiobraSeleccionada] = useState({ cantidad: '', tipo: null, cantidades: {} });
    const [cantidadGrilletes, setCantidadGrilletes] = useState('');
    const [tipoGrillete, setTipoGrillete] = useState('');
    const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
    const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
    const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
    const [isTipoAparejoModalVisible, setTipoAparejoModalVisible] = useState(false);
    const [anguloSeleccionado, setAnguloSeleccionado] = useState('0');
    const [tipoAparejoSeleccionado, setTipoAparejoSeleccionado] = useState('');
    const [tipoAparejoLabel, setTipoAparejoLabel] = useState('Selección del tipo de aparejo:');
    const [tipoManiobraSeleccionadoSolo, setTipoManiobraSeleccionadoSolo] = useState('');
    const [tipoWllLabel, setTipoWllLabel] = useState('Selección del aparejo según WLL:');
    const [aparejoPorWLL, setAparejoPorWLL] = useState('');
    const [isAparejoWLLModalVisible, setAparejoWLLModalVisible] = useState(false);
    const cantidadNumero = parseInt(maniobraSeleccionada.cantidad, 10) || 0;
    const [tableData, setTableData] = useState([]);
    const grilleteSummary = tipoGrillete ? `${tipoGrillete}"` : '';
    const openModal = setter => setter(true);

    const [errorCantidadManiobra, setErrorCantidadManiobra] = useState('');
    const [errorTipoManiobra, setErrorTipoManiobra] = useState('');
    const [errorCantidadGrilletes, setErrorCantidadGrilletes] = useState('');
    const [errorTipoGrillete, setErrorTipoGrillete] = useState('');
    const [errorTipoAparejo, setErrorTipoAparejo] = useState('');
    const [errorAparejoPorWLL, setErrorAparejoPorWLL] = useState('');
    const [errorAnguloSeleccionado, setErrorAnguloSeleccionado] = useState('');

    useEffect(() => {
        // Poblar los estados con los datos existentes de planData.aparejos si los hay
        if (initialPlanData?.aparejos && initialPlanData.aparejos.length > 0) {
            const firstAparejo = initialPlanData.aparejos[0];
            setManiobraSeleccionada(prev => ({
                ...prev,
                cantidad: String(firstAparejo.cantidad || ''),
                tipo: { type: firstAparejo.descripcion || '', cantidades: {} }
            }));
            setCantidadGrilletes(String(firstAparejo.cantidad || ''));
            setTipoGrillete(firstAparejo.grillete || '');
            setTipoAparejoSeleccionado(firstAparejo.descripcion || '');
            setAparejoPorWLL(''); 
            setTipoManiobraSeleccionadoSolo(firstAparejo.descripcion || '');
        }

        // Setear anguloSeleccionado desde initialCargaData
        if (initialCargaData?.anguloTrabajo) {
            setAnguloSeleccionado(String(parseFloat(initialCargaData.anguloTrabajo.replace('°', '')) || 0));
        } else {
            setAnguloSeleccionado('0');
        }

    }, [initialPlanData, initialCargaData, initialGruaData, initialRadioData]); // Asegurar que todos los datos iniciales sean dependencias

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            try {
                const data = await AsyncStorage.getItem('setupGruaData');
                if (data) {
                    if (!route.params?.gruaData) {
                        setSetupGruaData(JSON.parse(data));
                    }
                }
            } catch (e) {
                console.error("Error al cargar setupGruaData de AsyncStorage:", e);
            }
        };
        fetchDataFromAsyncStorage();
    }, [route.params?.gruaData]);

    // Asegurarse de que setupCargaData se actualice si cambia initialCargaData
    useEffect(() => {
        if (initialCargaData) {
            setSetupCargaData(initialCargaData);
        }
    }, [initialCargaData]);
    
    // Asegurarse de que setupRadioData se actualice si cambia initialRadioData
    useEffect(() => {
        if (initialRadioData) {
            setSetupRadioData(initialRadioData);
        }
    }, [initialRadioData]);


    useEffect(() => {
        if (tipoManiobraSeleccionadoSolo === 'Eslinga') {
            setTipoAparejoLabel('Selección del tipo de eslinga:');
            setTipoWllLabel('Selección de eslinga según WLL:');
        } else if (tipoManiobraSeleccionadoSolo === 'Estrobo') {
            setTipoAparejoLabel('Selección del tipo de estrobo:');
            setTipoWllLabel('Selección de estrobo según WLL:');
        } else {
            setTipoAparejoLabel('Selección del tipo de aparejo:');
            setTipoWllLabel('Selección del aparejo según WLL:');
        }
        setTipoAparejoSeleccionado('');
        setAparejoPorWLL('');
    }, [tipoManiobraSeleccionadoSolo]);

    useEffect(() => {
        setAparejoPorWLL('');
    }, [tipoAparejoSeleccionado]);

    useEffect(() => {
        if (!maniobraSeleccionada?.cantidad) {
            setTableData([]);
            return;
        }
        const nuevaTabla = Array.from({ length: maniobraSeleccionada.cantidad }, (_, index) => ({ key: index + 1 }));
        setTableData(nuevaTabla);
    }, [maniobraSeleccionada?.cantidad]);

    useEffect(() => {
        setCantidadGrilletes(maniobraSeleccionada.cantidad || '');
    }, [maniobraSeleccionada.cantidad]);

    const handleManiobraSeleccionada = useCallback((maniobra) => {
        setManiobraSeleccionada(prev => ({ cantidad: prev?.cantidad || '', tipo: { type: maniobra.type, cantidades: maniobra.cantidades } }));
        setTipoManiobraSeleccionadoSolo(maniobra.type);
        setErrorTipoManiobra('');
    }, []);

    const handleSaveAndGoBack = () => {
        const errors = validateSetupAparejos(
            maniobraSeleccionada,
            cantidadGrilletes,
            tipoGrillete,
            tipoAparejoSeleccionado,
            aparejoPorWLL,
            anguloSeleccionado
        );

        setErrorCantidadManiobra(errors.cantidadManiobra || '');
        setErrorTipoManiobra(errors.tipoManiobra || '');
        setErrorCantidadGrilletes(errors.cantidadGrilletes || '');
        setErrorTipoGrillete(errors.tipoGrillete || '');
        setErrorTipoAparejo(errors.tipoAparejo || '');
        setErrorAparejoPorWLL(errors.aparejoPorWLL || '');
        setErrorAnguloSeleccionado(errors.anguloSeleccionado || '');

        if (Object.keys(errors).length === 0) {
            const selectedGrillete = grilleteOptions.find(opt => opt.pulgada === tipoGrillete);
            const pesoGrilleteCalculado = selectedGrillete ? selectedGrillete.peso : 0;
            const selectedManiobraType = maniobraOptions.find(opt => opt.label === tipoManiobraSeleccionadoSolo);
            const pesoUnitarioAparejo = selectedManiobraType ? selectedManiobraType.peso : 0;
            const cantidad = parseInt(maniobraSeleccionada.cantidad, 10) || 0;

            // --- INICIO DE LA CORRECCIÓN ---
            // Creamos un array vacío para guardar todos los aparejos.
            const aparejosList = [];

            // Iteramos tantas veces como la cantidad de maniobras seleccionada.
            for (let i = 0; i < cantidad; i++) {
                // Dentro del bucle, creamos un objeto aparejo para cada iteración.
                const newAparejo = {
                    descripcion: tipoAparejoSeleccionado,
                    cantidad: 1, // La cantidad de cada item individual es 1.
                    pesoUnitario: pesoUnitarioAparejo,
                    largo: 0,
                    grillete: tipoGrillete,
                    pesoGrillete: pesoGrilleteCalculado,
                    tension: '0', 
                    altura: '',
                };
                aparejosList.push(newAparejo);
            }
            // --- FIN DE LA CORRECCIÓN ---

            const updatedSetupCargaData = { ...setupCargaData };
            updatedSetupCargaData.anguloTrabajo = anguloSeleccionado ? `${anguloSeleccionado}°` : '';

            const finalUpdatedPlanData = {
                ...planData,
                aparejos: aparejosList, // Ahora usamos la lista de aparejos creada en el bucle.
                cargas: updatedSetupCargaData,
                gruaData: setupGruaData,
                radioData: setupRadioData,
            };

            Alert.alert("Éxito", "Datos actualizados correctamente.");
            navigation.navigate('EditPlan', { planData: finalUpdatedPlanData });
        } else {
            Alert.alert("Error de validación", "Por favor, complete todos los campos requeridos.");
        }
    };

    const isSaveDisabled =
        !maniobraSeleccionada?.cantidad ||
        !maniobraSeleccionada?.tipo?.type ||
        !tipoGrillete ||
        !tipoAparejoSeleccionado ||
        !aparejoPorWLL ||
        (['2', '4'].includes(maniobraSeleccionada?.cantidad) && !anguloSeleccionado);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Components.Header />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.titleContainer}><Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>Configuración de aparejos</Text></View>
                    <View style={styles.container}>
                        <View style={styles.inputWrapper}><Text style={styles.labelText}>Maniobra (cantidad y tipo de aparejos):</Text></View>
                        <View style={styles.inputContainer}>
                            <Components.ConfigButton
                                label="Cantidad"
                                value={maniobraSeleccionada.cantidad || ''}
                                onPress={() => openModal(setCantidadModalVisible)}
                                placeholder="Maniobras"
                                width={165}
                                style={errorCantidadManiobra ? { borderColor: 'red', borderWidth: 1 } : {}}
                            />
                            <Components.ConfigButton
                                label="Tipo"
                                value={maniobraSeleccionada.tipo?.type || ''}
                                onPress={() => openModal(setManiobraModalVisible)}
                                placeholder="Esl./Estr."
                                disabled={!maniobraSeleccionada.cantidad}
                                width={160}
                                style={errorTipoManiobra ? { borderColor: 'red', borderWidth: 1 } : {}}
                            />
                        </View>
                        {errorCantidadManiobra ? <Text style={[styles.errorText, { top: 5 }]}>{errorCantidadManiobra}</Text> : null}
                        {errorTipoManiobra ? <Text style={[styles.errorText, { top: 5 }]}>{errorTipoManiobra}</Text> : null}

                        {maniobraSeleccionada.tipo?.type && ['2', '4'].includes(maniobraSeleccionada.cantidad) && (
                            <View>
                                <View style={[styles.inputWrapper, { top: -5 }]}>
                                    <Text style={styles.labelText}>Ángulos de trabajo (°):</Text>
                                </View>
                                <Components.RenderAngulos anguloSeleccionado={anguloSeleccionado} setAnguloSeleccionado={setAnguloSeleccionado} />
                                {errorAnguloSeleccionado ? <Text style={[styles.errorText, { top: 3 }]}>{errorAnguloSeleccionado}</Text> : null}
                                <Image
                                    source={require('../../assets/esl-est-grade.png')}
                                    style={styles.eslingaImage}
                                />
                            </View>
                        )}

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
                            style={[styles.configButton, errorTipoAparejo ? { borderColor: 'red', borderWidth: 1 } : {}]}
                            disabled={!tipoManiobraSeleccionadoSolo}
                        />
                        {errorTipoAparejo ? <Text style={[styles.errorText, { top: 3 }]}>{errorTipoAparejo}</Text> : null}

                        <View style={styles.inputWrapper}>
                            <Text style={styles.labelText}>{tipoWllLabel}</Text>
                        </View>
                        <Components.ConfigButton
                            label="Aparejo WLL"
                            value={aparejoPorWLL}
                            onPress={() => openModal(setAparejoWLLModalVisible)}
                            placeholder="Seleccione por WLL"
                            width="101%"
                            align="center"
                            style={[styles.configButton, errorAparejoPorWLL ? { borderColor: 'red', borderWidth: 1 } : {}]}
                            disabled={!tipoAparejoSeleccionado}
                        />
                        {errorAparejoPorWLL ? <Text style={[styles.errorText, { top: 3 }]}>{errorAparejoPorWLL}</Text> : null}

                        <View style={[styles.inputWrapper, { top: 25 }]}>
                            <Text style={styles.labelText}>Grillete: (cantidad y tipo)</Text>
                        </View>
                        <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                            <Components.NumericInput
                                label="Cantidad"
                                value={cantidadGrilletes}
                                placeholder="Cantidad"
                                editable={false}
                                style={[styles.grilleteCantidadInput, errorCantidadGrilletes ? { borderColor: 'red', borderWidth: 1 } : {}]}
                                showControls={false}
                                showClearButton={false}
                            />
                            <Components.ConfigButton
                                label="Grillete"
                                value={grilleteSummary}
                                onPress={() => openModal(setGrilleteModalVisible)}
                                placeholder="Tipo Grillete"
                                style={[styles.grilleteTipoButton, errorTipoGrillete ? { borderColor: 'red', borderWidth: 1 } : {}]}
                                disabled={!cantidadGrilletes}
                            />
                        </View>
                        {errorCantidadGrilletes ? <Text style={[styles.errorText, { top: 3 }]}>{errorCantidadGrilletes}</Text> : null}
                        {errorTipoGrillete ? <Text style={[styles.errorText, { top: 3 }]}>{errorTipoGrillete}</Text> : null}

                        {tipoGrillete && (
                            <View style={styles.selectedManiobraContainer}>
                                <Text style={styles.selectedManiobraText}>{`${cantidadGrilletes} grillete(s) de ${tipoGrillete}"`}</Text>
                            </View>
                        )}

                        <BS.BSGrillete
                            isVisible={isGrilleteModalVisible}
                            onClose={() => setGrilleteModalVisible(false)}
                            onSelect={setTipoGrillete}
                        />
                        <BS.BSCantidad
                            isVisible={isCantidadModalVisible}
                            onClose={() => setCantidadModalVisible(false)}
                            onSelect={cantidad => {
                                setManiobraSeleccionada(prev => ({ ...prev, cantidad: cantidad.toString() }));
                                setCantidadGrilletes(cantidad.toString());
                                setErrorCantidadManiobra('');
                            }}
                        />
                        <BS.BSManiobra
                            isVisible={isManiobraModalVisible}
                            onClose={() => setManiobraModalVisible(false)}
                            onSelect={handleManiobraSeleccionada}
                            maxManiobra={parseInt(maniobraSeleccionada.cantidad, 10)}
                        />
                        <BS.BSTipoManiobra
                            isVisible={isTipoAparejoModalVisible}
                            onClose={() => setTipoAparejoModalVisible(false)}
                            onSelect={tipo => {
                                setTipoAparejoSeleccionado(tipo);
                                setErrorTipoAparejo('');
                            }}
                            tipoManiobra={tipoManiobraSeleccionadoSolo}
                            cantidadManiobra={cantidadNumero}
                        />
                        <BS.BSWLL
                            isVisible={isAparejoWLLModalVisible}
                            onClose={() => setAparejoWLLModalVisible(false)}
                            onSelect={wll => {
                                setAparejoPorWLL(wll);
                                setErrorAparejoPorWLL('');
                            }}
                            tipoAparejo={tipoAparejoSeleccionado}
                            anguloSeleccionado={anguloSeleccionado}
                            pesoCarga={setupCargaData?.peso || null}
                        />

                        <View style={[styles.buttonContainer, { marginBottom: -20, right: 40 }]}>
                            <Components.Button label="Volver" onPress={() => navigation.goBack()} isCancel style={styles.volverButton} />
                            <Components.Button
                                label="Guardar"
                                onPress={handleSaveAndGoBack}
                                disabled={isSaveDisabled}
                                style={[styles.continuarButton, { width: '60%', left: -38 }]}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditAparejos;