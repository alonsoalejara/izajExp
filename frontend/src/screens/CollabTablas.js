import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index'; // Asegúrate de que esta ruta sea correcta
import TablasStyles from '../styles/TablasStyles'; // Asegúrate de que esta ruta sea correcta

const CollabTablas = ({ route }) => {
  const { setup, currentUserSignature, currentUser } = route.params; // ¡Asegúrate de pasar 'currentUser' también!
  const navigation = useNavigation();

  const [showSmallButtons, setShowSmallButtons] = useState(true);

  // Inicializa los estados de las firmas.
  // Priorizamos la firma que ya está en el 'setup', pero si no hay, inicializamos a null.
  const [appliedSupervisorSignature, setAppliedSupervisorSignature] = useState(setup.supervisor?.signature || null);
  const [appliedJefeAreaSignature, setAppliedJefeAreaSignature] = useState(setup.jefeArea?.signature || null);

  // --- CONSOLE LOGS DE INICIO (Mantengo tus logs para depuración) ---
  console.log('--- CollabTablas Component Mount/Re-render ---');
  console.log('`setup` recibido por ruta:', setup);
  console.log('`currentUserSignature` recibido por ruta:', currentUserSignature ? 'Firma presente' : 'Firma NO presente');
  console.log('`currentUser` recibido por ruta:', currentUser ? 'Usuario presente' : 'Usuario NO presente');
  if (currentUser) {
    console.log('ID de currentUser:', currentUser._id);
    console.log('Rol de currentUser:', currentUser.position); // Usamos 'position' o 'roles' según el objeto
  }
  console.log('Estado inicial `appliedSupervisorSignature`:', appliedSupervisorSignature ? 'Firma presente' : 'Firma NO presente');
  console.log('Estado inicial `appliedJefeAreaSignature`:', appliedJefeAreaSignature ? 'Firma presente' : 'Firma NO presente');
  if (appliedSupervisorSignature) {
    console.log('Contenido (primeros 50 caracteres) de appliedSupervisorSignature:', appliedSupervisorSignature.substring(0, 50) + '...');
  }
  if (appliedJefeAreaSignature) {
    console.log('Contenido (primeros 50 caracteres) de appliedJefeAreaSignature:', appliedJefeAreaSignature.substring(0, 50) + '...');
  }
  // --- FIN CONSOLE LOGS DE INICIO ---

  // Este useEffect es crucial para la re-renderización con la firma
  useEffect(() => {
    console.log('--- useEffect activado (Estado de firmas actualizado) ---');
    console.log('Valor actual de `appliedSupervisorSignature` en useEffect:', appliedSupervisorSignature ? 'Firma presente' : 'Firma NO presente');
    console.log('Valor actual de `appliedJefeAreaSignature` en useEffect:', appliedJefeAreaSignature ? 'Firma presente' : 'Firma NO presente');
    if (appliedSupervisorSignature) {
      console.log('Contenido (primeros 50 caracteres) de appliedSupervisorSignature en useEffect:', appliedSupervisorSignature.substring(0, 50) + '...');
    }
    if (appliedJefeAreaSignature) {
      console.log('Contenido (primeros 50 caracteres) de appliedJefeAreaSignature en useEffect:', appliedJefeAreaSignature.substring(0, 50) + '...');
    }
  }, [appliedSupervisorSignature, appliedJefeAreaSignature]);
  // --- FIN useEffect ---

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

  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: setup.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(setup.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(setup.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(setup.jefeArea) },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: setup.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: setup.datos?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: setup.datos?.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${setup.datos?.contrapeso || 0} ton` },
  ];

  const datosTablaAparejosIndividuales = setup.aparejos?.map((aparejo, index) => ({
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

  const datosTablaManiobra = [
    { descripcion: 'Peso elemento', cantidad: `${setup.cargas?.pesoEquipo || 0} ton` },
    { descripcion: 'Peso aparejos', cantidad: `${setup.cargas?.pesoAparejos || 0} ton` },
    { descripcion: 'Peso gancho', cantidad: `${setup.cargas?.pesoGancho || 0} ton` },
    { descripcion: 'Peso cable', cantidad: `${setup.cargas?.pesoCable || 0} ton` },
    { descripcion: 'Peso total', cantidad: `${setup.cargas?.pesoTotal || 0} ton` },
    { descripcion: 'Radio de trabajo máximo', cantidad: `${setup.cargas?.radioTrabajoMax || 0} m` },
    { descripcion: 'Ángulo de trabajo', cantidad: `${setup.cargas?.anguloTrabajo || 0}` },
    { descripcion: 'Capacidad de levante', cantidad: `${setup.cargas?.capacidadLevante || 0} ton` },
    { descripcion: '% Utilización', cantidad: `${setup.cargas?.porcentajeUtilizacion || 0} %` },
  ];

  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: `${setup.centroGravedad?.xAncho || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yLargo || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zAlto || 'N/A'} m`,
    },
    {
      item: 2,
      descripcion: 'CG',
      X: `${setup.centroGravedad?.xCG || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yCG || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zCG || 'N/A'} m`,
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: `${setup.centroGravedad?.xPR || 'N/A'} %`,
      Y: `${setup.centroGravedad?.yPR || 'N/A'} %`,
      Z: `${setup.centroGravedad?.zPR || 'N/A'} %`,
    },
  ];

  const handleFirmarPlan = () => {
    console.log('--- handleFirmarPlan llamado ---');
    console.log('currentUserSignature en handleFirmarPlan:', currentUserSignature ? 'Firma presente' : 'Firma NO presente');
    console.log('currentUser en handleFirmarPlan:', currentUser ? `ID: ${currentUser._id}, Position: ${currentUser.position}` : 'NO presente');

    if (!currentUserSignature) {
      Alert.alert("Error de Firma", "No se encontró una firma para el usuario actual.");
      return;
    }

    Alert.alert(
      "Confirmar Firma",
      "¿Deseas aplicar tu firma a este plan de izaje?",
      [{
        text: "Cancelar",
        style: "cancel"
      }, {
        text: "Firmar",
        onPress: () => {
          setShowSmallButtons(false);

          // Lógica para aplicar la firma según el rol del usuario logeado
          // Asumimos que `currentUser.position` o `currentUser.roles` determinan esto
          if (currentUser?.position === 'Supervisor') { // O si usas 'roles', currentUser.roles.includes('supervisor')
            setAppliedSupervisorSignature(currentUserSignature);
            console.log('Firma de Supervisor aplicada.');
          } else if (currentUser?.position === 'Jefe Área') { // O currentUser.roles.includes('jefeArea')
            setAppliedJefeAreaSignature(currentUserSignature);
            console.log('Firma de Jefe de Área aplicada.');
          } else {
            Alert.alert("Rol no reconocido", "Tu rol no te permite firmar en este documento.", [{ text: "OK" }]);
          }

          console.log('Estado actual de `appliedSupervisorSignature` DESPUÉS DE SET (inmediato):', appliedSupervisorSignature ? 'Firma presente' : 'Firma NO presente');
          console.log('Estado actual de `appliedJefeAreaSignature` DESPUÉS DE SET (inmediato):', appliedJefeAreaSignature ? 'Firma presente' : 'Firma NO presente');
        }
      }]
    );
  };

  const handleEnviarPdf = () => {
    Alert.alert("PDF", "Se está enviando el PDF...");
  };

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
      >
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 50 }]}>
        <Text style={TablasStyles.title}>Detalles del Plan de Izaje</Text>
      </View>

      <ScrollView style={[TablasStyles.tableContainer, { top: -40, paddingHorizontal: 5 }]}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />

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
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />

        {/* Contenedor para las firmas */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 30,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}>
          {/* Firma Supervisor */}
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
              {appliedSupervisorSignature ? (
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

          {/* Firma Jefe de Área */}
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
              {appliedJefeAreaSignature ? (
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

      {/* Renderizado condicional de los botones */}
      {showSmallButtons ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%', position: 'absolute', bottom: 60, left: '-26' }}>
          <Components.Button
            label="Firmar Plan"
            onPress={handleFirmarPlan}
            style={{ width: '48%' }}
          />
          <Components.Button
            label="Enviar PDF"
            onPress={handleEnviarPdf}
            style={{ width: '48%' }}
          />
        </View>
      ) : (
        <Components.Button
          label="Enviar PDF"
          onPress={handleEnviarPdf}
          style={[TablasStyles.button, { width: '90%', position: 'absolute', bottom: 60, left: -33 }]}
        />
      )}
    </View>
  );
};

export default CollabTablas;