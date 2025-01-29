import { useMemo } from 'react';

const useGruaData = (data, grúaSeleccionada) => {
    return useMemo(() => {
        if (!data || !grúaSeleccionada) return [];

        const gruaSeleccionadaData = data.find(grua => grua.nombre === grúaSeleccionada);

        if (!gruaSeleccionadaData) return [];

        return [
            { item: '1', descripcion: 'LARGO PLUMA', valor: `${gruaSeleccionadaData.largoPluma} m` },
            { item: '2', descripcion: 'CONTRAPESO', valor: `${gruaSeleccionadaData.contrapeso} kg` }
        ];
    }, [data, grúaSeleccionada]);
};

export default useGruaData;