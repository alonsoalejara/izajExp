import { grilleteOptions } from '../data/grilleteData';
import { maniobraOptions } from '../data/maniobraData';

export const obtenerDatosTablas = (datosRecibidos = {}) => {
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

  const radioIzaje = parseFloat(datosRecibidos.radioIzaje) || 0;
  const radioMontaje = parseFloat(datosRecibidos.radioMontaje) || 0;
  const radioMaximo = Math.max(radioIzaje, radioMontaje);
  const medidaS1Maniobra = parseFloat(datosRecibidos.medidaS1Maniobra) || 0;
  const medidaS2Maniobra = parseFloat(datosRecibidos.medidaS2Maniobra) || 0;
  const cantidadManiobra = parseInt(datosRecibidos.cantidadManiobra, 10) || 0;

  // Obtener la descripción del tipo de aparejo (Eslinga/Estrobo) y su WLL.
  const tipoAparejoDescripcion = datosRecibidos.tipoAparejo || 'N/A'; // Ej: "Faja", "Cadena"
  const aparejoWLL = datosRecibidos.aparejoPorWLL || 'N/A'; // Ej: "10 ton", "2 ton"
  const tipoEslingaOEstrobo = datosRecibidos.eslingaOEstrobo || 'N/A'; // Ej: "Eslinga", "Estrobo"

  // Buscar el peso unitario de la maniobra (Eslinga/Estrobo)
  const pesoManiobraUnitario = maniobraOptions.find(m => m.label === tipoEslingaOEstrobo)?.peso || 0;

  const tipoGrillete = datosRecibidos.tipoGrillete || 'N/A';
  const pesoGrilleteUnitario = grilleteOptions.find(g => g.pulgada === tipoGrillete)?.peso || 0;
  const cantidadGrilletes = parseFloat(datosRecibidos.cantidadGrilletes) || 0;

  const datosTablaAparejosIndividuales = [];
  let totalPesoAparejos = 0;

  // Si hay aparejos de maniobra (eslingas/estrobo)
  for (let i = 0; i < cantidadManiobra; i++) {
    const itemLabel = `${tipoEslingaOEstrobo} ${i + 1}`; // Ej: "Eslinga 1", "Estrobo 2"
    const largo = cantidadManiobra === 1 ? medidaS1Maniobra : cantidadManiobra === 2 ? (i === 0 ? medidaS1Maniobra : medidaS2Maniobra) : cantidadManiobra === 4 ? (i < 2 ? medidaS1Maniobra : medidaS2Maniobra) : 'N/A';
    const pesoGrilleteFila = (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? pesoGrilleteUnitario : 0; // Asigna grilletes de forma individual
    const pesoTotalAparejoIndividual = pesoManiobraUnitario + pesoGrilleteFila;
    totalPesoAparejos += pesoTotalAparejoIndividual;

    datosTablaAparejosIndividuales.push({
      // Fila de descripción principal (Item y Descripción)
      descripcionPrincipal: {
        item: i + 1,
        descripcion: `${tipoEslingaOEstrobo} ${tipoAparejoDescripcion}`,
      },
      // Datos detallados para las filas siguientes
      detalles: [
        {
          label: 'Largo',
          valor: `${largo} m`,
        },
        {
          label: 'Peso',
          valor: `${pesoManiobraUnitario.toFixed(2)} ton`,
        },
        {
          label: 'Tensión',
          valor: 'N/A', // O
        },
        {
          label: 'Grillete',
          valor: (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? tipoGrillete + '"' : 'N/A',
        },
        {
          label: 'Peso Grillete',
          valor: (tipoGrillete !== 'N/A' && i < cantidadGrilletes) ? `${pesoGrilleteUnitario.toFixed(2)} ton` : 'N/A',
        },
      ],
    });
  }

  // Si no hay aparejos de maniobra pero sí grilletes, agregarlos como un ítem independiente.
  if (cantidadManiobra === 0 && datosRecibidos.tipoGrillete) {
    totalPesoAparejos += (pesoGrilleteUnitario * cantidadGrilletes);
    datosTablaAparejosIndividuales.push({
      descripcionPrincipal: {
        item: 1, // Si solo hay grilletes, será el item 1
        descripcion: `Grillete de ${tipoGrillete}"`,
      },
      detalles: [
        { label: 'Largo', valor: 'N/A' },
        { label: 'Peso', valor: 'N/A' },
        { label: 'Tensión', valor: 'N/A' }, // O 'Cálculo Pendiente'
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
    {
      item: 3,
      descripcion: 'Supervisor',
      nombre: getFullName(datosRecibidos.supervisor),
    },
    {
      item: 4,
      descripcion: 'Jefe Área',
      nombre: getFullName(datosRecibidos.jefeArea),
    },
  ];

  return {
    datosTablaManiobra,
    datosTablaGrua,
    datosTablaAparejosIndividuales,
    datosTablaProyecto,
  };
};