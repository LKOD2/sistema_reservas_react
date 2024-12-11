import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/vender.css';

// Componente de producto individual
function Producto({ producto, agregarProducto }) {
    return (
        <div className="producto">
            <h4>{producto.nombre}</h4>
            <p>Precio: ${producto.precio}</p>
            <button className='venta-boton-accion' onClick={() => agregarProducto(producto)}><i class='bx bx-cart-add icono-accion'></i></button>
        </div>
    );
}

// Componente principal de ventas a la habitación
export function Vender() {

    const navigate = useNavigate();
    const location = useLocation();
    const dataHabitacion = location.state;
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')));
    const [dataHuesped, setDataHuesped] = useState([]);
    const [dataProductos, setDataProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    useEffect(() => {
        if (!hotel) {
            alert('Para ver las habitaciones debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos();
    }, [hotel]);

    const agregarProducto = (producto) => {
        const productoExistente = productosSeleccionados.find(p => p.id === producto.id);
        if (productoExistente) {
            setProductosSeleccionados(productosSeleccionados.map(p =>
                p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
            ));
        } else {
            setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad: 1 }]);
        }
    };

    const quitarProducto = (producto) => {
        setProductosSeleccionados(productosSeleccionados.filter(p => p.id !== producto.id));
    };

    const manejarCantidad = (producto, cantidad) => {
        setProductosSeleccionados(productosSeleccionados.map(p =>
            p.id === producto.id ? { ...p, cantidad: parseInt(cantidad) } : p
        ));
    };

    const calcularTotal = () => {
        return productosSeleccionados.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    };


    // OBTENCION DE DATOS

    const getDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/venta?habitacion=${dataHabitacion.habitacion.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDataProductos(data.productos);
                setDataHuesped(data.huesped);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    // ENVIO DE DATOS

    const enviarDatos = async (e) => {
        e.preventDefault();

        const formData = {
            productos: productosSeleccionados,
            habitacion: dataHabitacion.habitacion.id,
        };

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8000/gestion/venta/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`Venta realizada a la habitación ${dataHabitacion.habitacion.numero}`);
                setProductosSeleccionados([]); // Limpiar la selección de productos
                
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>Vender</h4></div>

            <div className="vender">
                {/* ---------------------------- DATOS HUESPED RESPONSABLE -------------------------------- */}
                <div className="vender-cont-datos">
                    <div className="venta-seccion">
                        <div className="venta-seccion-titulo">
                            <i className="bx bxs-cart"></i>
                            <p>Datos del huésped</p>
                        </div>
                        <table>
                            {dataHuesped ? (
                                <>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{dataHuesped.nombre} {dataHuesped.apellido}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{dataHuesped.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Teléfono</th>
                                        <td>{dataHuesped.telefono}</td>
                                    </tr>
                                    <tr>
                                        <th>{dataHuesped.tipo_documento}</th>
                                        <td>{dataHuesped.num_documento}</td>
                                    </tr>
                                </>
                            ) : null}
                        </table>
                    </div>

                    {/* ---------------------------- DATOS HABITACION -------------------------------- */}
                    <div className="venta-seccion">
                        <div className="venta-seccion-titulo">
                            <i className="bx bxs-cart"></i>
                            <p>Detalles habitación</p>
                        </div>
                        <table>
                            <tr>
                                <th>Numero</th>
                                <td>{dataHabitacion.habitacion.numero}</td>
                            </tr>
                            <tr>
                                <th>Tipo</th>
                                <td>{dataHabitacion.habitacion.tipo}</td>
                            </tr>
                            <tr>
                                <th>Orientación</th>
                                <td>{dataHabitacion.habitacion.orientacion}</td>
                            </tr>
                            <tr>
                                <th>Precio por noche</th>
                                <td>{dataHabitacion.habitacion.precio}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="cont-prod-carr">
                    <div className="venta-seccion productos">
                    <div className="venta-seccion-titulo">
                            <i className="bx bxs-cart"></i>
                            <p>Productos</p>
                        </div>
                        {dataProductos.map((producto) => (
                            <Producto key={producto.id} producto={producto} agregarProducto={agregarProducto} />
                        ))}
                    </div>

                    <div className="venta-seccion carrito">
                        <div className="venta-seccion-titulo">
                            <i className="bx bxs-cart"></i>
                            <p>Carrito</p>
                        </div>

                        <ul className="carrito-lista">
                            {productosSeleccionados.map((producto, index) => (
                                <li key={index}>
                                    {producto.nombre} - ${producto.precio} x {producto.cantidad}
                                    <input
                                        type="number"
                                        required
                                        placeholder="cantidad"
                                        min={0}
                                        value={producto.cantidad}
                                        onChange={(e) => manejarCantidad(producto, e.target.value)}
                                    />
                                    <button className="venta-boton-accion eliminar" onClick={() => quitarProducto(producto)}><i class='bx bxs-trash icono-accion'></i></button>
                                </li>
                            ))}
                        </ul>
                        <h4>Total: ${calcularTotal()}</h4>

                        <button className="boton-venta" onClick={enviarDatos}>Realizar Venta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
