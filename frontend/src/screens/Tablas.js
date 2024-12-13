import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import TablasStyles from '../styles/TablasStyles'; // Asegúrate de tener la ruta correcta

const Tablas = () => {
  // Filas vacías para la primera tabla
  const rows = [
    { item: '', descripcion: '', cantidad: '', pesoUnitario: '', pesoTotal: '' },
    { item: '', descripcion: '', cantidad: '', pesoUnitario: '', pesoTotal: '' },
  ];

  // Filas para la segunda tabla
  const cargaRows = [
    { item: '1', descripcion: 'PESO DEL EQUIPO', valor: '' },
    { item: '2', descripcion: 'PESO APAREJOS', valor: '' },
    { item: '3', descripcion: 'PESO GANCHO', valor: '' },
    { item: '4', descripcion: 'PESO TOTAL', valor: '' },
    { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: '' },
    { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: '' },
    { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
  ];

  // Filas para la nueva tabla Cuadro Datos Grúa
  const datosGrúaRows = [
    { item: '1', descripcion: 'LARGO PLUMA', valor: '' },
    { item: '2', descripcion: 'CONTRAPESO', valor: '' },
  ];

  return (
    <ScrollView style={TablasStyles.container}>
      {/* Título de la página */}
      <View style={TablasStyles.header}>
        <Text style={TablasStyles.headerText}>Tablas</Text>
      </View>

      {/* Primera tabla: CUADRO APAREJOS GRÚA */}
      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>CUADRO APAREJOS GRÚA #1</Text>
        </View>

        {/* Fila de encabezados */}
        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.itemColumn, TablasStyles.headerCell]}>ITEM</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.descripcionColumn, TablasStyles.headerCell]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.cantidadColumn, TablasStyles.headerCell]}>CANT.</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.pesoUnitarioColumn, TablasStyles.headerCell]}>PESO UNIT (Kg.)</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.pesoTotalColumn, TablasStyles.headerCell]}>PESO TOTAL (Kg.)</Text>
        </View>

        {/* Filas de datos */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.itemColumn]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.cantidadColumn]}>{row.cantidad}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.pesoUnitarioColumn]}>{row.pesoUnitario}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.pesoTotalColumn]}>{row.pesoTotal}</Text>
          </View>
        ))}

        {/* Fila TOTAL */}
        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.totalCell, { fontWeight: 'bold', marginTop: 8, marginLeft: 238, flex: 2.5 }]}>TOTAL</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroAparejosGrúa.pesoTotalColumn]}></Text>
        </View>
      </View>

      {/* Salto de línea entre las tablas */}
      <View style={{ height: 20 }} />

      {/* Segunda tabla: CUADRO DE CARGA GRÚA */}
      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>CUADRO DE CARGA GRÚA #2</Text>
        </View>

        {/* Fila de encabezados */}
        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.itemColumn, TablasStyles.headerCell]}>ITEM</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.descripcionColumn, TablasStyles.headerCell]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.valorColumn, TablasStyles.headerCell]}>VALOR</Text>
        </View>

        {/* Filas de datos */}
        {cargaRows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.itemColumn]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.valorColumn]}>{row.valor}</Text>
          </View>
        ))}
      </View>

      {/* Salto de línea entre las tablas */}
      <View style={{ height: 20 }} />

      {/* Tercera tabla: CUADRO DATOS GRÚA */}
      <View style={TablasStyles.table}>
        <View style={TablasStyles.fullRow}>
          <Text style={TablasStyles.fullRowText}>CUADRO DATOS GRÚA #1</Text>
        </View>

        {/* Fila de encabezados */}
        <View style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.itemColumn, TablasStyles.headerCell]}>ITEM</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.descripcionColumn, TablasStyles.headerCell]}>DESCRIPCIÓN</Text>
          <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.valorColumn, TablasStyles.headerCell]}>VALOR</Text>
        </View>

        {/* Filas de datos */}
        {datosGrúaRows.map((row, rowIndex) => (
          <View key={rowIndex} style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.itemColumn]}>{row.item}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.descripcionColumn]}>{row.descripcion}</Text>
            <Text style={[TablasStyles.cell, TablasStyles.cuadroCargaGrúa.valorColumn]}>{row.valor}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Tablas;
