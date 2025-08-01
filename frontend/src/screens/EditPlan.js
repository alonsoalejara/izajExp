import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/EditPlanStyles';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';

const EditPlan = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const initialPlanData = route.params?.planData || {};

    const parseBoomLength = (boomLengthString) => {
        if (!boomLengthString) return 0;
        const numberPart = boomLengthString.split(' ')[0];
        const parsedNumber = parseFloat(numberPart);
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    };
    
    const getFullName = (person) => {
        if (!person) return 'No asignado';
        const tieneNombre = person.nombre && person.nombre.trim() !== '';
        const tieneApellido = person.apellido && person.apellido.trim() !== '';
        if (tieneNombre && tieneApellido) {
            return `${person.nombre} ${person.apellido}`;
        }
        if (person.username && person.username.trim() !== '') {
            return person.username;
        }
        return 'No asignado';
    };

    const calculateAparejoDimensions = (plan) => {
        const { centroGravedad, aparejos } = plan;
        const anchoCarga = parseFloat(centroGravedad?.xAncho) || 0;
        const largoCarga = parseFloat(centroGravedad?.yLargo) || 0;
        const altoCarga = parseFloat(centroGravedad?.zAlto) || 0;
        const formaCarga = plan.forma || '';
        const diametroCarga = parseFloat(plan.diametro) || 0;

        const anguloEslingaStr = aparejos && aparejos.length > 0 ? aparejos[0].tension : '0°';
        const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
        const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;

        let dimensionMayorCarga = 0;
        if (formaCarga === 'Cuadrado' || formaCarga === 'Rectangulo') {
            dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
        } else if (formaCarga === 'Cilindro') {
            dimensionMayorCarga = diametroCarga;
        }

        let distanciaGanchoElemento = 'N/A';
        if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
            const ladoAdyacenteParaAltura = dimensionMayorCarga / 2;
            distanciaGanchoElemento = (Math.tan(anguloEnRadianes) * ladoAdyacenteParaAltura).toFixed(1);
        } else if (dimensionMayorCarga > 0 && anguloEnGrados === 0) {
            distanciaGanchoElemento = altoCarga.toFixed(1);
        }

        let largoAparejoCalculado = 'N/A';
        if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
            const ladoAdyacenteParaLargo = dimensionMayorCarga / 2;
            largoAparejoCalculado = (ladoAdyacenteParaLargo / Math.cos(anguloEnRadianes)).toFixed(1);
        }

        return { distanciaGanchoElemento, largoAparejoCalculado };
    };

    const calculateTotalAparejosWeight = (aparejos) => {
        return aparejos.reduce((total, aparejo) => {
            const cantidad = parseFloat(aparejo.cantidad) || 0;
            const pesoUnitario = parseFloat(aparejo.pesoUnitario) || 0;
            const pesoGrillete = parseFloat(aparejo.pesoGrillete) || 0;
            return total + (cantidad * (pesoUnitario + pesoGrillete));
        }, 0);
    };

    const [editablePlan, setEditablePlan] = useState(() => {
        const initialState = {
            nombreProyecto: initialPlanData.nombreProyecto || '',
            capataz: initialPlanData.capataz?._id || '',
            supervisor: initialPlanData.supervisor?._id || '',
            jefeArea: initialPlanData.jefeArea?._id || '',
            firmaSupervisor: initialPlanData.firmaSupervisor || null,
            firmaJefeArea: initialPlanData.firmaJefeArea || null,
            aparejos: initialPlanData.aparejos || [],
            grua: initialPlanData.grua?._id || '',
            datos: {
                largoPluma: initialPlanData.datos?.largoPluma || '',
                contrapeso: initialPlanData.datos?.contrapeso || 0,
                gradoInclinacion: initialPlanData.datos?.gradoInclinacion || ''
            },
            cargas: {
                pesoEquipo: initialPlanData.cargas?.pesoEquipo || 0,
                pesoAparejos: initialPlanData.cargas?.pesoAparejos || 0,
                pesoGancho: initialPlanData.cargas?.pesoGancho || 0.5,
                pesoCable: initialPlanData.cargas?.pesoCable || 0.3,
                pesoTotal: initialPlanData.cargas?.pesoTotal || 0,
                radioTrabajoMax: initialPlanData.cargas?.radioTrabajoMax || 0,
                anguloTrabajo: initialPlanData.cargas?.anguloTrabajo || '',
                capacidadLevante: initialPlanData.cargas?.capacidadLevante || 0,
                porcentajeUtilizacion: initialPlanData.cargas?.porcentajeUtilizacion || 0,
            },
            centroGravedad: {
                diametro: initialPlanData.centroGravedad?.diametro || 0,
                xAncho: initialPlanData.centroGravedad?.xAncho || 0,
                yLargo: initialPlanData.centroGravedad?.yLargo || 0,
                zAlto: initialPlanData.centroGravedad?.zAlto || 0,
                xCG: initialPlanData.centroGravedad?.xCG || 0,
                yCG: initialPlanData.centroGravedad?.yCG || 0,
                zCG: initialPlanData.centroGravedad?.zCG || 0,
                xPR: initialPlanData.centroGravedad?.xPR || 0,
                yPR: initialPlanData.centroGravedad?.yPR || 0,
                zPR: initialPlanData.centroGravedad?.zPR || 0
            },
            version: initialPlanData.version || 0,
            _id: initialPlanData._id || null,
        };
        return initialState;
    });

    useEffect(() => {
        if (route.params?.planData) {
            setEditablePlan(prevPlan => {
                const incomingPlanData = route.params.planData;
                
                let updatedPlanData = {
                    ...prevPlan,
                    ...incomingPlanData,
                    cargas: { ...prevPlan.cargas, ...incomingPlanData.cargas },
                    datos: { ...prevPlan.datos, ...incomingPlanData.datos },
                    centroGravedad: { ...prevPlan.centroGravedad, ...incomingPlanData.centroGravedad },
                    aparejos: incomingPlanData.aparejos || prevPlan.aparejos,
                };
                
                if (incomingPlanData.gruaData) {
                    const parsedLargoPluma = parseBoomLength(incomingPlanData.gruaData.largoPluma);
                    updatedPlanData = {
                        ...updatedPlanData,
                        grua: incomingPlanData.gruaData.grua,
                        datos: {
                            ...updatedPlanData.datos,
                            largoPluma: parsedLargoPluma,
                            contrapeso: incomingPlanData.gruaData.contrapeso,
                            gradoInclinacion: incomingPlanData.gruaData.gradoInclinacion,
                        },
                        cargas: {
                            ...updatedPlanData.cargas,
                            radioTrabajoMax: incomingPlanData.gruaData.radioTrabajoMaximo,
                            capacidadLevante: incomingPlanData.gruaData.capacidadLevante,
                            pesoGancho: incomingPlanData.gruaData.pesoGancho,
                            pesoCable: incomingPlanData.gruaData.pesoCable,
                        },
                    };
                }

                const { distanciaGanchoElemento, largoAparejoCalculado } = calculateAparejoDimensions(updatedPlanData);
                
                const alturaParaAparejos = (distanciaGanchoElemento !== 'N/A' && !isNaN(parseFloat(distanciaGanchoElemento)))
                    ? String(parseFloat(distanciaGanchoElemento))
                    : updatedPlanData.cargas.distanciaGanchoElemento || "1";

                const updatedAparejos = (updatedPlanData.aparejos || []).map(ap => {
                    const cantidad = parseFloat(ap.cantidad) || 0;
                    const pesoUnitario = parseFloat(ap.pesoUnitario) || 0;
                    const pesoGrillete = parseFloat(ap.pesoGrillete) || 0;
                    return {
                        ...ap,
                        cantidad: cantidad,
                        pesoUnitario: pesoUnitario,
                        pesoGrillete: pesoGrillete,
                        pesoTotal: cantidad * (pesoUnitario + pesoGrillete),
                        altura: alturaParaAparejos,
                        largo: largoAparejoCalculado !== 'N/A' ? parseFloat(largoAparejoCalculado) : ap.largo,
                    };
                });
                
                const newPesoAparejos = calculateTotalAparejosWeight(updatedAparejos);
                
                const newPesoTotal = parseFloat((
                    (parseFloat(updatedPlanData.cargas.pesoEquipo) || 0) + 
                    newPesoAparejos + 
                    (parseFloat(updatedPlanData.cargas.pesoGancho) || 0) + 
                    (parseFloat(updatedPlanData.cargas.pesoCable) || 0)
                ).toFixed(2));

                return {
                    ...updatedPlanData,
                    aparejos: updatedAparejos,
                    cargas: {
                        ...updatedPlanData.cargas,
                        pesoAparejos: newPesoAparejos,
                        pesoTotal: newPesoTotal,
                    }
                };
            });
        }
    }, [route.params?.planData]);

    const handleSaveChanges = async () => {
        if (!editablePlan._id) {
            Alert.alert("Error", "No se puede guardar un plan sin ID.");
            return;
        }

        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            Alert.alert("Error de autenticación", "No autorizado. Por favor, inicie sesión nuevamente.");
            return;
        }

        const pesoTotal = parseFloat(editablePlan.cargas.pesoTotal) || 0;
        const capacidadLevante = parseFloat(editablePlan.cargas.capacidadLevante) || 0;
        const porcentajeUtilizacion = capacidadLevante > 0
            ? Number(((pesoTotal / capacidadLevante) * 100).toFixed(1))
            : 0;

        const centroGravedadConPR = {
            ...editablePlan.centroGravedad,
            xPR: (editablePlan.centroGravedad.xCG / editablePlan.centroGravedad.xAncho) * 100 || 0,
            yPR: (editablePlan.centroGravedad.yCG / editablePlan.centroGravedad.yLargo) * 100 || 0,
            zPR: (editablePlan.centroGravedad.zCG / editablePlan.centroGravedad.zAlto) * 100 || 0,
        };

        const alturaDespeje = 1; 
        const alturaGanchoBloque = 1.6; 
        const anchoCarga = parseFloat(editablePlan.centroGravedad.xAncho) || 0;
        const largoCarga = parseFloat(editablePlan.centroGravedad.yLargo) || 0;
        const altoCarga = parseFloat(editablePlan.centroGravedad.zAlto) || 0;
        const diametroCarga = parseFloat(editablePlan.centroGravedad.diametro) || 0;
        const formaCarga = editablePlan.forma || '';
        
        let dimensionMayorCarga = 0;
        if (formaCarga === 'Cuadrado' || formaCarga === 'Rectangulo') {
            dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
        } else if (formaCarga === 'Cilindro') {
            dimensionMayorCarga = diametroCarga;
        }

        const { distanciaGanchoElemento, largoAparejoCalculado } = calculateAparejoDimensions(editablePlan);
        const parsedDistanciaGanchoElemento = parseFloat(distanciaGanchoElemento);


        const finalPayload = {
            nombreProyecto: editablePlan.nombreProyecto,
            capataz: typeof editablePlan.capataz === 'object' && editablePlan.capataz._id ? editablePlan.capataz._id : editablePlan.capataz,
            supervisor: typeof editablePlan.supervisor === 'object' && editablePlan.supervisor._id ? editablePlan.supervisor._id : editablePlan.supervisor,
            jefeArea: typeof editablePlan.jefeArea === 'object' && editablePlan.jefeArea._id ? editablePlan.jefeArea._id : editablePlan.jefeArea,
            firmaSupervisor: "Firma pendiente",
            firmaJefeArea: "Firma pendiente",
            grua: typeof editablePlan.grua === 'object' && editablePlan.grua._id ? editablePlan.grua._id : editablePlan.grua,
            aparejos: editablePlan.aparejos.map(ap => {
                const pesoCarga = parseFloat(editablePlan.cargas.pesoEquipo) || 0;
                const cantidadManiobra = parseInt(ap.cantidad, 10) || 0;
                const anguloEslingaStr = ap.tension || '0°';
                const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
                const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;
                
                let largoAparejoFinal;
                if (cantidadManiobra === 1) {
                    largoAparejoFinal = !isNaN(parsedDistanciaGanchoElemento) ? parsedDistanciaGanchoElemento : 0;
                } else if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
                    const ladoAdyacenteParaLargo = dimensionMayorCarga / 2;
                    largoAparejoFinal = parseFloat((ladoAdyacenteParaLargo / Math.cos(anguloEnRadianes)).toFixed(1)) || 0;
                } else {
                    largoAparejoFinal = parseFloat(largoAparejoCalculado) || 0;
                }
                
                let calculatedTension = 0;
                if (cantidadManiobra === 1) {
                    calculatedTension = pesoCarga;
                } else if (cantidadManiobra === 2) {
                    calculatedTension = pesoCarga / 2;
                } else if (cantidadManiobra === 4) {
                    calculatedTension = pesoCarga / 3;
                }
                calculatedTension = Number.isFinite(calculatedTension) ? parseFloat(calculatedTension.toFixed(1)) : 0;

                return {
                    descripcion: ap.descripcion,
                    cantidad: ap.cantidad,
                    pesoUnitario: ap.pesoUnitario,
                    largo: largoAparejoFinal,
                    grillete: ap.grillete,
                    pesoGrillete: ap.pesoGrillete,
                    tension: String(calculatedTension),
                    altura: ap.altura,
                    pesoTotal: ap.pesoTotal,
                };
            }),
            datos: editablePlan.datos,
            cargas: {
                ...editablePlan.cargas,
                porcentajeUtilizacion: porcentajeUtilizacion,
            },
            centroGravedad: centroGravedadConPR,
            version: (editablePlan.version || 0) + 1,
        };

        try {
            const response = await fetch(getApiUrl(`setupIzaje/${editablePlan._id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(finalPayload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Error al guardar los cambios: ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                }
                Alert.alert("Error", errorMessage);
                return;
            }

            const result = await response.json();
            Alert.alert("Éxito", "Plan de izaje actualizado correctamente.");
            navigation.navigate('Tabs', { screen: 'Perfil' }); 

        } catch (error) {
            console.error("Error al guardar cambios:", error);
            Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const goToEditCarga = () => {
        navigation.navigate('EditCarga', {
            planData: editablePlan
        });
    };

    const goToEditGrua = () => {
        navigation.navigate('EditGrua', {
            planData: editablePlan
        });
    };

    const goToEditAparejos = () => {
        navigation.navigate('EditAparejos', {
            planData: editablePlan
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="keyboard-arrow-left" size={44} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Plan de Izaje</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Proyecto</Text>
                <Text style={styles.labelAdjusted}>
                    Nombre: <Text style={styles.normalFontWeight}>{editablePlan.nombreProyecto || 'Sin nombre'}</Text>
                </Text>

                <Text style={styles.sectionTitle}>Responsables</Text>
                <Text style={styles.labelAdjusted}>
                    Capataz: <Text style={styles.normalFontWeight}>{getFullName(initialPlanData.capataz)}</Text>
                </Text>
                <Text style={styles.labelAdjusted}>
                    Supervisor: <Text style={styles.normalFontWeight}>{getFullName(initialPlanData.supervisor)}</Text>
                </Text>
                <Text style={styles.labelAdjusted}>
                    Jefe de Área: <Text style={styles.normalFontWeight}>{getFullName(initialPlanData.jefeArea)}</Text>
                </Text>

                <Text style={styles.sectionTitle}>Versión</Text>
                <Text style={styles.labelAdjusted}>
                    Versión: <Text style={styles.normalFontWeight}>{String(editablePlan.version)}</Text>
                </Text>

                <View style={styles.actionButtonsContainer}>
                    <Components.Button
                        label="Iniciar edición"
                        onPress={goToEditCarga}
                        style={styles.actionButton}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
                <Components.Button
                    label="Volver"
                    onPress={handleGoBack}
                    isCancel={true}
                    style={[styles.bottomButton, { backgroundColor: 'transparent', right: 50 }]}
                />
                <Components.Button
                    label="Guardar cambios"
                    onPress={handleSaveChanges}
                    style={[styles.bottomButton, { right: 120 }]}
                />
            </View>
        </View>
    );
};

export default EditPlan;