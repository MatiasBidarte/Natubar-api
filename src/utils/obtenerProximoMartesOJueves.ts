export function obtenerProximoMartesoJueves(): Date {
  console.log('--- Inicio cálculo próxima fecha ---');

  const fechaActual = new Date();
  console.log('1. Fecha actual (UTC):', fechaActual.toISOString());

  const timeZone = 'America/Montevideo';
  const fechaUruguay = new Date(
    fechaActual.toLocaleString('en-US', { timeZone }),
  );
  console.log(
    '2. Fecha en Uruguay:',
    fechaUruguay.toLocaleString('es-UY', { timeZone }),
  );

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

  // Crear fecha resultado usando formato ISO y zona horaria específica
  const fechaBase = new Date(fechaUruguay);
  fechaBase.setDate(fechaBase.getDate() + diasParaAgregar);

  // Formar string de fecha en formato ISO con hora 00:00:00
  const fechaStr = `${fechaBase.getFullYear()}-${String(fechaBase.getMonth() + 1).padStart(2, '0')}-${String(fechaBase.getDate()).padStart(2, '0')}T00:00:00`;

  // Crear fecha final usando el string ISO y asegurando zona horaria
  const fechaFinal = new Date(fechaStr);

  console.log(
    '7. Fecha resultado:',
    fechaFinal.toLocaleString('es-UY', { timeZone }),
  );
  console.log('--- Fin cálculo próxima fecha ---');

  return fechaFinal;
}
