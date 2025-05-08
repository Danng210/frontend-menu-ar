/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// Para resolver problemas de HTTPS, tienes dos opciones:

// OPCIÓN 1: URL directa con HTTPS (cuando actives SSL en InfinityFree)
const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api';

// OPCIÓN 2: Usando un proxy CORS (descomenta esta línea si la opción 1 no funciona)
// const API_BASE_URL = 'https://corsproxy.io/?http://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
