import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation, Outlet} from "react-router-dom";

import "../styles/gestion.css"
import { Limpieza } from "./Limpieza";

export function Gestion({dato}) {

    const location = useLocation();
    const ruta = location.state;
    
    const [habitaciones, setHabitaciones] = useState([])
    
    const navigate = useNavigate();

    useEffect(() => {
        
        if (dato === 'disponibles') {
            setHabitaciones([
                { ID: 1, estado: 'disponible', numero: 10, tipo: 'simple' },
                { ID: 2, estado: 'disponible', numero: 20, tipo: 'doble' }
            ]);
        } else if (dato === 'ocupadas' || dato === 'venta') {
            setHabitaciones([
                { ID: 3, estado: 'ocupada', numero: 200, tipo: 'simple' },
                { ID: 4, estado: 'ocupada', numero: 201, tipo: 'triple' }
            ]);
        } else if (dato === 'limpieza') {
            setHabitaciones([
                { ID: 5, estado: 'limpieza', numero: 300, tipo: 'simple' },
                { ID: 6, estado: 'limpieza', numero: 320, tipo: 'doble' }
            ]);
        } else {
            setHabitaciones([]);
        }

    }, [dato]); 


    const getHabitacionData = (habitacion)=>{
        if (dato === 'disponibles') {
            navigate('/recepcion', { state: { habitacion } });
        } else if (dato === 'ocupadas') {
            navigate('/salida', { state: { habitacion } })
        }else if (dato === 'limpieza') {
            navigate('liberar', { state: { habitacion } })
        }else if (dato === 'venta') {
            navigate('/vender', { state: { habitacion } })
        }else {
            setHabitaciones([]);
        }
        
    }



    return (
        <div className="contenido">
            <div className="titulo-contenido">
                <h4 style={{ textTransform: 'capitalize' }}>{dato}</h4>
            </div>

            <div className="data-habitaciones">
                {habitaciones.map(habitacion => (
                        <div
                            className={`habitacion ${habitacion.estado}`}
                            key={habitacion.ID}
                            onClick={()=> getHabitacionData(habitacion)}
                        >
                            <div className="cont-numero-icono">
                                <div>
                                    <div className="numero">{habitacion.numero}</div>
                                    <div className="tipo">{habitacion.tipo}</div>
                                </div>
                                <div className="icono">
                                    {habitacion.estado === "disponible" && (
                                        <i class='bx bx-hotel'></i>
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
            <Outlet/>
        </div>
    );
}
