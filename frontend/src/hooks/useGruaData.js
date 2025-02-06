import { useMemo } from 'react';

const useGruaData = (data, selectedGrua) => {
    return useMemo(() => {
        if (!data || !selectedGrua) return [];

        const gruaSeleccionadaData = data.find(grua => grua.nombre === selectedGrua);

        if (!gruaSeleccionadaData) return [];

        return [
            { item: '1', descripcion: 'LARGO PLUMA', valor: `${gruaSeleccionadaData.largoPluma} m` },
            { item: '2', descripcion: 'CONTRAPESO', valor: `${gruaSeleccionadaData.contrapeso} kg` }
        ];
    }, [data, selectedGrua]);
};

export default useGruaData;