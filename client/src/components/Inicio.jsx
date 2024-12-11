import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import "../styles/inicio.css";

export function Inicio() {

    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [dataHabitaciones, setDataHabitaciones] = useState([])

    useEffect(() => {
        if (!hotel) {
            alert('Para ver las habitaiones debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos();
    }, [hotel]);

    // MANEJO DE DATOS
    const getDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/data?hotel=${hotel.id}`,
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
                setDataHabitaciones(data)

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
                <i className='bx bxs-home-alt-2'></i>
                <h4>Inicio</h4>
            </div>

            <div className="inicio">
                <div className="inicio-grid">
                    <Link to={'/disponibles'} state={'disponibles'}>
                        <div className="widget disponible">
                            <div className="estado">
                                <p>Disponibles</p>
                            </div>
                            <div className="cont-numero-icono">
                                <div className="numero">{dataHabitaciones.disponibles}</div>
                                <div className="icono">
                                    <i className='bx bx-hotel'></i>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/ocupadas'} state={'ocupadas'}>
                        <div className="widget ocupada">
                            <div className="estado">
                                <p>Ocupadas</p>
                            </div>
                            <div className="cont-numero-icono">
                                <div className="numero">{dataHabitaciones.ocupadas}</div>
                                <div className="icono">
                                    <i className='bx bx-hotel'></i>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/limpieza'} state={'limpieza'}>
                        <div className="widget limpieza">
                            <div className="estado">
                                <p>Limpieza</p>
                            </div>
                            <div className="cont-numero-icono">
                                <div className="numero">{dataHabitaciones.en_limpieza}</div>
                                <div className="icono">
                                    <i className='bx bx-hotel'></i>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/todas'} state={'todas'}>
                        <div className="widget todas">
                            <div className="estado">
                                <p>Todas</p>
                            </div>
                            <div className="cont-numero-icono">
                                <div className="numero">{dataHabitaciones.total}</div>
                                <div className="icono">
                                    <i className='bx bx-hotel'></i>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
