import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../styles/TablasStyles';
import { convertirImagenABase64 } from './pdfUtils';
import { generarHTML } from './pdfTemplate';

export const generarPDF = async (selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows) => {
  console.log('PDFGenerator.js: Recibidos en PDFGenerator:');
  console.log('PDFGenerator.js: selectedGrua:', selectedGrua);
  console.log('PDFGenerator.js: rows:', rows);
  console.log('PDFGenerator.js: totalPesoAparejos:', totalPesoAparejos);
  console.log('PDFGenerator.js: cargaRows:', cargaRows);
  console.log('PDFGenerator.js: datosGruaRows:', datosGruaRows);

  const base64Imagen = await convertirImagenABase64(require('../../assets/EI-Montajes.png'));
  const imagenBase64 = `data:image/png;base64,${base64Imagen}`;

  const htmlContent = generarHTML(rows, totalPesoAparejos, cargaRows, datosGruaRows, imagenBase64);

  try {
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};

const PDFGenerator = ({ selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows, isSaved }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 15 }}>
      {isSaved && (
        <TouchableOpacity
          style={TablasStyles.smallButton}
          onPress={() => generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows)}
        >
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PDFGenerator;
