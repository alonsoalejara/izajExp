import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
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
    // ✅ Carga el logo desde los assets locales y lo convierte a Base64
    const logoAsset = Asset.fromModule(require('../../../assets/EI-Montajes.png'));
    await logoAsset.downloadAsync(); // asegura que esté disponible localmente

    const base64Logo = await FileSystem.readAsStringAsync(logoAsset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imagenBase64 = `data:image/png;base64,${base64Logo}`;

    // 🔍 Extrae los valores necesarios del arreglo de datos
    const findValue = (dataArray, descripcion) =>
      dataArray.find((d) => d.descripcion === descripcion)?.nombre;

    // 🧩 Arma el objeto con los datos del plan
    const planDataForHtml = {
      nombreProyecto: findValue(datosTablaProyecto, 'Nombre Proyecto'),
      capataz: { nombreCompleto: findValue(datosTablaProyecto, 'Capataz') },
      supervisor: { nombreCompleto: findValue(datosTablaProyecto, 'Supervisor') },
      jefeArea: { nombreCompleto: findValue(datosTablaProyecto, 'Jefe Área') },
      version:
        datosTablaProyecto.find((d) => d.descripcion === 'Versión')?.nombre || '0',
      ilustracionGrua,
      ilustracionCarga,
    };

    // 🧾 Genera el contenido HTML completo del PDF
    const htmlContent = generarHTML(
      planDataForHtml,
      maniobraRows,
      gruaRows,
      aparejosDetailed,
      totalPesoAparejos,
      datosTablaXYZ,
      imagenBase64 // <-- el logo en Base64
    );

    // 📄 Genera el PDF
    const { uri } = await printToFileAsync({ html: htmlContent });

    // 📤 Abre la interfaz para compartir el archivo
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
    Alert.alert(
      'Error',
      'Ocurrió un error al intentar generar el PDF. Por favor, inténtalo de nuevo.'
    );
  }
};

// 🔘 Componente que muestra el botón para generar el PDF
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
