import React, { useEffect,useRef, useState } from "react";
import "../styles/habitaciones.css";
import { useNavigate } from "react-router-dom";

export function Habitaciones() {

    const navigate = useNavigate();
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [datos, setDatos] = useState([]);
    const [filtro, setFiltro] = useState('todo');
    const [valorBusqueda, setValorBusqueda] = useState('');

    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [habitacionActual, setHabitacionActual] = useState(null);

    // Obtener datos al cargar el componente o cambiar el filtro
    useEffect(() => {
        if (!hotel){
            alert('Para ver las habitaiones debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos(); 
    }, [filtro, valorBusqueda, hotel]); 

    // MANEJO DE ACCIONES
    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const manejarCrear = () => {
        setModoCrear(true);
        setModoEditar(false);
        setHabitacionActual(null);
    };

    const manejarEditar = (habitacion) => {
        setModoEditar(true);
        setModoCrear(false);
        setHabitacionActual(habitacion);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setHabitacionActual(null);
    };
    
    // MANEJO DE TÉRMINO DE BÚSQUEDA
    const manejarBusqueda = (e) => {
        setValorBusqueda(e.target.value);
    };

    // MANEJO DE DATOS
    const getDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/habitaciones?estado=${filtro}&search=${valorBusqueda}&hotel=${hotel.id}`,
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

    const eliminarHabitacion = async (id) => {
        const token = localStorage.getItem('token');
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta habitación?")) return;

        try {
            const response = await fetch(`http://localhost:8000/gestion/habitaciones/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });

            if (response.ok) {
                alert('Habitación eliminada con éxito');
                getDatos(filtro, valorBusqueda);
            } else {
                alert('Error al eliminar la habitación');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>Habitaciones</h4></div>

            <div className="habitaciones">
                <div className="cont-agregar">
                    <button className="boton-crear" onClick={manejarCrear}>Crear nuevo</button>
                    <select
                        className="select-filtros"
                        value={filtro}
                        onChange={manejarFiltro}
                    >
                        <option value="todo">Todas</option>
                        <option value="disponible">Disponibles</option>
                        <option value="ocupada">Ocupadas</option>
                        <option value="limpieza">Limpieza</option>
                    </select>
                    <input
                        className="buscador-contenido"
                        type="text"
                        placeholder="Buscar por numero, tipo o estado"
                        value={valorBusqueda} 
                        onChange={manejarBusqueda}  
                    />
                </div>

                <div className="data">
                    <table>
                        <thead>
                            <tr>
                                <th>Numero</th>
                                <th>Tipo</th>
                                <th>Orientación</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((habitacion) => (
                                <tr key={habitacion.id}>
                                    <td>{habitacion.numero}</td>
                                    <td>{habitacion.tipo}</td>
                                    <td>{habitacion.orientacion}</td>
                                    <td>{habitacion.precio}</td>
                                    <td><div className={`estado ${habitacion.estado}`}>{habitacion.estado}</div></td>
                                    <td>
                                        <button
                                            className="acciones editar"
                                            onClick={() => manejarEditar(habitacion)}
                                        >
                                            <i className='bx bxs-edit-alt'></i>
                                        </button>
                                        <button
                                            className="acciones borrar"
                                            onClick={() => eliminarHabitacion(habitacion.id)}
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

            {modoCrear && <HabitacionesForm modo="crear" cerrar={manejarCerrarFormulario} getDatos={getDatos}/>}
            {modoEditar && <HabitacionesForm modo="editar" habitacion={habitacionActual} cerrar={manejarCerrarFormulario} getDatos={getDatos}/>}
        </div>
    );
}

export function HabitacionesForm({ modo, habitacion, cerrar, getDatos }) {

    const navigate = useNavigate();
    const dialog = useRef(null);
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [formData, setFormData] = useState(habitacion || { numero: '', tipo: 'simple', orientacion: 'norte', estado: 'disponible', precio: 20000, hotel: hotel.id });

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

    const enviarDatos = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = modo === 'crear'
            ? 'http://localhost:8000/gestion/habitaciones/'
            : `http://localhost:8000/gestion/habitaciones/${habitacion.id}/`;
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
                alert(`Habitación ${modo === 'crear' ? 'creada' : 'editada'} con éxito`);
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
            <form className="form-contenido" onSubmit={enviarDatos}>
                <div className="cont-titulo-form">
                    <h3>{modo === 'crear' ? 'Crear habitación' : 'Editar habitación'}</h3>
                    <i className="bx bx-x icono-cerrar" onClick={cerrar}></i>
                </div>
                <div className="form-group">
                    <label htmlFor="numero-habitacion">Numero</label>
                    <input
                        className="imput"
                        type="number"
                        name="numero"
                        value={formData.numero}
                        onChange={manejarCambio}
                        min="1"
                        max="500"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tipo-habitacion">Tipo</label>
                    <select 
                        className="imput" 
                        name="tipo" 
                        value={formData.tipo} 
                        onChange={manejarCambio}
                        >
                        <option value="simple">Simple</option>
                        <option value="doble">Doble</option>
                        <option value="triple">Triple</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="estado-habitacion">Orientación</label>
                    <select 
                        className="imput" 
                        name="orientacion" 
                        value={formData.orientacion} 
                        onChange={manejarCambio}
                        >
                        <option value="norte">Norte</option>
                        <option value="sur">Sur</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="estado-habitacion">Estado</label>
                    <select 
                        className="imput" 
                        name="estado" 
                        value={formData.estado} 
                        onChange={manejarCambio}
                        >
                        <option value="disponible">Disponible</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="ocupada">Ocupada</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="precio-habitacion">Precio</label>
                    <input
                        className="imput"
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={manejarCambio}
                        min="1"
                        required
                    />
                </div>
                <button className="boton-submit" type="submit">Guardar</button>
            </form>
        </dialog>
    );
}
