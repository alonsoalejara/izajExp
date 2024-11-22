import { useState } from 'react';
import { getGruas, validateGruaSelection } from '../logic/gruaLogic';
import { getManiobras, validateManiobraSelection } from '../logic/maniobraLogic';
import { getFormas, calculateArea } from '../logic/formaLogic';
import { getUnidades, convertUnit } from '../logic/unidadLogic';

export const useIzaje = () => {
  const [selectedGrua, setSelectedGrua] = useState(null);
  const [selectedManeuverType, setSelectedManeuverType] = useState(null);
  const [selectedManeuverQuantity, setSelectedManeuverQuantity] = useState(null);
  const [selectedForma, setSelectedForma] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  const gruas = getGruas();
  const maniobras = getManiobras();
  const formas = getFormas();
  const unidades = getUnidades();

  const handleGruaSelect = (grua) => setSelectedGrua(grua);
  const handleManiobraSelect = (maneuver) => setSelectedManeuverType(maneuver);
  const handleManiobraQuantitySelect = (quantity) => setSelectedManeuverQuantity(quantity);
  const handleFormaSelect = (forma) => setSelectedForma(forma);
  const handleUnidadSelect = (unidad) => setSelectedUnidad(unidad);

  const validateGrua = () => validateGruaSelection(selectedGrua);
  const validateManiobra = () => validateManiobraSelection(selectedManeuverType, selectedManeuverQuantity);
  const calculateFormaArea = (dimensiones) => calculateArea(selectedForma, dimensiones);
  const convertToUnidad = (value) => convertUnit(value, selectedUnidad);

  return {
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
  };
};