import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../styles/TablasStyles';
import { convertirImagenABase64 } from './pdfUtils';
import { generarHTML } from './pdfTemplate';

export const generarPDF = async (selectedGrua, totalPesoAparejos, cargaRows, datosGruaRows) => {
  console.log('Generando PDF con los siguientes datos:');
  console.log('selectedGrua:', selectedGrua);
  console.log('totalPesoAparejos:', totalPesoAparejos);
  console.log('cargaRows:', cargaRows);
  console.log('datosGruaRows:', datosGruaRows);

  const base64Imagen = await convertirImagenABase64(require('../../assets/EI-Montajes.png'));
  const imagenBase64 = `data:image/png;base64,${base64Imagen}`;

  const htmlContent = generarHTML(totalPesoAparejos, cargaRows, datosGruaRows, imagenBase64);

  try {
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};

const PDFGenerator = ({ selectedGrua, totalPesoAparejos, cargaRows, datosGruaRows, isSaved }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 15 }}>
      {isSaved && (
        <TouchableOpacity
          style={TablasStyles.smallButton}
          onPress={() => generarPDF(selectedGrua, totalPesoAparejos, cargaRows, datosGruaRows)}
        >
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PDFGenerator;
