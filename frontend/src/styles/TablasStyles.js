import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles'; // Asegúrate de ajustar la ruta según tu estructura de archivos

// Funciones reutilizables para mejorar la claridad
const cellStyle = (padding = 6.9, textAlign = 'center', fontSize = 14) => ({
  padding,
  borderWidth: 1,
  borderColor: '#ccc',
  textAlign,
  backgroundColor: '#ffffff',
  fontSize,
});

const headerCellStyle = {
  backgroundColor: '#eaeaea',
  fontWeight: 'bold',
  fontSize: 16, // Tamaño de fuente para los encabezados
};

const totalCellStyle = {
  borderWidth: 1.6,
  borderRadius: 2,
  backgroundColor: '#eaeaea',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 10,
  flex: 4,
  fontSize: 15, // Tamaño de fuente para la celda de total
};

const TablasStyles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 25,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
  },

  // Estilo para el ScrollView que permite el desplazamiento horizontal
  tableScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  // Tabla y filas
  table: {
    width: 'auto',
  },
  fullRow: {
    backgroundColor: '#eaeaea',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullRowText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  // Estilo base para las filas
  row: {
    flexDirection: 'row',
    width: 'auto',
  },

  // Estilos para celdas
  cell: cellStyle(6.9, 'center', 9), // Tamaño de letra predeterminado para celdas normales
  headerCell: {
    ...cellStyle(6.9, 'center', 16), // Tamaño de letra para encabezados
    ...headerCellStyle,
  },

  // Columnas generales
  totalPesoUnitarioColumn: {
    flex: 2.8,
  },
  totalPesoTotalColumn: {
    flex: 1.5,
  },
  itemColumn: {
    flex: 2,
  },
  descripcionColumn: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 8,
  },
  cantidadColumn: {
    flex: 2.5,
  },
  pesoUnitarioColumn: {
    flex: 1,
    textAlign: 'right',
  },
  pesoTotalColumn: {
    flex: 1,
    textAlign: 'right',
  },

  // Estilo para la celda total
  totalCellStyle,

  // Configuraciones específicas para cada tabla
  cuadroAparejosGrúa: {
    itemColumn: {
      flex: 2,
    },
    descripcionColumn: {
      flex: 5,
    },
    cantidadColumn: {
      flex: 2.5,
    },
    pesoUnitarioColumn: {
      flex: 2,
    },
    pesoTotalColumn: {
      flex: 2.5,
    },
  },
  cuadroCargaGrúa: {
    itemColumn: {
      flex: 1.5,
    },
    descripcionColumn: {
      flex: 6,
    },
    valorColumn: {
      flex: 2,
    },
  },

  // Estilos para botones reutilizando CommonStyles
  button: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    marginBottom: 20,
  },
  buttonPrimary: {
    ...CommonStyles.buttonPrimary,
  },
  buttonDanger: {
    ...CommonStyles.buttonDanger,
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
});

export default TablasStyles;