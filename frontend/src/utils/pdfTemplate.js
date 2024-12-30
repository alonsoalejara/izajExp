import { estilosPDF } from '../styles/PDFStyles';

export const generarHTML = (totalPesoAparejos, cargaRows, datosGrúaRows, base64Imagen) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Informe de Izaje</title>
          <style>${estilosPDF}</style>
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
                                <img src="${base64Imagen}" width="100" height="50" />
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
  };