import {
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isTuesday,
  isThursday,
  nextTuesday,
  nextThursday,
  addHours,
} from 'date-fns';

export function obtenerProximoMartesoJueves(): Date {
  const fechaServidor = new Date();

  const offsetUruguay = -3; // UTC-3
  const offsetET = fechaServidor.getTimezoneOffset() / 60; // Obtiene offset del servidor
  const diferenciaHoras = offsetUruguay - offsetET;
  const fechaUruguay = addHours(fechaServidor, diferenciaHoras);

  const proximoMartes = isTuesday(fechaUruguay)
    ? addDays(nextTuesday(fechaUruguay), 7)
    : nextTuesday(fechaUruguay);

  const proximoJueves = isThursday(fechaUruguay)
    ? addDays(nextThursday(fechaUruguay), 7)
    : nextThursday(fechaUruguay);

  const fechaResultado =
    proximoMartes < proximoJueves ? proximoMartes : proximoJueves;

  return setMilliseconds(
    setSeconds(setMinutes(setHours(fechaResultado, 0), 0), 0),
    0,
  );
}
