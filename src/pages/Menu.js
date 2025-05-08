import MenuHam from '../components/MenuHambuerguesa';
import CabeceraMenu from '../components/CabeceraMenu';
import TarjetasMenu from '../components/TarjetasMenu';
import '../styles/menu.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { API_BASE_URL } from '../config';

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Menu() {
const { categoria } = useParams();
const [productos, setProductos] = useState([]);
// eslint-disable-next-line no-unused-vars
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const {
  cantidades,
  aumentarCantidad,
  disminuirCantidad,
  añadirAlCarrito
} = useCarrito();

const [busqueda, setBusqueda] = useState("");
const [productosFiltrados, setProductosFiltrados] = useState([]);

useEffect(() => {
  const fetchProductos = async () => {
    try {
      const url = busqueda
        ? `${API_BASE_URL}/buscar_productos.php?nombre=${encodeURIComponent(busqueda)}`
        : `${API_BASE_URL}/productos.php?categoria=${categoria}`;
  
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json', // Importante para POST/PUT
          'Accept': 'application/json'       // Indica que esperas JSON
        },
        mode: 'cors' // Asegura que es una solicitud CORS
      });
  
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
  
      const data = await res.json();
      setProductosFiltrados(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message); // Actualiza el estado de error
    }
  };
  fetchProductos();
}, [busqueda, categoria]);

const categoriasDisponibles = {
  "entradas": { textActivo: "Entradas", otrasCategorias: ["Platos fuertes", "Postres"] },
  "platos fuertes": { textActivo: "Platos fuertes", otrasCategorias: ["Entradas", "Postres"] },
  "postres": { textActivo: "Postres", otrasCategorias: ["Entradas", "Platos fuertes"] },
};

useEffect(() => {
const obtenerProductos = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/productos.php?categoria=${encodeURIComponent(categoria)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    setProductos(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
  };
  obtenerProductos();
}, [categoria]);

const configCategoria = categoriasDisponibles[categoria.toLowerCase()] || {
  textActivo: capitalizar(categoria),
  otrasCategorias: []
};

if (error) return <div>Error: {error}</div>;

return (
<section id="cuerpo-menu" className="fade-in">        
  <MenuHam/>
  
  <CabeceraMenu
    textActivo={configCategoria.textActivo}
    otrasCategorias={configCategoria.otrasCategorias}
    busqueda={busqueda}
    setBusqueda={setBusqueda}
  />

  <TarjetasMenu
    productos={busqueda ? productosFiltrados : productos}
    cantidades={cantidades}
    aumentarCantidad={aumentarCantidad}
    disminuirCantidad={disminuirCantidad}
    añadirAlCarrito={añadirAlCarrito}
    categoria={categoria}
  />
</section>
);
}