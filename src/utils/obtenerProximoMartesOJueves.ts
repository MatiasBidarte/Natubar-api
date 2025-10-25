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
} from 'date-fns';
import { subHours } from 'date-fns';

export function obtenerProximoMartesoJueves(fecha: Date = new Date()): Date {
  const fechaLocal = subHours(fecha, 3);

  const proximoMartes = isTuesday(fechaLocal)
    ? addDays(nextTuesday(fechaLocal), 7)
    : nextTuesday(fechaLocal);
  const proximoJueves = isThursday(fechaLocal)
    ? addDays(nextThursday(fechaLocal), 7)
    : nextThursday(fechaLocal);

  const fechaResultado =
    proximoMartes < proximoJueves ? proximoMartes : proximoJueves;

  return setMilliseconds(
    setSeconds(setMinutes(setHours(fechaResultado, 0), 0), 0),
    0,
  );
}
