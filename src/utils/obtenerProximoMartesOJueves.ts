export function obtenerProximoMartesoJueves(fecha: Date = new Date()): Date {
  const fechaLocal = new Date(fecha.getTime() - 3 * 60 * 60 * 1000);
  const diaSemana = fechaLocal.getDay();

  const diasHastaMartes = (2 - diaSemana + 7) % 7 || 7;
  const diasHastaJueves = (4 - diaSemana + 7) % 7 || 7;

  const diasParaAgregar = Math.min(diasHastaMartes, diasHastaJueves);

  return new Date(
    fechaLocal.getFullYear(),
    fechaLocal.getMonth(),
    fechaLocal.getDate() + diasParaAgregar,
    0,
    0,
    0,
    0,
  );
}
