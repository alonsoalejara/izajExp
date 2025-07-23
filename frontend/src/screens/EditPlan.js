import React, { useState, useEffect } from 'react';import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';

const EditPlan = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const initialPlanData = route.params?.planData || {};

    const [editablePlan, setEditablePlan] = useState(() => {
        return {
            nombreProyecto: initialPlanData.nombreProyecto || '',
            capataz: initialPlanData.capataz?._id || '',
            supervisor: initialPlanData.supervisor?._id || '',
            jefeArea: initialPlanData.jefeArea?._id || '',
            firmaSupervisor: initialPlanData.firmaSupervisor || 'Firma pendiente',
            firmaJefeArea: initialPlanData.firmaJefeArea || 'Firma pendiente',
            aparejos: initialPlanData.aparejos?.map(ap => ({
                descripcion: ap.descripcion || '',
                cantidad: ap.cantidad || 0,
                pesoUnitario: ap.pesoUnitario || 0,
                largo: ap.largo || 0,
                grillete: ap.grillete || '',
                pesoGrillete: ap.pesoGrillete || 0,
                tension: ap.tension || '',
                altura: ap.altura || '',
            })) || [],
            grua: initialPlanData.grua?._id || '',
            datos: {
                largoPluma: initialPlanData.datos?.largoPluma || '',
                contrapeso: initialPlanData.datos?.contrapeso || 0,
                gradoInclinacion: initialPlanData.datos?.gradoInclinacion || ''
            },
            cargas: {
                pesoEquipo: initialPlanData.cargas?.pesoEquipo || 0,
                pesoAparejos: initialPlanData.cargas?.pesoAparejos || 0,
                pesoGancho: initialPlanData.cargas?.pesoGancho || 0,
                pesoCable: initialPlanData.cargas?.pesoCable || 0,
                pesoTotal: initialPlanData.cargas?.pesoTotal || 0,
                radioTrabajoMax: initialPlanData.cargas?.radioTrabajoMax || 0,
                anguloTrabajo: initialPlanData.cargas?.anguloTrabajo || '',
                capacidadLevante: initialPlanData.cargas?.capacidadLevante || 0,
                porcentajeUtilizacion: initialPlanData.cargas?.porcentajeUtilizacion || 0
            },
            centroGravedad: {
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
    });

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

    const handleSaveAparejos = (updatedAparejos) => {
        setEditablePlan(prevPlan => ({
            ...prevPlan,
            aparejos: updatedAparejos
        }));
    };

    const handleSaveGruaAndDatos = (updatedGruaId, updatedDatos) => {
        setEditablePlan(prevPlan => ({
            ...prevPlan,
            grua: updatedGruaId,
            datos: updatedDatos
        }));
    };

    const handleSaveCargasAndCG = (updatedCargas, updatedCG) => {
        setEditablePlan(prevPlan => ({
            ...prevPlan,
            cargas: updatedCargas,
            centroGravedad: updatedCG
        }));
    };

    const handleChange = (field, value, subField = null) => {
        setEditablePlan(prevPlan => {
            if (subField !== null) {
                return {
                    ...prevPlan,
                    [field]: {
                        ...prevPlan[field],
                        [subField]: value
                    }
                };
            } else {
                return { ...prevPlan, [field]: value };
            }
        });
    };

    const goToEditCarga = () => {
        navigation.navigate('EditCarga', {
            cargas: editablePlan.cargas,
            centroGravedad: editablePlan.centroGravedad,
            onSaveCargasAndCG: handleSaveCargasAndCG,
            gruaId: editablePlan.grua,
            datos: editablePlan.datos,
            planData: editablePlan
        });
    };

    const goToEditGrua = () => {
        navigation.navigate('EditGrua', {
            gruaId: editablePlan.grua,
            datos: editablePlan.datos,
            planData: editablePlan,
            cargas: editablePlan.cargas
        });
    };

    const goToEditAparejos = () => {
        navigation.navigate('EditAparejos', {
            planData: editablePlan,
            setupCargaData: editablePlan.cargas, 
            setupGruaData: editablePlan.datos,
        });
    };

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

        const payload = {
            ...editablePlan,
            aparejos: editablePlan.aparejos.map(aparejo => {
                const { _id, ...rest } = aparejo;
                return rest;
            }),
        };

        const { _id, ...finalPayload } = payload;

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
            navigation.goBack();

        } catch (error) {
            console.error("Error al guardar cambios:", error);
            Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
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
                    Nombre: <Text style={styles.normalFontWeight}>{initialPlanData.nombreProyecto || 'Sin nombre'}</Text>
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
                        label="Editar desde Carga"
                        onPress={goToEditCarga}
                        style={styles.actionButton}
                    />

                    <Components.Button
                        label="Editar desde Grúa"
                        onPress={goToEditGrua}
                        style={styles.actionButton}
                    />

                    <Components.Button
                        label="Editar solo Aparejos"
                        onPress={goToEditAparejos}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        left: 70,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    labelAdjusted: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    normalFontWeight: {
        fontWeight: 'normal',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    readOnlyInput: {
        backgroundColor: '#e0e0e0',
        color: '#555',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color: '#ee0000',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    aparejoContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fefefe',
    },
    aparejoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    actionButtonsContainer: {
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
        width: '116%',
        left: -52,
    },
    actionButton: {
        marginBottom: 10,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ee0000',
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 0,
        paddingVertical: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomButton: {
        width: '48%',
    },
});

export default EditPlan;