import { useState, useEffect } from 'react';

const useCargaData = (data, selectedGrua, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga) => {
    const [cargaRows, setCargaRows] = useState([
        { item: '1', descripcion: 'PESO DEL EQUIPO', valor: 'N/A' },
        { item: '2', descripcion: 'PESO DE APAREJOS', valor: 'N/A' },
        { item: '3', descripcion: 'PESO DEL GANCHO', valor: 'N/A' },
        { item: '4', descripcion: 'PESO TOTAL', valor: 'N/A' },
        { item: '5', descripcion: 'RADIO DE TRABAJO MÁX', valor: 'N/A' },
        { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: 'N/A' },
        { item: '7', descripcion: '% UTILIZACIÓN', valor: 'N/A' }
    ]);

    useEffect(() => {
        const processData = () => {
            if (data && data.length > 0) {
                const gruaSeleccionadaData = data.find(grua => grua.nombre === selectedGrua.nombre);
                
                if (gruaSeleccionadaData) {
                    setCargaRows(prevRows => prevRows.map(row => {
                        switch(row.descripcion) {
                            case 'PESO DEL EQUIPO':
                                return { ...row, valor: `${gruaSeleccionadaData.pesoEquipo} kg` };
                            case 'PESO DEL GANCHO':
                                return { ...row, valor: `${gruaSeleccionadaData.pesoGancho} kg` };
                            case 'CAPACIDAD DE LEVANTE':
                                return { ...row, valor: `${gruaSeleccionadaData.capacidadLevante} kg` };
                            case 'RADIO DE TRABAJO MÁX':
                                const radioMax = Math.max(radioIzaje, radioMontaje);
                                return { ...row, valor: `${radioMax} mts` };
                            case 'PESO DE APAREJOS':
                                return { ...row, valor: `${totalPesoAparejos} kg` };
                            case 'PESO TOTAL':
                                return { ...row, valor: `${pesoTotalCarga} kg` };
                            default:
                                return row;
                        }
                    }));
                }
            }
        };                    
        processData();
    }, [data, selectedGrua, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga]);

    return cargaRows;
};

export default useCargaData;
