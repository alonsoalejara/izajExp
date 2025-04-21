import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos) => {
  // Convertir a número si las propiedades vienen como cadenas
  const radioIzaje = parseFloat(datosRecibidos.radioIzaje) || 0;
  const radioMontaje = parseFloat(datosRecibidos.radioMontaje) || 0;
  const radioMaximo = Math.max(radioIzaje, radioMontaje);

  // Buscar el peso unitario según la eslinga o estrobo seleccionado
  const pesoManiobra = maniobraOptions.find(m => m.label === datosRecibidos.eslingaOEstrobo)?.peso || 0;
  const cantidadManiobra = parseFloat(datosRecibidos.cantidadManiobra) || 0;
  const pesoTotalManiobra = pesoManiobra * cantidadManiobra;

  // Buscar el peso unitario del grillete
  const pesoGrillete = grilleteOptions.find(g => g.pulgada === datosRecibidos.tipoGrillete)?.peso || 0;
  const cantidadGrilletes = parseFloat(datosRecibidos.cantidadGrilletes) || 0;
  const pesoTotalGrillete = pesoGrillete * cantidadGrilletes;

  // 📌 Tabla Peso Aparejos
  const datosTablaPesoAparejos = [];

  if (datosRecibidos.eslingaOEstrobo) {
    datosTablaPesoAparejos.push({
      descripcion: datosRecibidos.eslingaOEstrobo.type || datosRecibidos.eslingaOEstrobo, // Usar .type si existe, sino el valor completo (si es string)
      cantidad: cantidadManiobra,
      pesoUnitario: `${pesoManiobra} kg`,
      pesoTotal: pesoTotalManiobra,
    });
  }
  
  if (datosRecibidos.tipoGrillete) {
    datosTablaPesoAparejos.push({
      descripcion: `Grillete de ${datosRecibidos.tipoGrillete}"`,
      cantidad: cantidadGrilletes,
      pesoUnitario: `${pesoGrillete} kg`,
      pesoTotal: pesoTotalGrillete,
    });
  }

  const pesoAparejos = datosTablaPesoAparejos.reduce((total, item) => total + item.pesoTotal, 0);
  const pesoEquipo = datosRecibidos.grua?.pesoEquipo || 0;
  const pesoGancho = datosRecibidos.grua?.pesoGancho || 0;
  const pesoTotal = pesoAparejos + pesoEquipo + pesoGancho;

  // 📌 Tabla Maniobra
  const datosTablaManiobra = [
    { descripcion: 'Peso del equipo', cantidad: { valor: pesoEquipo, unidad: 'kg' } },
    { descripcion: 'Peso aparejos', cantidad: { valor: pesoAparejos, unidad: 'kg' } },
    { descripcion: 'Peso del gancho', cantidad: { valor: pesoGancho, unidad: 'kg' } },
    { descripcion: 'Peso total', cantidad: { valor: pesoTotal, unidad: 'kg' } },
    { descripcion: 'Radio de trabajo máximo', cantidad: { valor: radioMaximo, unidad: 'm' } },
    { descripcion: 'Capacidad de levante', cantidad: { valor: datosRecibidos.grua?.capacidadLevante || 0, unidad: 'kg' } },
    { descripcion: '% Utilización', cantidad: 'N/A' },
  ];

  // 📌 Tabla Datos de la Grúa
  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: datosRecibidos.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: datosRecibidos.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: datosRecibidos.anguloInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: { valor: datosRecibidos.grua?.contrapeso || 0, unidad: 'ton' } },
  ];

  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaPesoAparejos,
  };
};
