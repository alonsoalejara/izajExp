const adminLogic = {
    addCollaborator: (collaborators, newCollaborator) => {
      return [...collaborators, newCollaborator];
    },
  
    editCollaborator: (collaborators, editedCollaborator) => {
      return collaborators.map((colaborador) =>
        colaborador.rut === editedCollaborator.rut ? editedCollaborator : colaborador
      );
    },
  
    deletePlan: (plans, index) => {
      return plans.filter((_, i) => i !== index);
    },
  
    togglePlanSelection: (selectedPlan, planId) => {
      return selectedPlan === planId ? null : planId;
    }
  };
  
  export default adminLogic;
  