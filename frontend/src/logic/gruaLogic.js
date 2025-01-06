export const gruaLogic = {
    addGrua: (gruas, newGrua) => [...gruas, newGrua],
    editGrua: (gruas, editedGrua) =>
      gruas.map((grua) =>
        grua._id === editedGrua._id ? editedGrua : grua
      ),
    deleteGrua: (gruas, idToDelete) =>
      gruas.filter((grua) => grua._id !== idToDelete),
  };
  