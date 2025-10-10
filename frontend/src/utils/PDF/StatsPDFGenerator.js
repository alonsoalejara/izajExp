import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { Alert } from 'react-native';
import { estilosPDF } from '../../styles/PDFStyles';

// 🔹 Convierte el logo a Base64
export const convertirLogoBase64 = async () => {
  try {
    const asset = Asset.fromModule(require('../../../assets/EI-Montajes.png'));
    await asset.downloadAsync();
    const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('Error convirtiendo logo:', error);
    return null;
  }
};

// 🔹 Genera el HTML con distribución tipo “grid” (2 arriba, 1 abajo izquierda)
export const generarHTMLStats = (stats, base64Logo, images) => {
  const { imgEspecialidad, imgDuracion, imgEstado } = images;
  const fecha = new Date().toLocaleString('es-CL');

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Informe de Estadísticas Generales</title>
    <style>
      ${estilosPDF}

      /* 🔹 Layout del contenedor de gráficos */
      .charts-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        width: 100%;
        margin-top: 10px;
      }

      .chart-item {
        flex: 1 1 45%; /* 🔸 Dos por fila (45% + gap = 100%) */
        max-width: 45%;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fafafa;
        padding: 5px;
        text-align: center;
      }

      .chart-item img {
        width: 100%;
        height: auto;
        max-height: 180px;
        object-fit: contain;
        display: block;
        margin: 0 auto;
        border-radius: 6px;
      }

      .chart-title {
        color: #ee0000;
        font-size: 0.9em;
        margin-bottom: 5px;
      }

      /* 🔹 Asegura que el tercer gráfico quede alineado a la izquierda */
      .chart-item:last-child {
        flex-basis: 45%;
        max-width: 45%;
        margin-left: 0;
      }

      body {
        padding: 10px 25px;
      }

      .container {
        padding: 15px;
      }

      .header h1 {
        font-size: 1em;
        margin-bottom: 4px;
      }

      .header h2 {
        font-size: 0.9em;
      }

      .header p {
        font-size: 0.7em;
      }

      .date-info {
        font-size: 0.7em;
        text-align: right;
        margin-top: 10px;
        color: #666;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="${base64Logo}" alt="Logo EI Montajes" style="max-width:100px;">
        </div>
        <h1>Informe de Estadísticas Generales</h1>
        <h2>Echeverría Izquierdo Montajes Industriales</h2>
        <p>Generado el ${fecha}</p>
      </div>

      <div class="charts-grid">
        <div class="chart-item">
          <p class="chart-title">👷‍♂️ Uso de la App por Especialidad</p>
          <img src="${imgEspecialidad}" />
        </div>

        <div class="chart-item">
          <p class="chart-title">⏱️ Duración Promedio de Planes (Horas)</p>
          <img src="${imgDuracion}" />
        </div>

        <div class="chart-item">
          <p class="chart-title">✅ Métrica de Aprobación de Planes</p>
          <img src="${imgEstado}" />
        </div>
      </div>

      <div class="date-info">
        <p>Documento generado automáticamente por la aplicación móvil de gestión de izajes.</p>
      </div>
    </div>
  </body>
  </html>`;
};

// 🔹 Genera y comparte el PDF
export const generarPDFEstadisticas = async (stats, images) => {
  try {
    const base64Logo = await convertirLogoBase64();
    const html = generarHTMLStats(stats, base64Logo, images);
    const { uri } = await printToFileAsync({ html, base64: true });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando PDF de estadísticas:', error);
    Alert.alert('Error', 'No se pudo generar el PDF de estadísticas.');
  }
};
