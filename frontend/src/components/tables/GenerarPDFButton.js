import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../../styles/TablasStyles';

const generarPDF = async (selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows) => {
  const htmlContent = `

    <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; margin: 20px;">
        <h1>Informe de Izaje</h1>
        <h2>CUADRO APAREJOS</h2>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>DESCRIPCIÓN</th>
              <th>CANT.</th>
              <th>PESO UNIT (Kg.)</th>
              <th>PESO TOTAL (Kg.)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Tabla de Aparejos -->
            ${totalPesoAparejos}
          </tbody>
        </table>

        <h2>CUADRO CARGA</h2>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>DESCRIPCIÓN</th>
              <th>VALOR</th>
            </tr>
          </thead>
          <tbody>
            <!-- Tabla de Carga -->
            ${cargaRows.map(row => `
              <tr>
                <td>${row.item}</td>
                <td>${row.descripcion}</td>
                <td>${row.valor}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>CUADRO DATOS GRÚA</h2>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>DESCRIPCIÓN</th>
              <th>VALOR</th>
            </tr>
          </thead>
          <tbody>
            <!-- Datos de la Grúa -->
            ${datosGrúaRows.map(row => `
              <tr>
                <td>${row.item}</td>
                <td>${row.descripcion}</td>
                <td>${row.valor}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

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
