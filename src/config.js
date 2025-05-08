/**
 * Configuración global de la API
 * Centraliza la URL base para facilitar cambios futuros
 */

// URL base de la API original
const API_URL = 'https://mipaginaprueba.rf.gd/api';

// Función para construir URLs con proxy CORS
const buildProxyUrl = (endpoint, params = {}) => {
  // Construir la URL completa incluyendo endpoint y parámetros
  let fullUrl = `${API_URL}/${endpoint}`;
  
  // Añadir parámetros a la URL si existen
  const queryParams = new URLSearchParams(params).toString();
  if (queryParams) {
    fullUrl += `?${queryParams}`;
  }
  
  // Codificar la URL completa y crear la URL del proxy
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
};

// Mantenemos API_BASE_URL por compatibilidad con el código existente
const API_BASE_URL = API_URL;

// Exportamos todas las variables/funciones necesarias
export { API_URL, buildProxyUrl, API_BASE_URL };
