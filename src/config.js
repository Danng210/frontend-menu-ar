/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// Solución usando redirecciones de Netlify
// Esta es la mejor solución que funcionará con el archivo netlify.toml
const API_BASE_URL = '/api';

// Ya no necesitamos estas opciones de proxy CORS
// const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://corsproxy.io/?https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
