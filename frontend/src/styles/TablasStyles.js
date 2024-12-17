import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles'; // Asegúrate de ajustar la ruta según tu estructura de archivos

// Funciones reutilizables para mejorar la claridad
const cellStyle = (padding = 6.9, textAlign = 'center') => ({
  padding,
  borderWidth: 1,
  borderColor: '#ccc',
  textAlign,
  backgroundColor: '#ffffff',
});

const headerCellStyle = {
  backgroundColor: '#eaeaea',
  fontWeight: 'bold',
};

const totalCellStyle = {
  borderWidth: 1.6,
  borderRadius: 2,
  backgroundColor: '#eaeaea',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 10,
  flex: 4,
};

const TablasStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // Estilo base para las filas
  row: {
    flexDirection: 'row',
    width: 'auto',
  },

  // Estilos para celdas
  cell: cellStyle(),
  headerCell: {
    ...cellStyle(6.9),
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
