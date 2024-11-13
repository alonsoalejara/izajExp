import React from 'react';
import { View } from 'react-native';
import SelectFiguraModal from './SelectFiguraModal';
import SelectGruaModal from './SelectGruaModal';
import SelectManiobraModal from './SelectManiobraModal';
import InputUnidad from './InputUnidad';
import { useIzaje } from '../hooks/useIzajeForm';

const SetupIzajeForm = () => {
  const {
    gruas,
    maniobras,
    figuras,
    unidades,
    selectedGrua,
    selectedManeuverType,
    selectedManeuverQuantity,
    selectedFigura,
    selectedUnidad,
    handleGruaSelect,
    handleManiobraSelect,
    handleManiobraQuantitySelect,
    handleFiguraSelect,
    handleUnidadSelect,
    validateGrua,
    validateManiobra,
    calculateFiguraArea,
    convertToUnidad,
  } = useIzaje();

  return (
    <View>
      <SelectGruaModal visible={true} onClose={handleGruaSelect} />
      <SelectFiguraModal visible={true} onClose={handleFiguraSelect} />
      <SelectManiobraModal visible={true} tipo="Numero" onClose={handleManiobraQuantitySelect} />
      <SelectManiobraModal visible={true} tipo="Eslinga" onClose={handleManiobraSelect} />
      <InputUnidad 
        selectedUnidad={selectedUnidad} 
        handleUnidadSelect={handleUnidadSelect}
        handleChangeUnidad={convertToUnidad}
      />
    </View>
  );
};

export default SetupIzajeForm;