import { obtenerProximoMartesoJueves } from './obtenerProximoMartesOJueves';

const fechaActual = new Date();
const proximaFecha = obtenerProximoMartesoJueves();

console.log(
  'Fecha actual (UY):',
  fechaActual.toLocaleString('es-UY', { timeZone: 'America/Montevideo' }),
);
console.log(
  'Próxima fecha:',
  proximaFecha.toLocaleString('es-UY', { timeZone: 'America/Montevideo' }),
);
