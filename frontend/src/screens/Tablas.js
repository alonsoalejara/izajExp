import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import TablasStyles from '../styles/TablasStyles';

const Tablas = ({ route }) => {
  const {
    eslingaOEstrobo,
    cantidadManiobra,
    cantidadGrilletes,
    tipoGrillete,
    grua,
    radioIzaje,
    radioMontaje,
  } = route.params;

  const gruaData = {
    'Terex RT555': {
      pesoEquipo: 12000,
      pesoGancho: 450,
      capacidadLevante: 17800,
      largoPluma: 19.8,
      contrapeso: 6.4,
    },
    'Grúa 2': {
      pesoEquipo: 10000,
      pesoGancho: 400,
      capacidadLevante: 16000,
      largoPluma: 20,
      contrapeso: 7,
    },
    'Grúa 3': {
      pesoEquipo: 11000,
      pesoGancho: 420,
      capacidadLevante: 17000,
      largoPluma: 21,
      contrapeso: 8,
    },
  };

  const rows = [
    {
      item: '1',
      descripcion: `${eslingaOEstrobo}`.toUpperCase(),
      cantidad: cantidadManiobra,
      pesoUnitario: 5,
      pesoTotal: cantidadManiobra * 5,
    },
    {
      item: '2',
      descripcion: `Grillete ${tipoGrillete}"`.toUpperCase(),
      cantidad: cantidadGrilletes,
      pesoUnitario: 2,
      pesoTotal: cantidadGrilletes * 2,
    },
  ];

  const totalPesoAparejos = rows.reduce((total, row) => total + row.pesoTotal, 0);

  const selectedGrua = gruaData[grua] || {};

  const cargaRows = [
    {
      item: '1',
      descripcion: 'PESO DEL EQUIPO',
      valor: `${selectedGrua.pesoEquipo || '0'} kg`,
    },
    {
      item: '2',
      descripcion: 'PESO APAREJOS',
      valor: `${totalPesoAparejos} kg`,
    },
    {
      item: '3',
      descripcion: 'PESO GANCHO',
      valor: `${selectedGrua.pesoGancho || '0'} kg`,
    },
    {
      item: '4',
      descripcion: 'PESO TOTAL',
      valor: `${(selectedGrua.pesoEquipo || 0) + totalPesoAparejos + (selectedGrua.pesoGancho || 0)} kg`,
    },
    {
      item: '5',
      descripcion: 'RADIO DE TRABAJO MAXIMO',
      valor: `${Math.max(radioIzaje, radioMontaje)} mts`,
    },
    { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${selectedGrua.capacidadLevante || '0'} kg` },
    { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
  ];

  const datosGrúaRows = [
    {
      item: '1',
      descripcion: 'LARGO PLUMA',
      valor: `${selectedGrua.largoPluma || '0'} mts`,
    },
    {
      item: '2',
      descripcion: 'CONTRAPESO',
      valor: `${selectedGrua.contrapeso || '0'} ton`,
    },
  ];

  return (
    <ScrollView style={TablasStyles.container}>
      <View style={TablasStyles.header}>
        <Text style={TablasStyles.title}>Tablas</Text>
      </View>

      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>
            CUADRO APAREJOS {grua ? grua.toUpperCase() : ''}
          </Text>
        </View>

        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>ITEM</Text>
          <Text style={[TablasStyles.cell, { flex: 2, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>CANT.</Text>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>PESO UNIT (Kg.)</Text>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>PESO TOTAL (Kg.)</Text>
        </View>

        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center' }]}>{row.cantidad}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.pesoUnitarioColumn]}>{row.pesoUnitario} kg</Text>
            <Text style={[TablasStyles.cell, TablasStyles.pesoTotalColumn]}>{row.pesoTotal} kg</Text>
          </View>
        ))}

        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, { flex: 3.8, fontWeight: 'bold', marginTop: 0, marginLeft: 0 }]}>TOTAL</Text>
          <Text style={[TablasStyles.cell, TablasStyles.pesoTotalColumn, { flex: 0.63 }]}>{totalPesoAparejos} kg</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />

      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>
            CUADRO DE CARGA GRUA {grua ? grua.toUpperCase() : ''}
          </Text>
        </View>

        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>ITEM</Text>
          <Text style={[TablasStyles.cell, { flex: 2, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, { flex: 2, fontWeight: 'bold' }]}>VALOR</Text>
        </View>

        {cargaRows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.pesoTotalColumn, { flex: 2 }]}>{row.valor}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />

      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>
            CUADRO DATOS GRÚA {grua ? grua.toUpperCase() : ''}
          </Text>
        </View>

        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>ITEM</Text>
          <Text style={[TablasStyles.cell, { flex: 2, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, { flex: 2, fontWeight: 'bold' }]}>VALOR</Text>
        </View>

        {datosGrúaRows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.pesoTotalColumn, { flex: 2 }]}>{row.valor}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />

      {/* Botón */}
      <TouchableOpacity
          style={TablasStyles.button}
          onPress={() => navigation.navigate('Tablas', {
          })}
        >
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>

      <View style={{ height: 40 }} />

    </ScrollView>
  );
};

export default Tablas;