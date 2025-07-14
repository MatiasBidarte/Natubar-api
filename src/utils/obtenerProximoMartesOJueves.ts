export function obtenerProximoMartesoJueves(fecha: Date = new Date()): Date {
  const hoy = fecha.getDay();
  const martes = 2;
  const miercoles = 3;
  const jueves = 4;
  const viernes = 5;
  const sabado = 6;
  const domingo = 0;
  const lunes = 1;

  let diasParaAgregar = 0;

  switch (hoy) {
    case martes:
      diasParaAgregar = 2;
      break;
    case miercoles:
      diasParaAgregar = 1;
      break;
    case jueves:
      diasParaAgregar = 5;
      break;
    case viernes:
      diasParaAgregar = 4;
      break;
    case sabado:
      diasParaAgregar = 3;
      break;
    case domingo:
      diasParaAgregar = 2;
      break;
    case lunes:
      diasParaAgregar = 1;
      break;
  }

  const proximaFecha = new Date(fecha);
  proximaFecha.setDate(fecha.getDate() + diasParaAgregar);

  return proximaFecha;
}
