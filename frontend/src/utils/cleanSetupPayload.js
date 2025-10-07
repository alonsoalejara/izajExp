export const cleanSetupPayload = (setup) => {
  const payload = JSON.parse(JSON.stringify(setup));

  const toId = (val) => (val && typeof val === 'object' && val._id ? val._id : val);

  payload.proyecto = toId(payload.proyecto);
  payload.capataz = toId(payload.capataz);
  payload.supervisor = toId(payload.supervisor);
  payload.jefeArea = toId(payload.jefeArea);
  payload.grua = toId(payload.grua);

  if (Array.isArray(payload.aparejos)) {
    payload.aparejos = payload.aparejos.map(({ _id, ...rest }) => rest);
  }

  return payload;
};
