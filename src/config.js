/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// Diferentes opciones de proxy CORS
// const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api'; // URL directa (da error de CORS)

// Opción 1: proxy cors-anywhere (más confiable)
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://mipaginaprueba.rf.gd/api';

// Opción 2: proxy corsproxy.io (alternativa)
// const API_BASE_URL = 'https://corsproxy.io/?https://mipaginaprueba.rf.gd/api';

// Opción 3: proxy thingproxy (otra alternativa)
// const API_BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
