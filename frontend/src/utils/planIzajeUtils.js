export const getRows = (eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete) => [
    {
      item: '1',
      descripcion: `${eslingaOEstrobo.toUpperCase()}`,
      cantidad: cantidadManiobra,
      pesoUnitario: 27,
      pesoTotal: cantidadManiobra * 27,
    },
    {
      item: '2',
      descripcion: `Grillete ${tipoGrillete}"`.toUpperCase(),
      cantidad: cantidadGrilletes,
      pesoUnitario: 27,
      pesoTotal: cantidadGrilletes * 27,
    },
  ];
  
  export const getTotalPesoAparejos = (rows) => 
    rows.reduce((total, row) => total + row.pesoTotal, 0);
  
  export const getCargaRows = (selectedGrua, totalPesoAparejos, radioIzaje, radioMontaje) => {
    const pesoTotalCarga = (
      (typeof selectedGrua.pesoEquipo === 'number' ? selectedGrua.pesoEquipo : 0) +
      (typeof totalPesoAparejos === 'number' ? totalPesoAparejos : 0) +
      (typeof selectedGrua.pesoGancho === 'number' ? selectedGrua.pesoGancho : 0)
    );
  
    return [
      { item: '1', descripcion: 'PESO DEL EQUIPO', valor: `${selectedGrua.pesoEquipo || 0} kg` },
      { item: '2', descripcion: 'PESO DE APAREJOS', valor: `${totalPesoAparejos} kg` },
      { item: '3', descripcion: 'PESO GANCHO', valor: `${selectedGrua.pesoGancho || 0} kg` },
      { item: '4', descripcion: 'PESO TOTAL', valor: `${pesoTotalCarga} kg` },
      { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: `${Math.max(radioIzaje, radioMontaje)} mts` },
      { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${selectedGrua.capacidadLevante || 0} kg` },
      { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
    ];
  };
  
  export const getDatosGruaRows = (selectedGrua) => [
    { item: '1', descripcion: 'LARGO PLUMA', valor: `${selectedGrua.largoPluma || 0} mts` },
    { item: '2', descripcion: 'CONTRAPESO', valor: `${selectedGrua.contrapeso || 0} ton` },
  ];