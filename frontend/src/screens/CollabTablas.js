import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import BS from '../components/bottomSheets/BS.index';
import { generarPDF } from '../utils/PDF/PDFGenerator';

const CollabTablas = ({ route }) => {
    // Extrae planData de route.params de forma segura
    const { planData } = route.params || {};

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [isElementoBottomSheetVisible, setIsElementoBottomSheetVisible] = useState(false);

    // Inicializa currentSetup con planData de forma segura
    const [currentSetup, setCurrentSetup] = useState(planData);

    const navigation = useNavigation();
    const [showSmallButtons, setShowSmallButtons] = useState(true);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);

    // Inicializa las firmas de forma segura, usando planData o currentSetup
    const [appliedSupervisorSignature, setAppliedSupervisorSignature] = useState(
        planData?.firmaSupervisor && planData.firmaSupervisor !== 'Firma pendiente' ? planData.firmaSupervisor : null
    );
    const [appliedJefeAreaSignature, setAppliedJefeAreaSignature] = useState(
        planData?.firmaJefeArea && planData.firmaJefeArea !== 'Firma pendiente' ? planData.firmaJefeArea : null
    );

    useEffect(() => {
        // Actualiza currentSetup y las firmas si planData cambia en los parámetros de la ruta
        if (route.params.planData) {
            setCurrentSetup(route.params.planData);
            setAppliedSupervisorSignature(
                route.params.planData.firmaSupervisor && route.params.planData.firmaSupervisor !== 'Firma pendiente'
                    ? route.params.planData.firmaSupervisor
                    : null
            );
            setAppliedJefeAreaSignature(
                route.params.planData.firmaJefeArea && route.params.planData.firmaJefeArea !== 'Firma pendiente'
                    ? route.params.planData.firmaJefeArea
                    : null
            );
        }
    }, [route.params.planData]);

    // Accede a currentUser de forma segura
    const { currentUser } = route.params || {};
    const userRole = currentUser?.roles?.[0]?.toLowerCase() || currentUser?.position?.toLowerCase();
    const userId = currentUser?._id;

    // Accede a las IDs de los roles de forma segura usando optional chaining
    const supervisorId = currentSetup?.supervisor?._id;
    const jefeAreaId = currentSetup?.jefeArea?._id;
    const capatazId = currentSetup?.capataz?._id;

    const getFullName = (person) => {
        if (!person) return 'N/A';
        const tieneNombre = person.nombre && person.nombre.trim() !== '';
        const tieneApellido = person.apellido && person.apellido.trim() !== '';

        if (tieneNombre && tieneApellido) {
            return `${person.nombre} ${person.apellido}`;
        }
        if (person.username && person.username.trim() !== '') {
            return person.username;
        }
        return 'N/A';
    };

    // Si currentSetup es nulo o indefinido, no hay datos para mostrar.
    // Esto previene errores al intentar acceder a propiedades de un objeto indefinido.
    if (!currentSetup) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ee0000" />
                <Text style={{ marginTop: 10 }}>Cargando datos del plan...</Text>
            </View>
        );
    }

    const datosTablaProyecto = [
        { item: 1, descripcion: 'Nombre Proyecto', nombre: currentSetup?.nombreProyecto || 'N/A' },
        { item: 2, descripcion: 'Capataz', nombre: getFullName(currentSetup?.capataz) },
        { item: 3, descripcion: 'Supervisor', nombre: getFullName(currentSetup?.supervisor) },
        { item: 4, descripcion: 'Jefe Área', nombre: getFullName(currentSetup?.jefeArea) },
        { item: 5, descripcion: 'Versión', nombre: String(currentSetup?.version) || 'N/A' },
    ];

    const datosTablaGrua = [
        { descripcion: 'Grúa', cantidad: currentSetup?.grua?.nombre || 'N/A' },
        { descripcion: 'Largo de pluma', cantidad: currentSetup?.datos?.largoPluma || 'N/A' },
        { descripcion: 'Grado de inclinación', cantidad: currentSetup?.datos?.gradoInclinacion || 'N/A' },
        { descripcion: 'Contrapeso', cantidad: `${currentSetup?.datos?.contrapeso || 0} ton` },
    ];

    const datosTablaAparejosIndividuales = currentSetup?.aparejos?.map((aparejo, index) => ({
        descripcionPrincipal: {
            item: index + 1,
            descripcion: aparejo.descripcion,
        },
        detalles: [
            { label: 'Largo', valor: `${aparejo.largo || 'N/A'} m` },
            { label: 'Peso', valor: `${aparejo.pesoUnitario || 'N/A'} ton` },
            { label: 'Tensión', valor: aparejo.tension || 'N/A' },
            { label: 'Grillete', valor: aparejo.grillete || 'N/A' },
            { label: 'Peso Grillete', valor: `${aparejo.pesoGrillete || 'N/A'} ton` },
        ],
    })) || [];

    let distanciaGanchoElementoCalculated = 'N/A';

    if (currentSetup?.aparejos && currentSetup.aparejos.length > 0) {
        const primerAparejo = currentSetup.aparejos[0];
        if (primerAparejo.altura !== undefined && primerAparejo.altura !== null) {
            const alturaNumerica = parseFloat(primerAparejo.altura);
            if (!isNaN(alturaNumerica)) {
                distanciaGanchoElementoCalculated = alturaNumerica.toFixed(1);
            }
        }
    }

    const datosTablaManiobra = [
        { descripcion: 'Peso elemento', cantidad: `${currentSetup?.cargas?.pesoEquipo || 0} ton` },
        { descripcion: 'Peso aparejos', cantidad: `${currentSetup?.cargas?.pesoAparejos || 0} ton` },
        { descripcion: 'Peso gancho', cantidad: `${currentSetup?.cargas?.pesoGancho || 0} ton` },
        { descripcion: 'Peso cable', cantidad: `${currentSetup?.cargas?.pesoCable || 0} ton` },
        { descripcion: 'Peso total', cantidad: `${currentSetup?.cargas?.pesoTotal || 0} ton` },
        { descripcion: 'Radio de trabajo máximo', cantidad: `${currentSetup?.cargas?.radioTrabajoMax || 0} m` },
        { descripcion: 'Distancia gancho-elemento aprox.', cantidad: `${distanciaGanchoElementoCalculated} m` },
        { descripcion: 'Ángulo de trabajo', cantidad: `${currentSetup?.cargas?.anguloTrabajo || 0}` },
        { descripcion: 'Capacidad de levante', cantidad: `${currentSetup?.cargas?.capacidadLevante || 0} ton` },
        { descripcion: '% Utilización', cantidad: `${currentSetup?.cargas?.porcentajeUtilizacion || 0} %` },
    ];

    const formatNumber = (num, unit = '') =>
        (num !== undefined && num !== null && !isNaN(num)) ? `${parseFloat(num).toFixed(1)} ${unit}` : `N/A${unit ? ' ' + unit : ''}`;

    const anchoCarga = parseFloat(currentSetup?.centroGravedad?.xAncho || currentSetup?.cargas?.ancho) || 0;
    const largoCarga = parseFloat(currentSetup?.centroGravedad?.yLargo || currentSetup?.cargas?.largo) || 0;
    const altoCarga = parseFloat(currentSetup?.centroGravedad?.zAlto || currentSetup?.cargas?.alto) || 0;
    const diametroCarga = parseFloat(currentSetup?.centroGravedad?.diametro || currentSetup?.cargas?.diametro) || 0;

    let formaCarga;
    if (diametroCarga > 0) {
        formaCarga = 'Cilindro';
    } else if (anchoCarga === largoCarga && largoCarga === altoCarga) {
        formaCarga = 'Cuadrado';
    } else {
        formaCarga = 'Rectángulo';
    }

    let xCG = parseFloat(currentSetup?.centroGravedad?.xCG);
    let yCG = parseFloat(currentSetup?.centroGravedad?.yCG);
    let zCG = parseFloat(currentSetup?.centroGravedad?.zCG);
    let xPR = parseFloat(currentSetup?.centroGravedad?.xPR);
    let yPR = parseFloat(currentSetup?.centroGravedad?.yPR);
    let zPR = parseFloat(currentSetup?.centroGravedad?.zPR);

    const formaLower = formaCarga.toLowerCase();
    if (formaLower === 'cilindro') {
        if (isNaN(xCG)) xCG = diametroCarga / 2;
        if (isNaN(yCG)) yCG = diametroCarga / 2;
        if (isNaN(zCG)) zCG = altoCarga / 2;
        if (isNaN(xPR)) xPR = (xCG / (anchoCarga || diametroCarga)) * 100;
        if (isNaN(yPR)) yPR = (yCG / (largoCarga || diametroCarga)) * 100;
        if (isNaN(zPR)) zPR = (zCG / (altoCarga || diametroCarga)) * 100;
    }

    let isCylinderVertical = false;
    if (formaLower === 'cilindro' && altoCarga > diametroCarga) {
        isCylinderVertical = true;
    }

    const datosTablaXYZ = [
        {
            item: 1,
            descripcion: 'Medidas',
            X: formaLower === 'cilindro' && diametroCarga > 0
                ? (isCylinderVertical ? `${formatNumber(diametroCarga, 'm')} (Diámetro)` : `${formatNumber(altoCarga, 'm')} (Largo)`)
                : formatNumber(anchoCarga, 'm'),
            Y: formaLower === 'cilindro' && diametroCarga > 0
                ? (isCylinderVertical ? `${formatNumber(diametroCarga, 'm')} (Diámetro)` : `${formatNumber(diametroCarga, 'm')} (Diámetro)`)
                : formatNumber(largoCarga, 'm'),
            Z: formaLower === 'cilindro' && diametroCarga > 0
                ? (isCylinderVertical ? `${formatNumber(altoCarga, 'm')}` : `${formatNumber(diametroCarga, 'm')} (Diámetro)`)
                : formatNumber(altoCarga, 'm'),
        },
        {
            item: 2,
            descripcion: 'CG',
            X: formatNumber(xCG, 'm'),
            Y: formatNumber(yCG, 'm'),
            Z: formatNumber(zCG, 'm'),
        },
        {
            item: 3,
            descripcion: 'Posic. Relativa',
            X: formatNumber(xPR, '%'),
            Y: formatNumber(yPR, '%'),
            Z: formatNumber(zPR, '%'),
        },
    ];

    const handleFirmarPlan = () => {
        // Si el usuario es jefe, navegar directamente a ObsFirma
        if (userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') {
            navigation.navigate('ObsFirma', { planData: currentSetup, currentUser });
            return;
        }

        // --- Caso Supervisor: mostrar alert de confirmación ---
        if (userRole === 'supervisor' && userId === supervisorId) {
            const isSupervisorSigned = appliedSupervisorSignature && appliedSupervisorSignature !== 'Firma pendiente';
            if (isSupervisorSigned) {
                Alert.alert("Ya Firmado", "El supervisor ya ha aplicado una firma a este plan.");
                return;
            }

            Alert.alert(
                "Confirmar Firma",
                "¿Deseas aplicar tu firma a este plan de izaje?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Firmar", onPress: () => firmarSupervisor() }
                ]
            );
        }
    };

    // Función exclusiva para firmar supervisor
    const firmarSupervisor = async () => {
        setShowSmallButtons(false);
        const payload = JSON.parse(JSON.stringify(currentSetup));

        if (payload.capataz && typeof payload.capataz === 'object') payload.capataz = payload.capataz._id;
        if (payload.supervisor && typeof payload.supervisor === 'object') payload.supervisor = payload.supervisor._id;
        if (payload.jefeArea && typeof payload.jefeArea === 'object') payload.jefeArea = payload.jefeArea._id;
        if (payload.grua && typeof payload.grua === 'object') payload.grua = payload.grua._id;
        if (Array.isArray(payload.aparejos)) {
            payload.aparejos = payload.aparejos.map(a => {
                const { _id, ...rest } = a;
                return rest;
            });
        }

        payload.firmaSupervisor = currentUser?.signature;

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                Alert.alert('Error de Autenticación', 'No autorizado. Por favor, inicie sesión nuevamente.');
                setShowSmallButtons(true);
                return;
            }

            const apiUrl = getApiUrl(`setupIzaje/${currentSetup._id}`);
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorResponseText = await response.text();
                let errorMessage = 'Error desconocido al firmar.';
                try {
                    const errorData = JSON.parse(errorResponseText);
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    errorMessage = `Error del servidor: ${errorResponseText.substring(0, 100)}...`;
                }
                Alert.alert('Error al firmar', errorMessage);
                setShowSmallButtons(true);
                return;
            }

            const data = await response.json();
            Alert.alert('Firma Exitosa', 'Tu firma ha sido aplicada al plan de izaje.');
            if (data && data.updatedSetupIzaje) {
                setCurrentSetup(data.updatedSetupIzaje);
                navigation.setParams({ planData: data.updatedSetupIzaje });
            }

            setShowSmallButtons(true);
        } catch (error) {
            Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor para firmar el plan.');
            setShowSmallButtons(true);
        }
    };



    const handleEnviarPdf = async () => {
        if (isLoadingPdf) return;

        setIsLoadingPdf(true);
        try {
            const aparejosRows = datosTablaAparejosIndividuales.flatMap((aparejo, index) => {
                const pesoUnitario = parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0);
                const pesoGrillete = parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0);
                return {
                    item: index + 1,
                    descripcion: aparejo.descripcionPrincipal.descripcion,
                    cantidad: 1,
                    pesoUnitario: pesoUnitario,
                    pesoTotal: pesoUnitario + pesoGrillete,
                };
            });

            const totalPesoAparejos = aparejosRows.reduce(
                (total, aparejo) => total + aparejo.pesoTotal,
                0
            );

            const pdfData = {
                selectedGrua: currentSetup?.grua,
                aparejosRows: aparejosRows,
                totalPesoAparejos: totalPesoAparejos,
                maniobraRows: datosTablaManiobra,
                gruaRows: datosTablaGrua,
                nombreProyecto: currentSetup?.nombreProyecto,
                datosTablaProyecto: datosTablaProyecto,
                datosTablaXYZ: datosTablaXYZ,
                aparejosDetailed: datosTablaAparejosIndividuales,
            };

            await generarPDF(pdfData);
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error al intentar generar el PDF. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoadingPdf(false);
        }
    };

    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };

    const handleVerElemento = () => {
        setIsElementoBottomSheetVisible(true);
    };

    const handleCloseElementoBottomSheet = () => {
        setIsElementoBottomSheetVisible(false);
    };

    const canSign = (userRole === 'supervisor' && userId === supervisorId) ||
        ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId);

    const isCapataz = userRole === 'capataz' && userId === capatazId;

    return (
        <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
            >
                <Icon name="keyboard-arrow-left" size={40} color="#000" />
            </Pressable>
            <View style={[TablasStyles.titleContainer, { top: 50 }]}>
                <Text style={TablasStyles.title}>Detalles del plan de izaje</Text>
            </View>

            <ScrollView style={[TablasStyles.tableContainer, { top: -40, paddingHorizontal: 5 }]}>
                <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
                <View style={{ marginBottom: 10 }}>
                    <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
                    <View style={{ alignItems: 'left', right: 35 }}>
                        <Components.Button
                            label="Ver grúa"
                            onPress={handleOpenBottomSheet}
                            style={{ width: 150, height: 47 }}
                        />
                    </View>
                </View>

                <Text style={[TablasStyles.sectionTitle, { left: 20 }]}>Aparejos</Text>
                {datosTablaAparejosIndividuales.map((aparejo, index) => (
                    <View key={`aparejo-${index}`} style={TablasStyles.tableSection}>
                        <View style={TablasStyles.tableHeader}>
                            <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
                            <Text style={[TablasStyles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
                        </View>
                        <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
                            <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{String(aparejo.descripcionPrincipal.item)}</Text>
                            <Text style={[TablasStyles.cell, { flex: 2, textAlign: 'left' }]}>{String(aparejo.descripcionPrincipal.descripcion)}</Text>
                        </View>

                        <View style={[TablasStyles.tableSection, { marginTop: 10, marginHorizontal: 0 }]}>
                            <View style={[TablasStyles.tableHeader, { backgroundColor: '#ffeeee' }]}>
                                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 10 }]}>Largo</Text>
                                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 15 }]}>Peso</Text>
                                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 20 }]}>Tensión</Text>
                                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 30 }]}>Grillete</Text>
                                <Text style={[TablasStyles.headerText, { flex: 2, color: '#dd0000', textAlign: 'right', right: 10 }]}>Peso Grillete</Text>
                            </View>
                            <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
                                {aparejo.detalles.map((detail, detailIndex) => (
                                    <Text key={`detail-${index}-${detailIndex}`} style={[TablasStyles.cell, { flex: 1, right: 5 }]}>
                                        {String(detail.valor)}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}

                <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
                <View style={{ marginBottom: 10, alignItems: 'left', right: 35 }}>
                    <Components.Button
                        label="Ver Elemento"
                        onPress={handleVerElemento}
                        style={{ width: 150, height: 47 }}
                    />
                </View>
                <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    marginTop: 30,
                    paddingHorizontal: 10,
                    marginBottom: 20,
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: '#555',
                        }}>Firma Supervisor</Text>
                        <View style={{
                            width: 150,
                            height: 80,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            backgroundColor: '#f9f9f9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}>
                            {appliedSupervisorSignature && appliedSupervisorSignature !== 'Firma pendiente' ? (
                                <Image
                                    source={{
                                        uri: appliedSupervisorSignature.startsWith('data:')
                                            ? appliedSupervisorSignature
                                            : `data:image/png;base64,${appliedSupervisorSignature}`,
                                    }}
                                    style={{
                                        top: 32,
                                        left: 30,
                                        width: '200%',
                                        height: '200%',
                                        resizeMode: 'contain',
                                    }}
                                />
                            ) : (
                                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
                            )}
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: '#555',
                        }}>Firma Jefe de Área</Text>
                        <View style={{
                            width: 150,
                            height: 80,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            backgroundColor: '#f9f9f9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}>
                            {appliedJefeAreaSignature && appliedJefeAreaSignature !== 'Firma pendiente' ? (
                                <Image
                                    source={{
                                        uri: appliedJefeAreaSignature.startsWith('data:')
                                            ? appliedJefeAreaSignature
                                            : `data:image/png;base64,${appliedJefeAreaSignature}`,
                                    }}
                                    style={{
                                        top: 23,
                                        left: 0,
                                        width: '150%',
                                        height: '150%',
                                        resizeMode: 'contain',
                                    }}
                                />
                            ) : (
                                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {showSmallButtons && !isCapataz ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%', position: 'absolute', bottom: 60, left: -26 }}>
                    {canSign && (
                        <Components.Button
                            label="Firmar Plan"
                            onPress={handleFirmarPlan}
                            style={{ width: '48%' }}
                        />
                    )}
                    <Components.Button
                        label={isLoadingPdf ? 'Generando...' : 'Enviar PDF'}
                        onPress={handleEnviarPdf}
                        style={{ width: canSign ? '48%' : '90%' }}
                        disabled={isLoadingPdf}
                    />
                </View>
            ) : (
                <Components.Button
                    label={isLoadingPdf ? 'Generando...' : 'Enviar PDF'}
                    onPress={handleEnviarPdf}
                    style={[TablasStyles.button, { width: '90%', position: 'absolute', bottom: 60, left: -33 }]}
                    disabled={isLoadingPdf}
                />
            )}
            <BS.BSIlustracionGrua
                isVisible={isBottomSheetVisible}
                onClose={handleCloseBottomSheet}
                craneName={currentSetup?.grua?.nombre || 'N/A'}
                alturaType={currentSetup?.datos?.largoPluma}
                inclinacion={currentSetup?.datos?.gradoInclinacion}
                radioTrabajoMaximo={currentSetup?.cargas?.radioTrabajoMax}
            />
            <BS.BSFormaElemento
                isVisible={isElementoBottomSheetVisible}
                onClose={handleCloseElementoBottomSheet}
                ancho={anchoCarga}
                largo={largoCarga}
                alto={altoCarga}
                diametro={diametroCarga}
                forma={formaCarga}
            />
            {isLoadingPdf && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 20
                }}>
                    <ActivityIndicator size="large" color="#ee0000" />
                </View>
            )}
        </View>
    );
};

export default CollabTablas;