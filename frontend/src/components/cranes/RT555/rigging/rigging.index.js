import React from 'react'; // Necesitas importar React para usar JSX (el <View>)
import { View } from 'react-native'; // Necesitas View si vas a envolver AparejosGrua

import AparejosGrua from "./AparejosGrua";

// Este componente ahora puede aceptar props si es necesario,
// o simplemente definir las dimensiones para AparejosGrua
const Rigging = ({}) => { // Puedes añadir props aquí si Rigging también necesita ser configurable
    // Define las dimensiones que quieres para AparejosGrua
    const myContainerWidth = 50;
    const myContainerHeight = 55;

    return (
        <View>
            <AparejosGrua
                containerWidth={myContainerWidth}
                containerHeight={myContainerHeight}
            />
            {/* Puedes añadir otros componentes de rigging aquí si los tienes */}
        </View>
    );
};

export default Rigging;