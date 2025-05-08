import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos) => {
  console.log("Datos recibidos en obtenerDatosTablas:", datosRecibidos);
  console.log("Tipo de grillete en datosRecibidos:", datosRecibidos.tipoGrillete);
  console.log("Cantidad de grilletes en datosRecibidos:", datosRecibidos.cantidadGrilletes);
  console.log("Largo S1 en datosRecibidos:", datosRecibidos.medidaS1Maniobra);
  console.log("Largo S2 en datosRecibidos:", datosRecibidos.medidaS2Maniobra);
  console.log("Ángulo de trabajo en datosRecibidos:", datosRecibidos.anguloEslinga);
  console.log("Capacidad de levante en datosRecibidos:", datosRecibidos.capacidadLevante);

  const radioIzaje = parseFloat(datosRecibidos.radioIzaje) || 0;
  const radioMontaje = parseFloat(datosRecibidos.radioMontaje) || 0;
  const radioMaximo = Math.max(radioIzaje, radioMontaje);
  const medidaS1Maniobra = parseFloat(datosRecibidos.medidaS1Maniobra) || 0;
  const medidaS2Maniobra = parseFloat(datosRecibidos.medidaS2Maniobra) || 0;  
  const cantidadManiobra = parseInt(datosRecibidos.cantidadManiobra, 10) || 0;

  const pesoManiobraUnitario = maniobraOptions.find(m => m.label === datosRecibidos.eslingaOEstrobo)?.peso || 0;

  const tipoGrillete = datosRecibidos.tipoGrillete || 'N/A';
  const pesoGrilleteUnitario = grilleteOptions.find(g => g.pulgada === tipoGrillete)?.peso || 0;
  const cantidadGrilletes = parseFloat(datosRecibidos.cantidadGrilletes) || 0;

  const datosTablaPesoAparejos = [];
  let totalPesoAparejos = 0;

  for (let i = 0; i < cantidadManiobra; i++) {
    if (datosRecibidos.eslingaOEstrobo) {
      const itemLabel = cantidadManiobra === 1 ? 'S1' : cantidadManiobra === 2 ? (i === 0 ? 'S1' : 'S2') : cantidadManiobra === 4 ? (i < 2 ? 'S1' : 'S2') : `Ítem ${i + 1}`;
      const largo = cantidadManiobra === 1 ? medidaS1Maniobra : cantidadManiobra === 2 ? (i === 0 ? medidaS1Maniobra : medidaS2Maniobra) : cantidadManiobra === 4 ? (i < 2 ? medidaS1Maniobra : medidaS2Maniobra) : 'N/A';
      const pesoGrilleteFila = tipoGrillete !== 'N/A' ? pesoGrilleteUnitario : 0;
      const pesoTotalFila = pesoManiobraUnitario + pesoGrilleteFila;
      totalPesoAparejos += pesoTotalFila;

      datosTablaPesoAparejos.push({
        item: itemLabel,
        descripcion: datosRecibidos.eslingaOEstrobo.type || datosRecibidos.eslingaOEstrobo,
        largo: `${largo} m`,
        pesoUnitarioManiobra: `${pesoManiobraUnitario} ton`,
        grillete: tipoGrillete !== 'N/A' ? tipoGrillete + '"' : 'N/A',
        pesoUnitarioGrillete: tipoGrillete !== 'N/A' ? `${pesoGrilleteUnitario} ton` : 'N/A',
        pesoTotalFila: `${pesoTotalFila.toFixed(2)} ton`,
      });
    }
  }

  if (cantidadManiobra === 0 && datosRecibidos.tipoGrillete) {
    totalPesoAparejos += (pesoGrilleteUnitario * cantidadGrilletes);
    datosTablaPesoAparejos.push({
      item: 'Grillete',
      descripcion: `Grillete de ${tipoGrillete}"`,
      largo: 'N/A',
      pesoUnitarioManiobra: 'N/A',
      grillete: tipoGrillete + '"',
      pesoUnitarioGrillete: `${pesoGrilleteUnitario} ton`,
      pesoTotalFila: `${(pesoGrilleteUnitario * cantidadGrilletes).toFixed(2)} ton`,
    });
  }

  const pesoEquipo = parseFloat(datosRecibidos.peso) || 0;
  const pesoGancho = parseFloat(datosRecibidos.pesoGancho) || 0;
  const pesoCable = parseFloat(datosRecibidos.pesoCable) || 0;
  const pesoTotal = totalPesoAparejos + pesoEquipo + pesoGancho + pesoCable;

  const capacidadLevante = parseFloat(datosRecibidos.capacidadLevante) || 0;
  const porcentajeUtilizacion = capacidadLevante > 0
    ? Number(((pesoTotal / capacidadLevante) * 100).toFixed(1))
    : 0;

  const anguloTrabajo = cantidadManiobra > 1 && datosRecibidos.anguloEslinga ? datosRecibidos.anguloEslinga : '0°';

  const datosTablaManiobra = [
    { descripcion: 'Peso elemento',       cantidad: { valor: pesoEquipo,        unidad: 'ton' } },
    { descripcion: 'Peso aparejos',       cantidad: { valor: totalPesoAparejos.toFixed(2), unidad: 'ton' } },
    { descripcion: 'Peso gancho',         cantidad: { valor: pesoGancho,       unidad: 'ton' } },
    { descripcion: 'Peso cable',          cantidad: { valor: pesoCable,        unidad: 'ton' } },
    { descripcion: 'Peso total',          cantidad: { valor: pesoTotal.toFixed(2),     unidad: 'ton' } },
    { descripcion: 'Radio de trabajo máximo', cantidad: { valor: radioMaximo,     unidad: 'm'   } },
    { descripcion: 'Ángulo de trabajo',   cantidad: anguloTrabajo },
    { descripcion: 'Capacidad de levante',cantidad: { valor: capacidadLevante,   unidad: 'ton' } },
    { descripcion: '% Utilización',       cantidad: { valor: porcentajeUtilizacion, unidad: '%' } },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: datosRecibidos.nombreGrua || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: datosRecibidos.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: datosRecibidos.anguloInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${datosRecibidos.contrapeso || 0} ton` },
  ];
  
  console.log("datosTablaPesoAparejos antes de retornar:", datosTablaPesoAparejos);

  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaPesoAparejos,
  };
};