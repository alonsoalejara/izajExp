import React from 'react';
import { View } from 'react-native';
import SelectFormaModal from '../../ModalForma';
import SelectGruaModal from '../../ModalGrua';
import SelectManiobraModal from '../../ModalManiobra';
import InputUnidad from '../InputUnidad';
import { useIzaje } from '../../hooks/useIzajeForm';

const SetupIzajeForm = () => {
  const {
    gruas,
    maniobras,
    formas,
    unidades,
    selectedGrua,
    selectedManeuverType,
    selectedManeuverQuantity,
    selectedForma,
    selectedUnidad,
    handleGruaSelect,
    handleManiobraSelect,
    handleManiobraQuantitySelect,
    handleFormaSelect,
    handleUnidadSelect,
    validateGrua,
    validateManiobra,
    calculateFormaArea,
    convertToUnidad,
  } = useIzaje();

  return (
    <View>
      <SelectGruaModal visible={true} onClose={handleGruaSelect} />
      <SelectFormaModal visible={true} onClose={handleFormaSelect} />
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