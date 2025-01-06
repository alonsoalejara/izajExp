import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import TablasStyles from '../styles/TablasStyles';
import Tables from '../components/tables/Table.index.js';
import GenerarPDFButton from '../components/tables/GenerarPDFButton';
import Modals from '../components/modals/Modal.index.js';

const Tablas = ({ route, navigation }) => {
  const { eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete, grua, radioIzaje, radioMontaje } = route.params;
  const [isSaved, setIsSaved] = useState(false); // Para saber si el plan de izaje fue guardado
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla la visibilidad del modal

  const gruaData = {
    'Terex RT555': { pesoEquipo: 12000, pesoGancho: 450, capacidadLevante: 17800, largoPluma: 19.8, contrapeso: 6.4 },
    'Grúa 2': { pesoEquipo: 10000, pesoGancho: 400, capacidadLevante: 16000, largoPluma: 20, contrapeso: 7 },
    'Grúa 3': { pesoEquipo: 11000, pesoGancho: 420, capacidadLevante: 17000, largoPluma: 21, contrapeso: 8 },
  };

  const selectedGrua = gruaData[grua] || {};

  const rows = [
    {
      item: '1',
      descripcion: `${eslingaOEstrobo.toUpperCase()}`,
      cantidad: cantidadManiobra,
      pesoUnitario: 27,
      pesoTotal: cantidadManiobra * 27,
    },
    {
      item: '2',
      descripcion: `Grillete ${tipoGrillete}"`.toUpperCase(),
      cantidad: cantidadGrilletes,
      pesoUnitario: 27,
      pesoTotal: cantidadGrilletes * 27,
    },
  ];

  const totalPesoAparejos = rows.reduce((total, row) => total + row.pesoTotal, 0);
  const pesoTotalCarga = (
    (typeof selectedGrua.pesoEquipo === 'number' ? selectedGrua.pesoEquipo : 0) +
    (typeof totalPesoAparejos === 'number' ? totalPesoAparejos : 0) +
    (typeof selectedGrua.pesoGancho === 'number' ? selectedGrua.pesoGancho : 0)
  );

  const cargaRows = [
    { item: '1', descripcion: 'PESO DEL EQUIPO', valor: `${selectedGrua.pesoEquipo || 0} kg` },
    { item: '2', descripcion: 'PESO DE APAREJOS', valor: `${totalPesoAparejos} kg` },
    { item: '3', descripcion: 'PESO GANCHO', valor: `${selectedGrua.pesoGancho || 0} kg` },
    { item: '4', descripcion: 'PESO TOTAL', valor: `${pesoTotalCarga} kg` },
    { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: `${Math.max(radioIzaje, radioMontaje)} mts` },
    { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${selectedGrua.capacidadLevante || 0} kg` },
    { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
  ];

  const datosGruaRows = [
    { item: '1', descripcion: 'LARGO PLUMA', valor: `${selectedGrua.largoPluma || 0} mts` },
    { item: '2', descripcion: 'CONTRAPESO', valor: `${selectedGrua.contrapeso || 0} ton` },
  ];

  // Función para manejar el botón Guardar
  const handleGuardar = () => {
    setIsModalVisible(true);
  };

  // Función para cerrar el modal y cambiar el texto del botón
  const handleConfirmar = () => {
    setIsSaved(true);
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[TablasStyles.container, TablasStyles.contentContainer, { flex: 1, marginBottom: 80 }]}>
        <View style={TablasStyles.section}>
          <Text style={TablasStyles.sectionTitle}>TABLAS</Text>
        </View>

        <Tables.AparejosTable 
          rows={rows} 
          totalPesoAparejos={totalPesoAparejos} 
          grúaSeleccionada={grua} 
        />

        <Tables.CargaTable 
          cargaRows={cargaRows} 
          grúaSeleccionada={grua}
          radioIzaje={radioIzaje}
          radioMontaje={radioMontaje}
          totalPesoAparejos={totalPesoAparejos}
          pesoTotalCarga={pesoTotalCarga}
        />

        <Tables.GruaTable 
          datosGrúaRows={datosGruaRows} 
          grúaSeleccionada={grua} 
        />
      </ScrollView>

      <View style={TablasStyles.horizontalButtonContainer}>
        {/* El botón que cambia de texto */}
        <TouchableOpacity
          style={TablasStyles.button}
          onPress={isSaved ? () => navigation.navigate('GenerarPDF') : handleGuardar} // Si se guarda, va a la pantalla de Generar PDF
        >
          <Text style={TablasStyles.buttonText}>{isSaved ? 'Generar PDF' : 'Guardar Plan de Izaje'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={TablasStyles.button} onPress={() => navigation.goBack()}>
          <Text style={TablasStyles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>

     {/* Modal de Confirmación */}
      <Modals.ModalAlert 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        message="¿Deseas continuar y guardar el plan de izaje?" 
        showCloseButton={false}  // Removemos el botón cerrar por defecto
      >
        {/* Botón Confirmar */}
        <TouchableOpacity style={TablasStyles.button} onPress={handleConfirmar}>
          <Text style={TablasStyles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        {/* Botón Cerrar */}
        <TouchableOpacity style={TablasStyles.button} onPress={() => setIsModalVisible(false)}>
          <Text style={TablasStyles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </Modals.ModalAlert>
    </View>
  );

};

export default Tablas;