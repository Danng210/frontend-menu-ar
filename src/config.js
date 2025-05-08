/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// Volvemos a probar con un proxy CORS más seguro
const API_BASE_URL = 'https://api.allorigins.win/raw?url=https://mipaginaprueba.rf.gd/api';

// Otras opciones que hemos probado:
// const API_BASE_URL = '/api'; // Opción con redirecciones Netlify
// const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api'; // URL directa 
// const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://corsproxy.io/?https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
