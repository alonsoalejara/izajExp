import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../../styles/TablasStyles';
import { convertirImagenABase64 } from '../../utils/pdfUtils';
import { generarHTML } from '../../utils/pdfTemplate';

const generarPDF = async (selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows) => {
  const base64Imagen = await convertirImagenABase64(require('../../../assets/EI-Montajes.png'));
  const imagenBase64 = `data:image/png;base64,${base64Imagen}`;

  const htmlContent = generarHTML(totalPesoAparejos, cargaRows, datosGrúaRows, imagenBase64);

  try {
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};

const GenerarPDFButton = ({ selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows }) => (
  <TouchableOpacity
    style={TablasStyles.button}
    onPress={() => generarPDF(selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows)}
  >
    <Text style={TablasStyles.buttonText}>Generar PDF</Text>
  </TouchableOpacity>
);

export default GenerarPDFButton;