import React, { useState } from 'react';
import '../styles/vender.css';

// Componente de producto individual
function Producto({ producto, agregarProducto }) {
  return (
    <div className="producto">
      <h4>{producto.nombre}</h4>
      <p>Precio: ${producto.precio}</p>
      <button onClick={() => agregarProducto(producto)}>Agregar</button>
    </div>
  );
}

// Componente principal de ventas a la habitación
export function Vender() {
  const [habitacion, setHabitacion] = useState('');
  const [huesped, setHuesped] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '123456789',
    tipoDocumento: 'Pasaporte',
    numDocumento: 'AB1234567'
  });
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const productos = [
    { id: 1, nombre: 'Botella de Agua', precio: 2 },
    { id: 2, nombre: 'Snack', precio: 5 },
    { id: 3, nombre: 'Cena', precio: 20 },
    { id: 4, nombre: 'Desayuno', precio: 15 },
  ];

  const agregarProducto = (producto) => {
    setProductosSeleccionados([...productosSeleccionados, producto]);
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((total, producto) => total + producto.precio, 0);
  };

  const realizarVenta = () => {
    if (habitacion === '') {
      alert('Debe seleccionar una habitación');
      return;
    }
    console.log('Venta realizada:', { habitacion, huesped, productosSeleccionados });
    alert(`Venta realizada a la habitación ${habitacion}`);
    setProductosSeleccionados([]); // Limpiar la selección de productos
    setHabitacion(''); // Limpiar la habitación seleccionada
  };

  return (
    <div className="contenido">
      <div class="titulo-contenido"><h4>Vender</h4></div>

      <div className='vender'>

        <div className="datos-superior">
          <div className="datos-habitacion">
            <h3>Datos de la Habitación</h3>
            <p><strong>Número:</strong> {habitacion}</p>
            <p><strong>Tipo:</strong> Suite</p>
            <p><strong>Estado:</strong> Ocupada</p>
            <p><strong>Precio:</strong> $200</p>
          </div>
          <div className="datos-huesped">
            <h3>Datos del Huésped</h3>
            <p><strong>Nombre:</strong> {huesped.nombre}</p>
            <p><strong>Apellido:</strong> {huesped.apellido}</p>
            <p><strong>Email:</strong> {huesped.email}</p>
            <p><strong>Teléfono:</strong> {huesped.telefono}</p>
            <p><strong>Tipo Documento:</strong> {huesped.tipoDocumento}</p>
            <p><strong>Número Documento:</strong> {huesped.numDocumento}</p>
          </div>
        </div>
        
          <div className="productos">
            <h3>Productos</h3>
            {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} agregarProducto={agregarProducto} />
            ))}
          </div>

          <div className="carrito">
            <h3>Carrito</h3>
            <ul>
              {productosSeleccionados.map((producto, index) => (
                <li key={index}>
                  {producto.nombre} - ${producto.precio}
                  <button onClick={() => agregarProducto(producto)}>Quitar</button>
                </li>
              ))}
            </ul>
            <h4>Total: ${calcularTotal()}</h4>
            <button onClick={realizarVenta} className="boton-submit">
              Realizar Venta
            </button>
          </div>
        



      </div>

    </div>
  );
}
