export const adminLogic = {
    addCollaborator: (collaborators, newCollaborator) => [...collaborators, newCollaborator],
    editCollaborator: (collaborators, editedCollaborator) =>
      collaborators.map((collaborator) =>
        collaborator.rut === editedCollaborator.rut ? editedCollaborator : collaborator
      ),
    deleteCollaborator: (collaborators, rutToDelete) =>
      collaborators.filter((collaborator) => collaborator.rut !== rutToDelete),
  };