
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../../styles/TablasStyles';
import { convertirImagenABase64 } from './pdfUtils';
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
}) => {
  try {
    const base64Imagen = await convertirImagenABase64(require('../../../assets/EI-Montajes.png'));
    const imagenBase64 = `data:image/png;base64,${base64Imagen}`;
    const findValue = (dataArray, descripcion) => dataArray.find(d => d.descripcion === descripcion)?.nombre;
    const planDataForHtml = {
      nombreProyecto: findValue(datosTablaProyecto, "Nombre Proyecto"),
      capataz: { nombreCompleto: findValue(datosTablaProyecto, "Capataz") },
      supervisor: { nombreCompleto: findValue(datosTablaProyecto, "Supervisor") },
      jefeArea: { nombreCompleto: findValue(datosTablaProyecto, "Jefe Área") },
      version: datosTablaProyecto.find(d => d.descripcion === "Versión")?.nombre || "0",
    };

    const htmlContent = generarHTML(
      planDataForHtml,
      maniobraRows,
      gruaRows,
      aparejosDetailed,
      totalPesoAparejos,
      datosTablaXYZ,
      imagenBase64
    );

    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
    Alert.alert("Error", "Ocurrió un error al intentar generar el PDF. Por favor, inténtalo de nuevo.");
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
}) => {
  const handleGeneratePdfPress = () => {
    const pdfData = {
      selectedGrua,
      aparejosRows: rows,
      totalPesoAparejos,
      maniobraRows: cargaRows,
      gruaRows: datosGruaRows,
      datosTablaProyecto: datosTablaProyecto,
      datosTablaXYZ,
      aparejosDetailed,
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
