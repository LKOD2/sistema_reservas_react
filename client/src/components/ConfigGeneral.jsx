import React, { useEffect, useRef, useState } from "react";

export function ConfigGeneral() {
    const selectHotel = useRef(null);
    const [hotelSeleccionado, setHotelSeleccionado] = useState(
        JSON.parse(localStorage.getItem("hotel")) || null
    );
    const [datos, setDatos] = useState([]); // Inicializado como arreglo vacío.

    useEffect(() => {
        getDatos();
    }, []);

    // MANEJO DE DATOS
    const getDatos = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(`http://localhost:8000/gestion/hoteles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDatos(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    const manejarCambio = () => {
        const hotelSeleccionado = datos.find(
            (hotel) => hotel.id.toString() === selectHotel.current.value
        );
        
        if (hotelSeleccionado) {
            setHotelSeleccionado(hotelSeleccionado);
            localStorage.setItem("hotel", JSON.stringify(hotelSeleccionado));
            alert(`Hotel seleccionado: ${hotelSeleccionado.nombre}`);
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>General</h4></div>
            <div className="form-group">
                <label htmlFor="hotel-select">Selecciona un hotel</label>
                <select
                    ref={selectHotel}
                    className="imput"
                    id="hotel-select"
                    onChange={manejarCambio}
                    value={hotelSeleccionado ? hotelSeleccionado.id : ""}
                >
                    {hotelSeleccionado ? '' :<option value="">-- Selecciona un hotel --</option>}
                    {datos.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                            {hotel.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
