import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation, Outlet} from "react-router-dom";

import "../styles/gestion.css"

export function Gestion({modo}) {

    const navigate = useNavigate();
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [habitaciones, setHabitaciones] = useState([])
    
    useEffect(() => {
        
        if (!hotel){
            alert('Para ver las habitaiones debes seleccionar un hotel');
            navigate('/hoteles');
            return;
        }
   
        const filtro = modo === 'venta' ? 'ocupada' : modo;

        const ruta = modo === 'limpieza' ? 'mantenimiento' : 'habitaciones'
        getDatos(filtro, hotel.id, ruta); 

    }, [modo, hotel]); 

    const getDatos = async (filtro, hotel, ruta) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/${ruta}?estado=${filtro}&hotel=${hotel}`,
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
                setHabitaciones(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    const getHabitacionData = (habitacion)=>{
        if (modo === 'disponible') {
            navigate('/recepcion', { state: { habitacion } });
        } else if (modo === 'ocupada') {
            navigate('/salida', { state: { habitacion } })
        }else if (modo === 'limpieza') {
            navigate('liberar', { state: { habitacion } })
        }else if (modo === 'venta') {
            navigate('/vender', { state: { habitacion } })
        }else {
            setHabitaciones([]);
        }
    }

    return (
        <div className="contenido">
            <div className="titulo-contenido">
                <h4 style={{ textTransform: 'capitalize' }}>{modo}</h4>
            </div>

            {habitaciones.length > 0 ? (

                <div className="data-habitaciones">
                    {habitaciones.map(habitacion => (
                            <div
                                className={`habitacion ${habitacion.estado}`}
                                key={habitacion.id}
                                onClick={()=> getHabitacionData(habitacion)}
                            >
                                <div className="cont-numero-icono">
                                    <div>
                                        <div className="numero">{habitacion.numero}</div>
                                        <div className="tipo">{habitacion.tipo}</div>
                                    </div>
                                    <div className="icono">
                                        {habitacion.estado === "disponible" && (
                                            <i className='bx bx-hotel'></i>
                                        )}
                                        {habitacion.estado === "ocupada" && (
                                            <i className="bx bxs-error"></i>
                                        )}
                                        {habitacion.estado === "limpieza" && (
                                            <i className="bx bxs-trash"></i>
                                        )}
                                    </div>
                                </div>

                                <div className="estado">
                                    <p>{habitacion.estado}</p>
                                    <i className="bx bxs-chevron-right"></i>
                                </div>
                            </div>
                    ))}
                </div>

            ) : (
                <div className="cont-no-data">
                    <div className="no-data">
                        <i className="bi bi-database-slash"></i>
                        <h1>No hay datos</h1>
                    </div>
                    
                </div>
            )}
            <Outlet/>
        </div>
    );
}
