import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../../styles/TablasStyles';
import { generarHTML } from './pdfTemplate';

export const generarPDF = async ({
  selectedGrua,
  aparejosRows,
  totalPesoAparejos,
  maniobraRows,
  gruaRows,
  datosTablaProyecto,
  datosTablaXYZ,
  aparejosDetailed,
  ilustracionGrua,
  ilustracionCarga,
}) => {
  try {
    // Usa el logo directamente
    const logoURI = require('../../../assets/EI-Montajes.png');

    const findValue = (dataArray, descripcion) =>
      dataArray.find(d => d.descripcion === descripcion)?.nombre;

    const planDataForHtml = {
      nombreProyecto: findValue(datosTablaProyecto, "Nombre Proyecto"),
      capataz: { nombreCompleto: findValue(datosTablaProyecto, "Capataz") },
      supervisor: { nombreCompleto: findValue(datosTablaProyecto, "Supervisor") },
      jefeArea: { nombreCompleto: findValue(datosTablaProyecto, "Jefe Área") },
      version: datosTablaProyecto.find(d => d.descripcion === "Versión")?.nombre || "0",
      ilustracionGrua,
      ilustracionCarga,
    };

    // ✅ Genera el HTML del PDF con las ilustraciones incluidas
    const htmlContent = generarHTML(
      planDataForHtml,
      maniobraRows,
      gruaRows,
      aparejosDetailed,
      totalPesoAparejos,
      datosTablaXYZ,
      logoURI
    );

    // ✅ Crea el PDF
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
    Alert.alert(
      "Error",
      "Ocurrió un error al intentar generar el PDF. Por favor, inténtalo de nuevo."
    );
  }
};

const PDFGenerator = ({
  selectedGrua,
  rows,
  totalPesoAparejos,
  cargaRows,
  datosGruaRows,
  isSaved,
  datosTablaProyecto,
  datosTablaXYZ,
  aparejosDetailed,
  ilustracionGrua,
  ilustracionCarga,
}) => {
  const handleGeneratePdfPress = () => {
    const pdfData = {
      selectedGrua,
      aparejosRows: rows,
      totalPesoAparejos,
      maniobraRows: cargaRows,
      gruaRows: datosGruaRows,
      datosTablaProyecto,
      datosTablaXYZ,
      aparejosDetailed,
      ilustracionGrua,
      ilustracionCarga,
    };
    generarPDF(pdfData);
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 15 }}>
      {isSaved && (
        <TouchableOpacity
          style={TablasStyles.smallButton}
          onPress={handleGeneratePdfPress}
        >
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PDFGenerator;
