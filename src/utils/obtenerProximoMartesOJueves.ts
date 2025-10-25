export function obtenerProximoMartesoJueves(): Date {
  const fechaActual = new Date();
  const timeZone = 'America/Montevideo';
  const fechaUruguay = new Date(
    fechaActual.toLocaleString('en-US', { timeZone }),
  );

  const diaActual = fechaUruguay.getDay();

  let diasHastaMartes = (2 - diaActual + 7) % 7 || 7;
  let diasHastaJueves = (4 - diaActual + 7) % 7 || 7;

  if (diaActual === 2) diasHastaMartes = 7;
  if (diaActual === 4) diasHastaJueves = 7;

  const diasParaAgregar = Math.min(diasHastaMartes, diasHastaJueves);

  const fechaResultado = new Date(fechaUruguay);
  fechaResultado.setDate(fechaUruguay.getDate() + diasParaAgregar);
  fechaResultado.setHours(0, 0, 0, 0);

  return fechaResultado;
}
