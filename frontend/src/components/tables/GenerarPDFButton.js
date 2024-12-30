import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../../styles/TablasStyles';
import { convertirImagenABase64 } from '../../utils/pdfUtils';

const generarPDF = async (selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows) => {
  const base64Imagen = await convertirImagenABase64(require('../../../assets/EI-Montajes.png'));
  const imagenBase64 = `data:image/png;base64,${base64Imagen}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Informe de Izaje</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 5px;
                margin: 10px;
                padding: 20px;
                border: 1px solid black;
                box-sizing: border-box;
                height: 122vh;
                width: 122vw;
                display: flex;
                justify-content: flex-end;
                flex-wrap: wrap;
            }
            .inner-box {
                border: 1px solid black;
                margin: 25px;
                padding: 20px;
                box-sizing: border-box;
                height: 110vh;
                width: 110vw;
                position: relative;
                text-align: right;
            }
            h2 {
                margin-top: 0;
                text-align: right;
                margin-bottom: 10px;
            }
            table {
                width: 200px;
                font-size: 5px;
                margin-bottom: 15px;
                border-collapse: collapse;
                margin-left: auto;
                margin-right: 0;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: white;
            }
            .view-box-container {
                display: grid;
                grid-template-columns: 30% 30%;
                grid-template-rows: 40vh 40vh;
                grid-gap: 15px 20px;
                margin-top: -420px;
                justify-items: start;
                align-items: start;
                width: 100%;
            }
            .view-box {
                width: 100%;
                padding: 10px;
                border: 1px solid black;
                box-sizing: border-box;
                height: 100%;
            }
            .view-box h3 {
                font-size: 10px;
                color: red;
                margin-top: 0;
                text-align: right;
            }
            .new-table {
              width: 15%;
              height: auto;
              margin-top: -190px;
              margin-left: 0;
              border-collapse: collapse;
            }

            .new-table table {
                width: 130%;
                border-collapse: collapse;
                margin-top: 123.2px;
                margin-left: 215px;
            }

            .new-table th, 
            .new-table td {
                padding: 1.2px;
                text-align: left; 
            }

            .eimisa-table table {
              height: 66px;
              width: 30%;
              border-collapse: collapse;
              margin-top: -81px;
              margin-left: 450px;
            }

            .eimisa-table th {
                padding: 5px;
                text-align: left; 
            } 
            .eimisa-table td {
                padding: -2px;
                text-align: left;
            }

            .additional-tables-container {
                margin-top: 59px;
                text-align: right;
                width: 100%;
            }

            .additional-tables-container table {
                margin: 28px -21px 10px auto;
                width: 300px;
                font-size: 10px;
            }

            .additional-tables-container table th, 
            .additional-tables-container table td {
                height: 45px;
                width: 40px;
                vertical-align: middle;
                padding: 10px;
            }

            .rotated-row-container {
                display: flex;
                justify-content: space-between;
                margin-top: -96.8px;
                margin-left: 190.5px;
            }

            .rotated-row {
                writing-mode: vertical-rl;
                transform: rotate(180deg);
                font-size: 6px;
                padding: 0px;
                width: 5px;
                text-align: center;
            }

            .rotated-row table {
                width: 100%;
                border-collapse: collapse;
            }

            .rotated-header {
                height: 1px;
                width: 60%;
                padding-top: 23.5px;
                text-align: center;
                max-width: 60px;
            }

            .rotated-header-second {
                width: 20%;
                max-width: 30px;
            }
        </style>
    </head>
    <body>
        <div class="inner-box">
            <h2>CUADRO APAREJOS</h2>
            <table>
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
                    ${totalPesoAparejos}
                </tbody>
            </table>

            <h2>CUADRO CARGA</h2>
            <table>
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIPCIÓN</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
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
            <table>
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIPCIÓN</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    ${datosGrúaRows.map(row => ` 
                      <tr> 
                        <td>${row.item}</td> 
                        <td>${row.descripcion}</td> 
                        <td>${row.valor}</td> 
                      </tr> 
                    `).join('')}
                </tbody>
            </table>

            <div class="view-box-container">
                <div class="view-box">
                    <h3>VISTA PLANTA</h3>
                </div>
                <div class="view-box">
                    <h3>VISTA ISOMETRICA</h3>
                </div>
                <div class="view-box">
                    <h3>VISTA ELEVACIÓN 1</h3>
                </div>
                <div class="view-box elevation-2">
                    <h3>VISTA ELEVACIÓN 2</h3>
                </div>
            </div>

            <div class="additional-tables-container">
                <table>
                    <thead>
                        <tr>
                            <th>PROYECTO EJEMPLO</th>
                            <th> 
                                <img src="${imagenBase64}" width="100" height="50" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ITEM</td>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="new-table">
                <table>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PROYECTO:</td>
                        </tr>
                        <tr>
                            <td>PROYECTO:</td>
                        </tr>
                        <tr>
                            <td>REVISO:</td>
                        </tr>
                        <tr>
                            <td>APROBO:</td>
                        </tr>
                        <tr>
                            <td><br></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="eimisa-table">
                <table>
                    <thead>
                        <tr>
                            <th>NUMERO DE PLANO</th>
                            <th>REV.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>N°EIMISA</td>
                            <td> - </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Fila girada 90° -->
            <div class="rotated-row-container">
                <div class="rotated-row">
                    <table>
                        <thead>
                            <tr>
                                <th class="rotated-header">EIMISA</th>
                                <th class="rotated-header-second"></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
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