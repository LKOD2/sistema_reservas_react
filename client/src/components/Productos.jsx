import React, { useEffect, useRef, useState } from "react";
import "../styles/productos.css";
import { useNavigate } from "react-router-dom";

export function Productos() {

    const navigate = useNavigate();
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [datos, setDatos] = useState([]);
    const [filtro, setFiltro] = useState('todo');
    const [valorBusqueda, setValorBusqueda] = useState('');

    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [productoActual, setProductoActual] = useState(null);

    // Obtener datos al cargar el componente o cambiar el filtro
    useEffect(() => {
        if (!hotel){
            alert('Para ver las habitaiones debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos(); 
    }, [filtro, valorBusqueda, hotel]); 

    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const manejarCrear = () => {
        setModoCrear(true);
        setModoEditar(false);
        setProductoActual(null);
    };

    const manejarEditar = (producto) => {
        setModoEditar(true);
        setModoCrear(false);
        setProductoActual(producto);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setProductoActual(null);
    };

    // MANEJO DE TÉRMINO DE BÚSQUEDA
    const manejarBusqueda = (e) => {
        setValorBusqueda(e.target.value);
    };

    const getDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/productos?estado=${filtro}&search=${valorBusqueda}&hotel=${hotel.id}`,
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
                setDatos(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    const eliminarProducto = async (id) => {
        const token = localStorage.getItem('token');
        if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

        try {
            const response = await fetch(`http://localhost:8000/gestion/productos/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });

            if (response.ok) {
                alert('Producto eliminado con éxito');
                getDatos(filtro);
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>Productos</h4></div>

            <div className="productos">
                <div className="cont-agregar">
                    <button className="boton-crear" onClick={manejarCrear}>Crear nuevo</button>
                    <select
                        className="select-filtros"
                        value={filtro}
                        onChange={manejarFiltro}
                    >
                        <option value="todo">Todos</option>
                        <option value="disponible">Disponibles</option>
                        <option value="no_disponible">No disponibles</option>
                    </select>
                    <input
                        className="buscador-contenido"
                        type="text"
                        placeholder="Buscar por nombre"
                        value={valorBusqueda} 
                        onChange={manejarBusqueda}  
                    />
                </div>

                <div className="data">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.stok}</td>
                                    <td><div className={`estado ${producto.estado}`}>{producto.estado}</div></td>
                                    <td>
                                        <button
                                            className="acciones editar"
                                            onClick={() => manejarEditar(producto)}
                                        >
                                            <i className='bx bxs-edit-alt'></i>
                                        </button>
                                        <button
                                            className="acciones borrar"
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            <i className='bx bx-x'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="barra-inferior">
                    <p id="cant-reg-users">{datos.length} Registros</p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right'></i>
                    </div>
                </div>
            </div>

            {modoCrear && <ProductosForm modo="crear" cerrar={manejarCerrarFormulario} getDatos={getDatos}/>}
            {modoEditar && <ProductosForm modo="editar" producto={productoActual} cerrar={manejarCerrarFormulario} getDatos={getDatos}/>}
        </div>
    );
}

export function ProductosForm({ modo, producto, cerrar, getDatos }) {

    const navigate = useNavigate();
    const dialog = useRef(null);
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [formData, setFormData] = useState(producto || { nombre: '', descripcion: '', precio: '', stok: '', estado: 'disponible', hotel: hotel.id });

    useEffect(() => {
        if (!hotel){
            alert('Para crear habitaiones debes seleccionar un hotel');
            navigate('/hoteles');
        }
        
        dialog.current.showModal();
        
    }, []);

    const manejarCambio = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const manejoSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = modo === 'crear'
            ? 'http://localhost:8000/gestion/productos/'
            : `http://localhost:8000/gestion/productos/${producto.id}/`;
        const method = modo === 'crear' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`Producto ${modo === 'crear' ? 'creado' : 'editado'} con éxito`);
                cerrar();
                getDatos();
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <dialog ref={dialog} className="cont-form-contenido">
            <form className="form-contenido" onSubmit={manejoSubmit}>
                <div className="cont-titulo-form">
                    <h3>{modo === 'crear' ? 'Crear producto' : 'Editar producto'}</h3>
                    <i className="bx bx-x icono-cerrar" onClick={cerrar}></i>
                </div>
                <div className="form-group">
                    <label htmlFor="nombre-producto">Nombre</label>
                    <input
                        className="imput"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={manejarCambio}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion-producto">Descripción</label>
                    <input
                        className="imput"
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={manejarCambio}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precio-producto">Precio</label>
                    <input
                        className="imput"
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={manejarCambio}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stok-producto">Stock</label>
                    <input
                        className="imput"
                        type="number"
                        name="stok"
                        value={formData.stok}
                        onChange={manejarCambio}
                        min="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estado-producto">Estado</label>
                    <select
                        className="imput"
                        name="estado"
                        value={formData.estado}
                        onChange={manejarCambio}
                        required
                    >
                        <option value="disponible">Disponible</option>
                        <option value="no_disponible">No disponible</option>
                    </select>
                </div>
                <button className="boton-submit" type="submit">Guardar</button>
            </form>
        </dialog>
    );
}
