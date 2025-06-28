import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { API_BASE_URL } from '../config';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
const [carrito, setCarrito] = useState([]);
const [cantidades, setCantidades] = useState({});
const [preferencias, setPreferencias] = useState('');
const [metodoPago, setMetodoPago] = useState('');
const [pedidoRealizado, setPedidoRealizado] = useState(false);
// Nuevos estados para el número de mesa y el nombre del cliente
const [numeroMesa, setNumeroMesa] = useState('');
const [nombreCliente, setNombreCliente] = useState('');

const [toastVisible, setToastVisible] = useState(false);
const [toastMensaje, setToastMensaje] = useState('');

const mostrarToast = (mensaje) => {
  setToastMensaje(mensaje);
  setToastVisible(true);
  setTimeout(() => setToastVisible(false), 3000);
};

const aumentarCantidad = (idProducto) => {
  setCantidades(prev => ({
    ...prev,
    [idProducto]: (prev[idProducto] || 1) + 1
  }));
};

const disminuirCantidad = (idProducto) => {
  setCantidades(prev => ({
    ...prev,
    [idProducto]: Math.max((prev[idProducto] || 1) - 1, 1)
  }));
};

const añadirAlCarrito = (producto) => {
const cantidad = cantidades[producto.ID_PRODUCTO] || 1;
const existe = carrito.find(item => item.id === producto.ID_PRODUCTO);

if (existe) {
  setCarrito(prev =>
    prev.map(item =>
      item.id === producto.ID_PRODUCTO
        ? {
            ...item,
            cantidad: item.cantidad + cantidad,
            subtotal: (item.cantidad + cantidad) * item.precio_unidad
          }
        : item
    )
  );
} else {
  setCarrito(prev => [
    ...prev,
    {
      id: producto.ID_PRODUCTO,
      nombre: producto.NOMBRE_PRODUCTO,
      cantidad,
      precio_unidad: parseFloat(producto.PRECIO),
      subtotal: parseFloat(producto.PRECIO) * cantidad
    }
  ]);
}
  mostrarToast('Producto añadido al carrito');
};

const eliminarDelCarrito = (idProducto) => {
  setCarrito(prev => prev.filter(item => item.id !== idProducto));
  mostrarToast('Producto eliminado del carrito');
};

const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

const realizarPedido = async () => {
  if (carrito.length === 0) {
    mostrarToast('El carrito está vacío');
    return false;
  }
  if (!metodoPago) {
    mostrarToast('Debe seleccionar un método de pago');
    return false;
  }
  // Validar que los nuevos campos no estén vacíos
  if (!numeroMesa) {
    mostrarToast('Por favor, ingrese el número de mesa');
    return false;
  }
  if (!nombreCliente) {
    mostrarToast('Por favor, ingrese el nombre del cliente responsable');
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/realizar_pedido.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carrito, preferencias, metodo_pago: metodoPago, total })
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('ultimoPedido', result.id_pedido);
      mostrarToast('Pedido realizado exitosamente');
      setCarrito([]);
      setCantidades({});
      setPreferencias('');
      setMetodoPago('');
      setNumeroMesa(''); // Resetear el número de mesa
      setNombreCliente(''); // Resetear el nombre del cliente
      setPedidoRealizado(true);
      return true;
    } else {
      mostrarToast('Error al realizar el pedido: ' + result.message);
      return false;
    }
  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    mostrarToast('Error de red al realizar el pedido');
    return false;
  }
};

return (
  <CarritoContext.Provider
    value={{
      carrito,
      cantidades,
      preferencias,
      metodoPago,
      total,
      setPreferencias,
      setMetodoPago,
      numeroMesa, // Se expone el estado del número de mesa
      setNumeroMesa, // Se expone el setter del número de mesa
      nombreCliente, // Se expone el estado del nombre del cliente
      setNombreCliente, // Se expone el setter del nombre del cliente
      aumentarCantidad,
      disminuirCantidad,
      añadirAlCarrito,
      eliminarDelCarrito,
      realizarPedido,
      mostrarToast,
      pedidoRealizado
    }}
  >
    {children}
    <Toast mensaje={toastMensaje} visible={toastVisible} />
  </CarritoContext.Provider>
);
}

export const useCarrito = () => useContext(CarritoContext);
