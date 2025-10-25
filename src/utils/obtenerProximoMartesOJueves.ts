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
import { toZonedTime } from 'date-fns-tz';

export function obtenerProximoMartesoJueves(): Date {
  const timeZone = 'America/Montevideo';

  const fechaUruguay = toZonedTime(new Date(), timeZone);

  const proximoMartes = toZonedTime(
    isTuesday(fechaUruguay)
      ? addDays(nextTuesday(fechaUruguay), 7)
      : nextTuesday(fechaUruguay),
    timeZone,
  );

  const proximoJueves = toZonedTime(
    isThursday(fechaUruguay)
      ? addDays(nextThursday(fechaUruguay), 7)
      : nextThursday(fechaUruguay),
    timeZone,
  );

  const fechaResultado =
    proximoMartes < proximoJueves ? proximoMartes : proximoJueves;

  const fechaFinal = toZonedTime(
    setMilliseconds(
      setSeconds(setMinutes(setHours(fechaResultado, 0), 0), 0),
      0,
    ),
    timeZone,
  );

  return fechaFinal;
}
