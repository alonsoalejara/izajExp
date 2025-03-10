import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos) => {
  const radioMaximo = Math.max(datosRecibidos.radioIzaje, datosRecibidos.radioMontaje);

  // Buscar peso unitario de la eslinga o estrobo
  const pesoManiobra = maniobraOptions.find(m => m.label === datosRecibidos.eslingaOEstrobo)?.peso || 0;
  const pesoTotalManiobra = pesoManiobra * (datosRecibidos.cantidadManiobra || 0);

  // Buscar peso unitario del grillete
  const pesoGrillete = grilleteOptions.find(g => g.pulgada === datosRecibidos.tipoGrillete)?.peso || 0;
  const pesoTotalGrillete = pesoGrillete * (datosRecibidos.cantidadGrilletes || 0);

  // 📌 Tabla Peso Aparejos
  const datosTablaPesoAparejos = [
    {
      descripcion: datosRecibidos.eslingaOEstrobo,
      cantidad: datosRecibidos.cantidadManiobra || 0,
      pesoUnitario: `${pesoManiobra} kg`,
      pesoTotal: pesoTotalManiobra,
    },
    {
      descripcion: `Grillete de ${datosRecibidos.tipoGrillete}"`,
      cantidad: datosRecibidos.cantidadGrilletes || 0,
      pesoUnitario: `${pesoGrillete} kg`,
      pesoTotal: pesoTotalGrillete,
    },
  ];

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
    { descripcion: '% Utilización', cantidad: 'N/A'},
  ];

  // 📌 Tabla Datos Grúa
  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: datosRecibidos.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: { valor: datosRecibidos.grua?.largoPluma || 0, unidad: 'm' } },
    { descripcion: 'Contrapeso', cantidad: { valor: datosRecibidos.grua?.contrapeso || 0, unidad: 'ton' } },
  ];

  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaPesoAparejos,
  };
};
