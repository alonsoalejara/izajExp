export const setupIzajeLogic = {
    editSetupIzaje: (setups, editedSetup) =>
      setups.map((setup) =>
        setup._id === editedSetup._id ? editedSetup : setup
      ),
    
    deleteSetupIzaje: (setups, idToDelete) =>
      setups.filter((setup) => setup._id !== idToDelete),
  };