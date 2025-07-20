import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos = {}) => {
  // Registro de datos recibidos para depuración
  console.log("Datos recibidos en obtenerDatosTablas:");
  for (const key in datosRecibidos) {
    if (Object.hasOwnProperty.call(datosRecibidos, key)) {
      if (typeof datosRecibidos[key] === 'object' && datosRecibidos[key] !== null) {
        console.log(`  ${key}: ${JSON.stringify(datosRecibidos[key])}`);
      } else {
        console.log(`  ${key}: ${datosRecibidos[key]}`);
      }
    }
  }

  // Extracción y parseo de radios de trabajo
  const radioIzaje = parseFloat(datosRecibidos.radioIzaje) || 0;
  const radioMontaje = parseFloat(datosRecibidos.radioMontaje) || 0;
  const radioMaximo = Math.max(radioIzaje, radioMontaje);

  // Extracción y parseo de medidas de maniobra y cantidad
  const medidaS1Maniobra = parseFloat(datosRecibidos.medidaS1Maniobra) || 0;
  const medidaS2Maniobra = parseFloat(datosRecibidos.medidaS2Maniobra) || 0;
  const cantidadManiobra = parseInt(datosRecibidos.cantidadManiobra, 10) || 0;

  // Extracción de tipo de aparejo y WLL
  const tipoAparejoDescripcion = datosRecibidos.tipoAparejo || 'N/A';
  const aparejoWLL = datosRecibidos.aparejoPorWLL || 'N/A';
  const tipoEslingaOEstrobo = datosRecibidos.eslingaOEstrobo || 'N/A';

  // Búsqueda del peso unitario de la maniobra
  const pesoManiobraUnitario = maniobraOptions.find(m => m.label === tipoEslingaOEstrobo)?.peso || 0;

  // Extracción y cálculo de datos de grilletes
  const tipoGrillete = datosRecibidos.tipoGrillete || 'N/A';
  const pesoGrilleteUnitario = grilleteOptions.find(g => g.pulgada === tipoGrillete)?.peso || 0;
  const cantidadGrilletes = parseFloat(datosRecibidos.cantidadGrilletes) || 0;

  // Inicialización de arrays y acumuladores
  const datosTablaAparejosIndividuales = [];
  let totalPesoAparejos = 0;

  // Extracción del peso de la carga
  const pesoCarga = parseFloat(datosRecibidos.peso) || 0;
  // Altura por defecto para cálculo de tensión
  const alturaCargaGanchoPorDefecto = 1;

  // Cálculo de la tensión basada en la cantidad de aparejos
  let tensionCalculada = 0;
  if (cantidadManiobra === 1) {
    tensionCalculada = pesoCarga;
  } else if (cantidadManiobra === 2) {
    tensionCalculada = (pesoCarga / 2) * (1 / alturaCargaGanchoPorDefecto);
  } else if (cantidadManiobra === 4) {
    tensionCalculada = (pesoCarga / 3) * (1 / alturaCargaGanchoPorDefecto);
  }

  // Extracción de dimensiones y forma de la carga
  const anchoCarga = parseFloat(datosRecibidos.ancho) || 0;
  const largoCarga = parseFloat(datosRecibidos.largo) || 0;
  const altoCarga = parseFloat(datosRecibidos.alto) || 0;
  const diametroCarga = parseFloat(datosRecibidos.diametro) || 0;
  const formaCarga = datosRecibidos.forma || '';

  // Extracción y conversión del ángulo de eslinga a radianes
  const anguloEslingaStr = datosRecibidos.anguloEslinga || '0°';
  const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
  const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;

  // Determinación de la dimensión mayor de la carga
  let dimensionMayorCarga = 0;
  if (formaCarga === 'Cuadrado' || formaCarga === 'Rectangulo') {
    dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
  } else if (formaCarga === 'Cilindro') {
    dimensionMayorCarga = diametroCarga;
  }

  // Cálculo del largo del aparejo basado en la dimensión mayor y el ángulo
  let largoAparejoCalculado = 'N/A';
  if (dimensionMayorCarga > 0 && anguloEnGrados > 0 && anguloEnGrados < 90) {
    const ladoAdyacenteParaLargo = dimensionMayorCarga / 2;
    largoAparejoCalculado = (ladoAdyacenteParaLargo / Math.cos(anguloEnRadianes)).toFixed(2);
  }

  // Bucle para procesar cada aparejo de maniobra
  for (let i = 0; i < cantidadManiobra; i++) {
    const itemLabel = `${tipoEslingaOEstrobo} ${i + 1}`; // Etiqueta individual del aparejo

    // Asignación del largo del aparejo (calculado o de entrada)
    let largoAparejoActual = 'N/A';
    if (cantidadManiobra === 1) {
      largoAparejoActual = medidaS1Maniobra;
    } else if (cantidadManiobra === 2 || cantidadManiobra === 4) {
      largoAparejoActual = largoAparejoCalculado;
    }

    // Cálculo del peso del grillete para la fila actual
    const pesoGrilleteFila = (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? pesoGrilleteUnitario : 0;
    const pesoTotalAparejoIndividual = pesoManiobraUnitario + pesoGrilleteFila;
    totalPesoAparejos += pesoTotalAparejoIndividual;

    // Agrega los detalles del aparejo a la tabla
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

  // Manejo de grilletes si no hay aparejos de maniobra
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

  // Cálculo de pesos totales de la maniobra
  const pesoEquipo = parseFloat(datosRecibidos.peso) || 0;
  const pesoGancho = parseFloat(datosRecibidos.pesoGancho) || 0;
  const pesoCable = parseFloat(datosRecibidos.pesoCable) || 0;
  const pesoTotal = totalPesoAparejos + pesoEquipo + pesoGancho + pesoCable;

  // Cálculo de capacidad de levante y porcentaje de utilización
  const capacidadLevante = parseFloat(datosRecibidos.capacidadLevante) || 0;
  const porcentajeUtilizacion = capacidadLevante > 0
    ? Number(((pesoTotal / capacidadLevante) * 100).toFixed(1))
    : 0;

  // Determinación del ángulo de trabajo
  const anguloTrabajo = cantidadManiobra > 1 && datosRecibidos.anguloEslinga ? datosRecibidos.anguloEslinga : '0°';

  // Datos para la tabla de maniobra
  const datosTablaManiobra = [
    { descripcion: 'Peso elemento', cantidad: { valor: pesoEquipo, unidad: 'ton' } },
    { descripcion: 'Peso aparejos', cantidad: { valor: totalPesoAparejos.toFixed(2), unidad: 'ton' } },
    { descripcion: 'Peso gancho', cantidad: { valor: pesoGancho, unidad: 'ton' } },
    { descripcion: 'Peso cable', cantidad: { valor: pesoCable, unidad: 'ton' } },
    { descripcion: 'Peso total', cantidad: { valor: pesoTotal.toFixed(2), unidad: 'ton' } },
    { descripcion: 'Radio de trabajo máximo', cantidad: { valor: radioMaximo, unidad: 'm' } },
    { descripcion: 'Ángulo de trabajo', cantidad: anguloTrabajo },
    { descripcion: 'Capacidad de levante', cantidad: { valor: capacidadLevante, unidad: 'ton' } },
    { descripcion: '% Utilización', cantidad: { valor: porcentajeUtilizacion, unidad: '%' } },
  ];

  // Datos para la tabla de grúa
  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: datosRecibidos.nombreGrua || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: datosRecibidos.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: datosRecibidos.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${datosRecibidos.contrapeso || 0} ton` },
  ];

  // Función auxiliar para obtener nombre completo de personas
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

  // Datos para la tabla de proyecto
  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: datosRecibidos.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(datosRecibidos.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(datosRecibidos.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(datosRecibidos.jefeArea) },
  ];

  // Retorno de todas las tablas generadas
  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaAparejosIndividuales,
    datosTablaProyecto,
  };
};