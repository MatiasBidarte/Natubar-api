export function obtenerProximoMartesoJueves(): Date {
  const timeZone = 'America/Montevideo';
  const fechaUruguay = new Date(
    new Date().toLocaleString('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  );

  const diaActual = fechaUruguay.getDay();

  let diasHastaMartes = (2 - diaActual + 7) % 7 || 7;
  let diasHastaJueves = (4 - diaActual + 7) % 7 || 7;

  if (diaActual === 2) {
    diasHastaMartes = 7;
  }
  if (diaActual === 4) {
    diasHastaJueves = 7;
  }

  const diasParaAgregar = Math.min(diasHastaMartes, diasHastaJueves);

  const fechaResultado = new Date(
    Date.UTC(
      fechaUruguay.getFullYear(),
      fechaUruguay.getMonth(),
      fechaUruguay.getDate() + diasParaAgregar,
      12,
      0,
      0,
      0,
    ),
  );

  return fechaResultado;
}
