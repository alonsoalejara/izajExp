import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
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

    // Extrae número de "10.5 m" -> 10.5
    const parseBoomLength = (boomLengthString) => {
        if (!boomLengthString) return 0;
        const numberPart = String(boomLengthString).split(' ')[0];
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

    /**
     * ⚠️ FIX IMPORTANTE:
     * Antes se leía el "ángulo" desde aparejos[0]?.tension (¡incorrecto!).
     * Ahora se usa cargas.anguloTrabajo (p.e. "45°") para geometría.
     */
    const calculateAparejoDimensions = (plan) => {
        if (!plan) return { distanciaGanchoElemento: 0, largoAparejoCalculado: 0 };

        const { centroGravedad = {}, cargas = {} } = plan;
        const anchoCarga = parseFloat(centroGravedad?.xAncho) || 0;
        const largoCarga = parseFloat(centroGravedad?.yLargo) || 0;
        const altoCarga = parseFloat(centroGravedad?.zAlto) || 0;
        const formaCarga = plan.forma || plan.formaCarga || '';
        const diametroCarga = parseFloat(centroGravedad?.diametro) || 0;

        // 🔧 Leer el ÁNGULO desde cargas.anguloTrabajo (string tipo "45°")
        const anguloEslingaStr = (cargas?.anguloTrabajo || '0°') + '';
        const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
        const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;

        let dimensionMayorCarga = 0;
        if (formaCarga === 'Cuadrado' || formaCarga === 'Rectángulo' || formaCarga === 'Rectangular') {
            dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
        } else if (formaCarga === 'Cilindro') {
            dimensionMayorCarga = diametroCarga;
        }

        let distanciaGanchoElemento = altoCarga;

        if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
            const ladoAdyacente = dimensionMayorCarga / 2;
            distanciaGanchoElemento = (Math.tan(anguloEnRadianes) * ladoAdyacente + altoCarga);
        }

        let largoAparejoCalculado = distanciaGanchoElemento;
        if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
            const ladoAdyacente = dimensionMayorCarga / 2;
            largoAparejoCalculado = Math.sqrt(Math.pow(ladoAdyacente, 2) + Math.pow(distanciaGanchoElemento, 2));
        }

        return {
            distanciaGanchoElemento: parseFloat(distanciaGanchoElemento.toFixed(1)),
            largoAparejoCalculado: parseFloat(largoAparejoCalculado.toFixed(1)),
        };
    };

    const calculateTotalAparejosWeight = (aparejos) => {
        return (aparejos || []).reduce((total, aparejo) => {
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

    /**
     * Al volver desde Setup..., se mezclan datos entrantes con el estado.
     * También se recalculan largos/altura de aparejos y pesos.
     */
    useEffect(() => {
        if (route.params?.planData) {
            setEditablePlan(prevPlan => {
                const incomingPlanData = route.params.planData;

                let updatedPlanData = {
                    ...prevPlan,
                    ...incomingPlanData,
                    _id: incomingPlanData._id || prevPlan._id,
                    cargas: { ...prevPlan.cargas, ...incomingPlanData.cargas },
                    datos: { ...prevPlan.datos, ...incomingPlanData.datos },
                    centroGravedad: { ...prevPlan.centroGravedad, ...incomingPlanData.centroGravedad },
                    aparejos: incomingPlanData.aparejos || prevPlan.aparejos,
                };

                // Si vienen datos de grúa desde SetupGrua
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

                // Recalcular altura/largo de aparejos en base a geometría
                const { distanciaGanchoElemento, largoAparejoCalculado } = calculateAparejoDimensions(updatedPlanData);

                const alturaParaAparejos = (
                    distanciaGanchoElemento !== 'N/A' &&
                    !isNaN(parseFloat(distanciaGanchoElemento))
                )
                    ? String(parseFloat(distanciaGanchoElemento))
                    : updatedPlanData.cargas.distanciaGanchoElemento || '1';

                const updatedAparejos = (updatedPlanData.aparejos || []).map(ap => {
                    const cantidad = parseFloat(ap.cantidad) || 0;
                    const pesoUnitario = parseFloat(ap.pesoUnitario) || 0;
                    const pesoGrillete = parseFloat(ap.pesoGrillete) || 0;
                    return {
                        ...ap,
                        cantidad,
                        pesoUnitario,
                        pesoGrillete,
                        pesoTotal: cantidad * (pesoUnitario + pesoGrillete),
                        altura: alturaParaAparejos,
                        largo: largoAparejoCalculado !== 'N/A'
                            ? parseFloat(largoAparejoCalculado)
                            : ap.largo,
                        // No forzamos tensión acá; se corrige al guardar para evitar N/A.
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
                    aparejos: updatedAparejos.map(ap => {
                        const pesoGrilleteValor = ap.pesoGrillete ? ap.pesoGrillete : 0;
                        return {
                            descripcion: ap.descripcion,
                            cantidad: ap.cantidad,
                            pesoUnitario: ap.pesoUnitario,
                            pesoTotal: ap.pesoTotal,
                            largo: ap.largo,
                            grillete: ap.grillete,
                            pesoGrillete: pesoGrilleteValor,
                            tension: ap.tension, // puede venir "N/A" si aún no se ha guardado
                            altura: ap.altura,
                        };
                    }),
                    cargas: {
                        ...updatedPlanData.cargas,
                        pesoAparejos: newPesoAparejos,
                        pesoTotal: newPesoTotal,
                    }
                };
            });
        }
    }, [route.params?.planData]);

    /**
     * Auto-centrado del CG (X,Y,Z) cuando cambian dimensiones.
     */
    useEffect(() => {
        setEditablePlan(prevPlan => {
            const xAncho = Number(prevPlan.centroGravedad.xAncho) || 0;
            const yLargo = Number(prevPlan.centroGravedad.yLargo) || 0;
            const zAlto = Number(prevPlan.centroGravedad.zAlto) || 0;

            const newXCG = xAncho / 2;
            const newYCG = yLargo / 2;
            const newZCG = zAlto / 2;

            return {
                ...prevPlan,
                centroGravedad: {
                    ...prevPlan.centroGravedad,
                    xCG: newXCG,
                    yCG: newYCG,
                    zCG: newZCG,
                },
            };
        });
    }, [
        editablePlan.centroGravedad.xAncho,
        editablePlan.centroGravedad.yLargo,
        editablePlan.centroGravedad.zAlto
    ]);

    /**
     * Guardar cambios:
     * - Calcula % utilización
     * - Calcula PR (posiciones relativas)
     * - 🔴 Calcula y APLICA tensión a cada aparejo
     * - Envía PUT con los aparejos ACTUALIZADOS (sin "N/A")
     */
    const handleSaveChanges = async () => {
        if (!editablePlan || !editablePlan._id) {
            Alert.alert("Error", "No hay un plan válido cargado. Inicie edición antes de guardar.");
            return;
        }
        if (!editablePlan.aparejos || editablePlan.aparejos.length === 0) {
            Alert.alert("Error", "No hay aparejos definidos. Inicie edición antes de guardar.");
            return;
        }

        // Token
        let token;
        try {
            token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                Alert.alert("Error", "No se encontró token de usuario. Por favor, inicia sesión nuevamente.");
                return;
            }
        } catch (e) {
            console.error("Error al obtener token:", e);
            Alert.alert("Error", "No se pudo obtener el token de usuario.");
            return;
        }

        // % utilización
        const pesoTotal = parseFloat(editablePlan.cargas.pesoTotal) || 0;
        const capacidadLevante = parseFloat(editablePlan.cargas.capacidadLevante) || 0;
        const porcentajeUtilizacion = capacidadLevante > 0
            ? Number(((pesoTotal / capacidadLevante) * 100).toFixed(1))
            : 0;

        // PR relativas
        const centroGravedadConPR = {
            ...editablePlan.centroGravedad,
            xPR: (Number(editablePlan.centroGravedad.xCG) / Number(editablePlan.centroGravedad.xAncho)) * 100 || 0,
            yPR: (Number(editablePlan.centroGravedad.yCG) / Number(editablePlan.centroGravedad.yLargo)) * 100 || 0,
            zPR: (Number(editablePlan.centroGravedad.zCG) / Number(editablePlan.centroGravedad.zAlto)) * 100 || 0,
        };

        // Cargas válidas
        const cargasValidas = {
            pesoEquipo: Number(editablePlan.cargas.pesoEquipo) || 0,
            pesoAparejos: Number(editablePlan.cargas.pesoAparejos) || 0,
            pesoGancho: Number(editablePlan.cargas.pesoGancho) || 0,
            pesoCable: Number(editablePlan.cargas.pesoCable) || 0,
            pesoTotal: Number(editablePlan.cargas.pesoTotal) || 0,
            radioTrabajoMax: Number(editablePlan.cargas.radioTrabajoMax) || 0,
            anguloTrabajo: String(editablePlan.cargas.anguloTrabajo || ''), // p.e. "45°"
            capacidadLevante: Number(editablePlan.cargas.capacidadLevante) || 0,
            porcentajeUtilizacion,
        };

        // Control de versión y firmas
        const currentVersion = editablePlan.version || 0;
        let newVersion = currentVersion;
        let resetFirmas = false;

        if (editablePlan.firmaJefeArea && editablePlan.firmaJefeArea !== "Firma pendiente") {
            newVersion = Math.min(currentVersion + 1, 3);
            resetFirmas = true;
        }

        // 🔴 Calcular tensión y APLICAR a cada aparejo (evita "N/A")
        const pesoCarga = Number(editablePlan.cargas.pesoEquipo) || 0;
        const cantidadManiobra = editablePlan.aparejos.length;

        let tensionCalculada = 0;
        if (cantidadManiobra === 1) tensionCalculada = pesoCarga;
        else if (cantidadManiobra === 2) tensionCalculada = (pesoCarga / 2);
        else if (cantidadManiobra === 4) tensionCalculada = (pesoCarga / 3);

        // Lista final de aparejos CON tensión aplicada
        const updatedAparejos = editablePlan.aparejos.map(ap => ({
            ...ap,
            tension: Number.isFinite(tensionCalculada)
                ? tensionCalculada.toFixed(1)
                : '0'
        }));

        // 💾 (opcional pero recomendado) refrescar estado antes de enviar
        setEditablePlan(prev => ({ ...prev, aparejos: updatedAparejos }));

        // Sanitizado base64
        const cleanBase64 = (str) =>
            typeof str === 'string'
                ? str.replace(/(\r\n|\n|\r|\s)/g, '')
                : str;

        let ilustracionGruaFinal = cleanBase64(editablePlan.ilustracionGrua || 'NoDisponible');
        let ilustracionFormaFinal = cleanBase64(editablePlan.ilustracionForma || 'NoDisponible');

        if (route.params?.planData?.ilustracionGrua)
            ilustracionGruaFinal = cleanBase64(route.params.planData.ilustracionGrua);
        if (route.params?.planData?.ilustracionForma)
            ilustracionFormaFinal = cleanBase64(route.params.planData.ilustracionForma);

        // Payload FINAL (usa updatedAparejos, no los viejos)
        const finalPayload = {
            _id: editablePlan._id,
            proyecto: editablePlan.proyecto?._id || editablePlan.proyecto,
            capataz: typeof editablePlan.capataz === 'object' ? editablePlan.capataz._id : editablePlan.capataz,
            supervisor: typeof editablePlan.supervisor === 'object' ? editablePlan.supervisor._id : editablePlan.supervisor,
            jefeArea: typeof editablePlan.jefeArea === 'object' ? editablePlan.jefeArea._id : editablePlan.jefeArea,
            firmaSupervisor: resetFirmas ? "Firma pendiente" : (editablePlan.firmaSupervisor || "Firma pendiente"),
            firmaJefeArea: resetFirmas ? "Firma pendiente" : (editablePlan.firmaJefeArea || "Firma pendiente"),
            grua: typeof editablePlan.grua === 'object' ? editablePlan.grua._id : editablePlan.grua,
            largoPluma: editablePlan.datos.largoPluma,
            gradoInclinacion: editablePlan.datos.gradoInclinacion,
            cargas: cargasValidas,
            centroGravedad: centroGravedadConPR,
            aparejos: updatedAparejos.map(ap => {
                const tensionValor = ap.tension ? ap.tension : '0';
                const pesoGrilleteValor = ap.pesoGrillete ? ap.pesoGrillete : 0;
                return {
                    descripcion: ap.descripcion,
                    cantidad: ap.cantidad,
                    pesoUnitario: ap.pesoUnitario,
                    pesoTotal: ap.pesoTotal,
                    largo: ap.largo,
                    grillete: ap.grillete,
                    pesoGrillete: pesoGrilleteValor,
                    tension: tensionValor, // ✅ ya no "N/A"
                    altura: ap.altura,
                };
            }),
            estado: 'Pendiente',
            observaciones: 'Observación pendiente',
            ilustracionGrua: ilustracionGruaFinal,
            ilustracionForma: ilustracionFormaFinal,
            version: newVersion,
        };

        // Logs
        console.log("📤 PUT hacia:", getApiUrl(`setupIzaje/${editablePlan._id}`));
        console.log("🧱 Payload enviado:", JSON.stringify(finalPayload, null, 2));

        // PUT
        try {
            const response = await fetch(getApiUrl(`setupIzaje/${editablePlan._id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(finalPayload),
            });

            const responseText = await response.text();
            console.log("📥 Respuesta del servidor (raw):", responseText);

            if (!response.ok) {
                let errorMessage = `Error al guardar los cambios: ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(responseText);
                    console.log("❌ Error JSON:", errorJson);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                    console.warn("⚠️ No se pudo parsear el error como JSON");
                }
                Alert.alert("Error", errorMessage);
                return;
            }

            const responseJson = JSON.parse(responseText);
            console.log("✅ Respuesta JSON:", responseJson);

            Alert.alert("Éxito", "Plan de izaje actualizado correctamente.");
            navigation.navigate('Tabs', { screen: 'Perfil' });

        } catch (error) {
            console.error("💥 Error al guardar cambios:", error);
            Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
        }
    };

    // --- Handlers de navegación usados en el return ---
    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleGoToProfile = () => {
        navigation.navigate('Tabs', { screen: 'Perfil' });
    };

    const goToSetupCarga = () => {
        navigation.navigate('SetupCarga', {
            mode: 'edit',
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
                        onPress={goToSetupCarga}
                        style={styles.actionButton}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
                <Components.Button
                    label="Volver"
                    onPress={handleGoToProfile} 
                    isCancel={true}
                    style={[styles.bottomButton, { backgroundColor: 'transparent', right: 50 }]}
                />
                {route.params?.aparejosCompletos && (
                    <Components.Button
                        label="Guardar cambios"
                        onPress={handleSaveChanges}
                        style={[styles.bottomButton, { right: 120 }]}
                    />
                )}
            </View>
        </View>
    );
};

export default EditPlan;