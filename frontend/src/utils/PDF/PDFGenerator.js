import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import TablasStyles from '../../styles/TablasStyles';
import { generarHTML } from './pdfTemplate';

/**
 * Convierte una imagen local (por require) a Base64 usando la API legacy de FileSystem.
 */
export const convertirImagenABase64 = async (imageModule) => {
  try {
    const asset = Asset.fromModule(imageModule);
    await asset.downloadAsync();

    const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('Error al convertir el logo a Base64:', error);
    return null;
  }
};

/**
 * Genera el PDF con logo e ilustraciones.
 */
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
  firmaSupervisor,
  firmaJefeArea,
}) => {
  try {
    const base64Logo = await convertirImagenABase64(require('../../../assets/EI-Montajes.png'));

    const findValue = (dataArray, descripcion) =>
      dataArray.find((d) => d.descripcion === descripcion)?.nombre;

    // 🔧 Limpia prefijos duplicados, espacios o saltos
    const sanitizeBase64 = (data) => {
      if (!data || typeof data !== 'string') return null;

      let cleaned = data
        .replace(/(data:image\/(png|jpeg);base64,)+/g, 'data:image/jpeg;base64,')
        .trim()
        .replace(/(\r\n|\n|\r|\s)/g, '');

      // Asegurar solo un prefijo válido
      if (
        !cleaned.startsWith('data:image/jpeg;base64,') &&
        !cleaned.startsWith('data:image/png;base64,')
      ) {
        cleaned = `data:image/jpeg;base64,${cleaned}`;
      }

      return cleaned;
    };

    // ✅ Sanitiza las imágenes sin volver a agregar prefijos
    const ilustracionGruaFinal = sanitizeBase64(ilustracionGrua);
    const ilustracionCargaFinal = sanitizeBase64(ilustracionCarga);

    const planDataForHtml = {
      nombreProyecto: findValue(datosTablaProyecto, 'Nombre Proyecto'),
      capataz: { nombreCompleto: findValue(datosTablaProyecto, 'Capataz') },
      supervisor: { nombreCompleto: findValue(datosTablaProyecto, 'Supervisor') },
      jefeArea: { nombreCompleto: findValue(datosTablaProyecto, 'Jefe Área') },
      version: datosTablaProyecto.find((d) => d.descripcion === 'Versión')?.nombre || '0',
      ilustracionGrua: ilustracionGruaFinal,
      ilustracionCarga: ilustracionCargaFinal,
      firmaSupervisor,
      firmaJefeArea,
    };

    // ✅ Genera el HTML completo
    const htmlContent = generarHTML(
      planDataForHtml,
      maniobraRows,
      gruaRows,
      aparejosDetailed,
      totalPesoAparejos,
      datosTablaXYZ,
      base64Logo
    );

    // ✅ Genera el PDF
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
    Alert.alert('Error', 'Ocurrió un error al intentar generar el PDF. Por favor, inténtalo de nuevo.');
  }
};

/**
 * Componente del botón que genera el PDF.
 */
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
        <TouchableOpacity style={TablasStyles.smallButton} onPress={handleGeneratePdfPress}>
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PDFGenerator;
