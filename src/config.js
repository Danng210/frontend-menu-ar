/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// Para resolver problemas de HTTPS, tienes dos opciones:

// OPCIÓN 1: URL directa con HTTPS (cuando actives SSL en InfinityFree)
// const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api';

// OPCIÓN 2: Usando un proxy CORS (solución inmediata para problemas de CORS)
// Probando otro servicio de proxy ya que corsproxy.io puede tener limitaciones
const API_BASE_URL = 'https://api.allorigins.win/raw?url=http://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
