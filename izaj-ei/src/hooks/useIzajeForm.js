import { useState } from 'react';
import { getGruas, validateGruaSelection } from '../logic/gruaLogic';
import { getManiobras, validateManiobraSelection } from '../logic/maniobraLogic';
import { getFiguras, calculateArea } from '../logic/figuraLogic';
import { getUnidades, convertUnit } from '../logic/unidadLogic';

export const useIzaje = () => {
  const [selectedGrua, setSelectedGrua] = useState(null);
  const [selectedManeuverType, setSelectedManeuverType] = useState(null);
  const [selectedManeuverQuantity, setSelectedManeuverQuantity] = useState(null);
  const [selectedFigura, setSelectedFigura] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  const gruas = getGruas();
  const maniobras = getManiobras();
  const figuras = getFiguras();
  const unidades = getUnidades();

  const handleGruaSelect = (grua) => {
    setSelectedGrua(grua);
  };

  const handleManiobraSelect = (maneuver) => {
    setSelectedManeuverType(maneuver);
  };

  const handleManiobraQuantitySelect = (quantity) => {
    setSelectedManeuverQuantity(quantity);
  };

  const handleFiguraSelect = (figura) => {
    setSelectedFigura(figura);
  };

  const handleUnidadSelect = (unidad) => {
    setSelectedUnidad(unidad);
  };

  const validateGrua = () => validateGruaSelection(selectedGrua);
  const validateManiobra = () => validateManiobraSelection(selectedManeuverType, selectedManeuverQuantity);
  const calculateFiguraArea = (dimensiones) => calculateArea(selectedFigura, dimensiones);
  const convertToUnidad = (value) => convertUnit(value, selectedUnidad);

  return {
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
  };
};
