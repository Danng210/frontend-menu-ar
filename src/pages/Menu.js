import MenuHam from '../components/MenuHambuerguesa';
import CabeceraMenu from '../components/CabeceraMenu';
import TarjetasMenu from '../components/TarjetasMenu';
import '../styles/menu.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { API_BASE_URL, buildProxyUrl } from '../config';

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
    let url;
    if (busqueda) {
      // Usar buildProxyUrl para construir la URL con el proxy CORS
      url = buildProxyUrl('buscar_productos.php', { nombre: busqueda });
    } else {
      // Usar buildProxyUrl para construir la URL con el proxy CORS
      url = buildProxyUrl('productos.php', { categoria: categoria });
    }

    const res = await fetch(url);
    const data = await res.json();
    setProductosFiltrados(data);
  } catch (error) {
    console.error("Error al cargar productos:", error);
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
    // Usar buildProxyUrl para construir la URL con el proxy CORS
    const url = buildProxyUrl('productos.php', { categoria: categoria });
    const response = await fetch(url);
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