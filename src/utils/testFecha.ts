import { obtenerProximoMartesoJueves } from './obtenerProximoMartesOJueves';

const fechaActual = new Date();
const proximaFecha = obtenerProximoMartesoJueves();

console.log('Fecha actual (UY):', fechaActual);
console.log('Próxima fecha:', proximaFecha);
