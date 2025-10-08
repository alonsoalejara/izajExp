import { estilosPDF } from '../../styles/PDFStyles';

/**
 * Genera el contenido HTML para el informe de izaje, tomando los datos de forma dinámica.
 * @param {object} planData - Objeto con datos generales del plan (proyecto, responsables).
 * @param {Array} cargaRows - Array de objetos con los datos para la tabla de carga.
 * @param {Array} datosGruaRows - Array de objetos con los datos para la tabla de grúa.
 * @param {Array} aparejosDetailed - Array de objetos con los datos detallados de los aparejos.
 * @param {number} totalPesoAparejos - Peso total de los aparejos.
 * @param {Array} datosTablaXYZ - Array de objetos con los datos para la tabla de dimensiones.
 * @param {string} imagenBase64 - Imagen del logo en formato Base64.
 * @returns {string} El contenido HTML completo del informe.
 */
export const generarHTML = (planData, cargaRows, datosGruaRows, aparejosDetailed, totalPesoAparejos, datosTablaXYZ, imagenBase64) => {
    const distanciaGanchoElementoItem = cargaRows.find(
        item => item.descripcion === 'Distancia gancho-elemento aprox.'
    );

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
            <div class="container">
                <div class="header">
                    <div class="logo-container">
                        <img src="${imagenBase64}" alt="Logo de la empresa" style="max-width: 100px; height: auto;">
                    </div>
                    <h1>Montajes Industriales</h1>
                    <h2>${planData.nombreProyecto || 'Proyecto Ejemplo'}</h2>
                    <p>Fecha de Emisión: <span id="currentDate"></span></p>
                </div>

                <div class="section">
                    <h3>Cuadro de información general</h3>
                    <table>
                        <tr>
                            <th>Nombre del Proyecto</th>
                            <td id="projectName">${planData.nombreProyecto || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Capataz</th>
                            <td id="capatazName">${planData.capataz?.nombreCompleto || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Supervisor</th>
                            <td id="supervisorName">${planData.supervisor?.nombreCompleto || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Jefe de Área</th>
                            <td id="jefeAreaName">${planData.jefeArea?.nombreCompleto || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>Versión del Informe</th>
                            <td id="reportVersion">${planData.version !== undefined ? planData.version : 'N/A'}</td>
                        </tr>
                    </table>
                </div>

                <div class="section">
                    <h3>Cuadro de aparejos</h3>
                    <table id="riggingTable">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Peso Unit. (ton)</th>
                                <th>Largo (m)</th>
                                <th>Grillete</th>
                                <th>Peso Grillete (ton)</th>
                                <th>Tensión</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${aparejosDetailed.map(aparejo => {
                                const pesoUnitario = aparejo.detalles.find(d => d.label === 'Peso')?.valor || 'N/A';
                                const pesoGrillete = aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor || 'N/A';
                                const largo = aparejo.detalles.find(d => d.label === 'Largo')?.valor || 'N/A';
                                const grillete = aparejo.detalles.find(d => d.label === 'Grillete')?.valor || 'N/A';
                                const tension = aparejo.detalles.find(d => d.label === 'Tensión')?.valor || 'N/A';

                                return `
                                    <tr>
                                        <td>${aparejo.descripcionPrincipal.descripcion}</td>
                                        <td>1</td>
                                        <td>${pesoUnitario}</td>
                                        <td>${largo}</td>
                                        <td>${grillete}</td>
                                        <td>${pesoGrillete}</td>
                                        <td>${tension}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="data-tables-layout">
                    <div class="section">
                        <h3>Cuadro de carga</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${cargaRows.map(row => `
                                    <tr>
                                        <td>${row.descripcion}</td>
                                        <td>${row.cantidad !== undefined ? row.cantidad : row.valor}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="section">
                        <h3>Cuadro de grúa</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${datosGruaRows.map(row => `
                                    <tr>
                                        <td>${row.descripcion}</td>
                                        <td>${row.cantidad !== undefined ? row.cantidad : row.valor}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="section">
                        <h3>Cuadro de dimensiones</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Parámetro</th>
                                    <th>Valor (metros / %)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colspan="2" style="text-align: center; background-color: #f0f0f0;">Medidas (Dimensiones)</th>
                                </tr>
                                <tr>
                                    <td>(X) Ancho</td>
                                    <td id="cgXWidth">${datosTablaXYZ.find(d => d.descripcion === 'Medidas')?.Y}</td>
                                </tr>
                                <tr>
                                    <td>(Y) Largo</td>
                                    <td id="cgYLenght">${datosTablaXYZ.find(d => d.descripcion === 'Medidas')?.X}</td>
                                </tr>
                                <tr>
                                    <td>(Z) Alto</td>
                                    <td id="cgZHeight">${datosTablaXYZ.find(d => d.descripcion === 'Medidas')?.Z}</td>
                                </tr>
                                <tr>
                                    <th colspan="2" style="text-align: center; background-color: #f0f0f0;">Centro de Gravedad (CG)</th>
                                </tr>
                                <tr>
                                    <td>(X) CG</td>
                                    <td id="cgX">${datosTablaXYZ.find(d => d.descripcion === 'CG')?.X}</td>
                                </tr>
                                <tr>
                                    <td>(Y) CG</td>
                                    <td id="cgY">${datosTablaXYZ.find(d => d.descripcion === 'CG')?.Y}</td>
                                </tr>
                                <tr>
                                    <td>(Z) CG</td>
                                    <td id="cgZ">${datosTablaXYZ.find(d => d.descripcion === 'CG')?.Z}</td>
                                </tr>
                                <tr>
                                    <th colspan="2" style="text-align: center; background-color: #f0f0f0;">Posición Relativa (PR)</th>
                                </tr>
                                <tr>
                                    <td>(X) PR</td>
                                    <td id="cgXPR">${datosTablaXYZ.find(d => d.descripcion === 'Posic. Relativa')?.X}</td>
                                </tr>
                                <tr>
                                    <td>(Y) PR</td>
                                    <td id="cgYPR">${datosTablaXYZ.find(d => d.descripcion === 'Posic. Relativa')?.Y}</td>
                                </tr>
                                <tr>
                                    <td>(Z) PR</td>
                                    <td id="cgZPR">${datosTablaXYZ.find(d => d.descripcion === 'Posic. Relativa')?.Z}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="illustrations-layout">
                <div class="illustration-section">
                    <h3>Ilustración de grúa</h3>
                    <div class="illustration-container">
                    ${planData.ilustracionGrua
                        ? `<img src="${planData.ilustracionGrua}" alt="Ilustración de grúa" />`
                        : `<span>[Ilustración de grúa no disponible]</span>`}
                    </div>
                </div>

                <div class="illustration-section">
                    <h3>Ilustración de carga</h3>
                    <div class="illustration-container">
                    ${planData.ilustracionCarga
                    ? `<img src="${planData.ilustracionCarga}" alt="Ilustración de carga" class="img-carga" />`
                    : `<span>[Ilustración de carga no disponible]</span>`}
                    </div>
                </div>
                </div>

                <div class="person-info">
                <div class="person-block" style="page-break-inside: avoid;">
                    <!-- Firma del Supervisor -->
                    ${
                    planData.firmaSupervisor
                        ? `<img
                            src="${planData.firmaSupervisor}"
                            alt="Firma Supervisor"
                            style="width:150px;height:80px;object-fit:contain;border:1px solid #ccc;border-radius:6px;display:block;margin:0 auto 8px;"
                            />`
                        : `<span class="signature-status" id="supervisorSignature">[Firma del supervisor pendiente]</span>`
                    }

                    <div class="signature-line">
                    <span id="supervisorFullName">${planData.supervisor?.nombreCompleto || 'Firma del Supervisor'}</span>
                    </div>
                    <p class="person-role">Supervisor</p>
                </div>

                <div class="person-block" style="page-break-inside: avoid;">
                    <!-- Firma del Jefe de Área -->
                    ${
                    planData.firmaJefeArea
                        ? `<img
                            src="${planData.firmaJefeArea}"
                            alt="Firma Jefe de Área"
                            style="width:150px;height:80px;object-fit:contain;border:1px solid #ccc;border-radius:6px;display:block;margin:0 auto 8px;"
                            />`
                        : `<span class="signature-status" id="jefeAreaSignature">[Firma del jefe de área pendiente]</span>`
                    }

                    <div class="signature-line">
                    <span id="jefeAreaFullName">${planData.jefeArea?.nombreCompleto || 'Firma del Jefe de Área'}</span>
                    </div>
                    <p class="person-role">Jefe de Área</p>
                </div>
                </div>

                <div class="date-info">
                    <p>Documento generado el: <span id="createdAtDate">04/08/2025</span></p>
                    <p>Última actualización: <span id="updatedAtDate">04/08/2025</span></p>
                </div>
            </div>

            <script>
                function formatDate(dateString) {
                    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                    return new Date(dateString).toLocaleDateString('es-ES', options);
                }
                document.getElementById('currentDate').textContent = formatDate(new Date());
            </script>
        </body>
        </html>
    `;
};