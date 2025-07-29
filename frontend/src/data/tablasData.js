import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos = {}) => {
  const radioIzaje = parseFloat(datosRecibidos.radioIzaje) || 0;
  const radioMontaje = parseFloat(datosRecibidos.radioMontaje) || 0;
  const radioMaximo = Math.max(radioIzaje, radioMontaje);

  const medidaS1Maniobra = parseFloat(datosRecibidos.medidaS1Maniobra) || 0;
  const medidaS2Maniobra = parseFloat(datosRecibidos.medidaS2Maniobra) || 0;
  const cantidadManiobra = parseInt(datosRecibidos.cantidadManiobra, 10) || 0;

  const tipoAparejoDescripcion = datosRecibidos.tipoAparejo || 'N/A';
  const aparejoWLL = datosRecibidos.aparejoPorWLL || 'N/A';
  const tipoEslingaOEstrobo = datosRecibidos.eslingaOEstrobo || 'N/A';

  const pesoManiobraUnitario = maniobraOptions.find(m => m.label === tipoEslingaOEstrobo)?.peso || 0;

  const tipoGrillete = datosRecibidos.tipoGrillete || 'N/A';
  const pesoGrilleteUnitario = grilleteOptions.find(g => g.pulgada === tipoGrillete)?.peso || 0;
  const cantidadGrilletes = parseFloat(datosRecibidos.cantidadGrilletes) || 0;

  const datosTablaAparejosIndividuales = [];
  let totalPesoAparejos = 0;

  const pesoCarga = parseFloat(datosRecibidos.peso) || 0;
  const alturaCargaGanchoPorDefecto = 1; // Este valor no afecta el cálculo de tension, solo es un factor en la formula

  let tensionCalculada = 0;
  if (cantidadManiobra === 1) {
    tensionCalculada = pesoCarga;
  } else if (cantidadManiobra === 2) {
    tensionCalculada = (pesoCarga / 2) * (1 / alturaCargaGanchoPorDefecto);
  } else if (cantidadManiobra === 4) {
    tensionCalculada = (pesoCarga / 3) * (1 / alturaCargaGanchoPorDefecto);
  }

  const anchoCarga = parseFloat(datosRecibidos.ancho) || 0;
  const largoCarga = parseFloat(datosRecibidos.largo) || 0;
  const altoCarga = parseFloat(datosRecibidos.alto) || 0; // H_carga
  const diametroCarga = parseFloat(datosRecibidos.diametro) || 0;
  const formaCarga = datosRecibidos.forma || '';

  const anguloEslingaStr = datosRecibidos.anguloEslinga || '0°';
  const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
  const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;

  let dimensionMayorCarga = 0;
  if (formaCarga === 'Cuadrado' || formaCarga === 'Rectangulo') {
    dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
  } else if (formaCarga === 'Cilindro') {
    dimensionMayorCarga = diametroCarga;
  }

  let largoAparejoCalculado = 'N/A'; // Para múltiples eslingas o eslinga simple con ángulo > 0
  if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
    const ladoAdyacenteParaLargo = dimensionMayorCarga / 2;
    largoAparejoCalculado = (ladoAdyacenteParaLargo / Math.cos(anguloEnRadianes)).toFixed(1);
  }

  const alturaDespeje = 1; // metros (H_despeje)
  const alturaGanchoBloque = 1.6; // metros (H_gancho, para Terex RT555)

  let largoEslingaCalculadoParaUnaSola = 'N/A';
  if (cantidadManiobra === 1) {
    const hCargaValida = altoCarga > 0 ? altoCarga : 0; // Asegura que altoCarga sea un número válido y positivo para el cálculo
    const calculatedLength = (hCargaValida + alturaDespeje) - alturaGanchoBloque;

    largoEslingaCalculadoParaUnaSola = calculatedLength > 0 ? calculatedLength.toFixed(1) : 'N/A'; // Solo setea el largo calculado si es un valor positivo, de lo contrario N/A
  }

  let distanciaGanchoElemento = 'N/A';
  if (cantidadManiobra === 1) { // Si la cantidad de maniobras es 1, usa el largo calculado para una sola eslinga.
    distanciaGanchoElemento = largoEslingaCalculadoParaUnaSola;
  } else if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
    const ladoAdyacenteParaAltura = dimensionMayorCarga / 2;
    distanciaGanchoElemento = (Math.tan(anguloEnRadianes) * ladoAdyacenteParaAltura).toFixed(1);
  }

  for (let i = 0; i < cantidadManiobra; i++) {
    const itemLabel = `${tipoEslingaOEstrobo} ${i + 1}`;

    let largoAparejoActual = 'N/A';
    if (cantidadManiobra === 1) {
      largoAparejoActual = largoEslingaCalculadoParaUnaSola; // Usa el largo calculado por la fórmula para una sola eslinga
    } else if (cantidadManiobra === 2 || cantidadManiobra === 4) {
      largoAparejoActual = largoAparejoCalculado;
    }

    const pesoGrilleteFila = (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? pesoGrilleteUnitario : 0;
    const pesoTotalAparejoIndividual = pesoManiobraUnitario + pesoGrilleteFila;
    totalPesoAparejos += pesoTotalAparejoIndividual;

    datosTablaAparejosIndividuales.push({
      descripcionPrincipal: {
        item: i + 1,
        descripcion: `${tipoEslingaOEstrobo} ${tipoAparejoDescripcion}`,
      },
      detalles: [
        { label: 'Largo', valor: `${largoAparejoActual} m` },
        { label: 'Peso', valor: `${pesoManiobraUnitario.toFixed(2)} ton` },
        { label: 'Tensión', valor: `${tensionCalculada.toFixed(1)} ton` },
        { label: 'Grillete', valor: (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? tipoGrillete + '"' : 'N/A' },
        { label: 'Peso Grillete', valor: (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? `${pesoGrilleteUnitario.toFixed(2)} ton` : 'N/A' },
      ],
    });
  }

  if (cantidadManiobra === 0 && datosRecibidos.tipoGrillete) {
    totalPesoAparejos += (pesoGrilleteUnitario * cantidadGrilletes);
    datosTablaAparejosIndividuales.push({
      descripcionPrincipal: {
        item: 1,
        descripcion: `Grillete de ${tipoGrillete}"`,
      },
      detalles: [
        { label: 'Largo', valor: 'N/A' },
        { label: 'Peso', valor: 'N/A' },
        { label: 'Tensión', valor: `${tensionCalculada.toFixed(1)} ton` },
        { label: 'Grillete', valor: tipoGrillete + '"' },
        { label: 'Peso Grillete', valor: `${pesoGrilleteUnitario.toFixed(2)} ton` },
      ],
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
    { descripcion: 'Peso elemento', cantidad: { valor: pesoEquipo, unidad: 'ton' } },
    { descripcion: 'Peso aparejos', cantidad: { valor: totalPesoAparejos.toFixed(2), unidad: 'ton' } },
    { descripcion: 'Peso gancho', cantidad: { valor: pesoGancho, unidad: 'ton' } },
    { descripcion: 'Peso cable', cantidad: { valor: pesoCable, unidad: 'ton' } },
    { descripcion: 'Peso total', cantidad: { valor: pesoTotal.toFixed(2), unidad: 'ton' } },
    { descripcion: 'Radio de trabajo máximo', cantidad: { valor: radioMaximo, unidad: 'm' } },
    { descripcion: 'Distancia gancho-elemento aprox.', cantidad: { valor: distanciaGanchoElemento, unidad: 'm' } },
    { descripcion: 'Ángulo de trabajo', cantidad: anguloTrabajo },
    { descripcion: 'Capacidad de levante', cantidad: { valor: capacidadLevante, unidad: 'ton' } },
    { descripcion: '% Utilización', cantidad: { valor: porcentajeUtilizacion, unidad: '%' } },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: datosRecibidos.nombreGrua || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: datosRecibidos.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: datosRecibidos.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${datosRecibidos.contrapeso || 0} ton` },
  ];

  const getFullName = (person) => {
    if (!person) return 'N/A';
    const tieneNombre = person.nombre && person.nombre.trim() !== '';
    const tieneApellido = person.apellido && person.apellido.trim() !== '';
    if (tieneNombre && tieneApellido) {
      return `${person.nombre} ${person.apellido}`;
    }
    if (person.username && person.username.trim() !== '') {
      return person.username;
    }
    return 'N/A';
  };

  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: datosRecibidos.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(datosRecibidos.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(datosRecibidos.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(datosRecibidos.jefeArea) },
  ];

  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaAparejosIndividuales,
    datosTablaProyecto,
  };
};