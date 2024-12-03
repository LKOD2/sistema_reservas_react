import React, { useEffect, useState } from "react";
import "../styles/huespedes.css";
import { useNavigate } from "react-router-dom";

export function Huespedes() {

    const navigate = useNavigate();
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [datos, setDatos] = useState([]);
    const [filtro, setFiltro] = useState('todo');
    const [valorBusqueda, setValorBusqueda] = useState('');

    useEffect(() => {
        if (!hotel){
            alert('Para ver los huespedes debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos(); 
    }, [filtro, valorBusqueda, hotel]); 

    // MANEJO DE FILTRO
    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
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
                `http://localhost:8000/gestion/huespedes?estado=${filtro}&search=${valorBusqueda}&hotel=${hotel.id}`,
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

    return (
        <div className="contenido">
            <div className="titulo-contenido">
                <h4>Huéspedes</h4>
            </div>

            <div className="huespedes">
                <div className="cont-agregar">
                    <select
                        className="select-filtros"
                        value={filtro}
                        onChange={manejarFiltro}
                    >
                        <option value="todo">Todos</option>
                        <option value="activo">Activos</option>
                        <option value="finalizado">Finalizados</option>
                    </select>
                    <input
                        className="buscador-contenido"
                        type="text"
                        placeholder="Buscar por nombre o documento"
                        value={valorBusqueda} 
                        onChange={manejarBusqueda}  
                    />
                </div>

                <div className="data">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>País</th>
                                <th>Tipo Documento</th>
                                <th>Número Documento</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((huesped) => (
                                <tr key={huesped.id}>
                                    <td>{huesped.nombre}</td>
                                    <td>{huesped.apellido}</td>
                                    <td>{huesped.email}</td>
                                    <td>{huesped.telefono}</td>
                                    <td>{huesped.pais}</td>
                                    <td>{huesped.tipo_documento}</td>
                                    <td>{huesped.num_documento}</td>
                                    <td>
                                        <div className={`estado ${huesped.estado}`}>
                                            {huesped.estado}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="barra-inferior">
                    <p id="cant-reg-users">{datos.length} Registros</p>
                    <div className="cont-num-pagina">
                        <i className="bx bxs-chevron-left"></i>
                        <p>1</p>
                        <i className="bx bxs-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
