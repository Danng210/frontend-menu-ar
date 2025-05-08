/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// URL directa a la API (funcionará cuando el .htaccess esté correctamente configurado)
const API_BASE_URL = 'https://mipaginaprueba.rf.gd/api';

// Otras opciones que hemos probado (por si necesitas volver a alguna):
// const API_BASE_URL = '/api'; // Opción con redirecciones Netlify
// const API_BASE_URL = 'https://api.allorigins.win/raw?url=https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://corsproxy.io/?https://mipaginaprueba.rf.gd/api';
// const API_BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://mipaginaprueba.rf.gd/api';

export { API_BASE_URL };
