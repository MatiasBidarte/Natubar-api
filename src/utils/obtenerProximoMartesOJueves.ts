export function obtenerProximoMartesoJueves(): Date {
  console.log('--- Inicio cálculo próxima fecha ---');

  const fechaActual = new Date();
  console.log('1. Fecha actual (UTC):', fechaActual.toISOString());

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
  console.log('2. Fecha en Uruguay:', fechaUruguay);

  const diaActual = fechaUruguay.getDay();
  console.log('3. Día actual (0=domingo, 1=lunes, ..., 6=sábado):', diaActual);

  let diasHastaMartes = (2 - diaActual + 7) % 7 || 7;
  let diasHastaJueves = (4 - diaActual + 7) % 7 || 7;
  console.log('4. Días hasta martes:', diasHastaMartes);
  console.log('4. Días hasta jueves:', diasHastaJueves);

  if (diaActual === 2) {
    diasHastaMartes = 7;
    console.log('5. Hoy es martes, ajustando a próximo martes (+7)');
  }
  if (diaActual === 4) {
    diasHastaJueves = 7;
    console.log('5. Hoy es jueves, ajustando a próximo jueves (+7)');
  }

  const diasParaAgregar = Math.min(diasHastaMartes, diasHastaJueves);
  console.log(
    '6. Días a agregar (mínimo entre martes y jueves):',
    diasParaAgregar,
  );

  // Crear nueva fecha resultado usando UTC para evitar problemas de zona horaria
  const fechaResultado = new Date(
    Date.UTC(
      fechaUruguay.getFullYear(),
      fechaUruguay.getMonth(),
      fechaUruguay.getDate() + diasParaAgregar,
      0,
      0,
      0,
      0,
    ),
  );

  console.log('7. Fecha resultado:', fechaResultado);
  console.log('--- Fin cálculo próxima fecha ---');

  return fechaResultado;
}
