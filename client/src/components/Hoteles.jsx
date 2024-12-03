import React, { useEffect, useRef, useState } from "react";
import "../styles/hoteles.css";
import { useNavigate } from "react-router-dom";

export function Hoteles() {
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [datos, setDatos] = useState([]);
    const [hotelActual, setHotelActual] = useState(null);

    useEffect(() => {
        getDatos();
    }, []);

    const manejarCrear = () => {
        setModoCrear(true);
        setModoEditar(false);
        setHotelActual(null);
    };

    const manejarEditar = (hotel) => {
        setModoEditar(true);
        setModoCrear(false);
        setHotelActual(hotel);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setHotelActual(null);
    };

    const getDatos = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch("http://localhost:8000/gestion/hoteles/", {
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

    const eliminarHotel = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("¿Estás seguro de que quieres eliminar este hotel?")) return;

        try {
            const response = await fetch(`http://localhost:8000/gestion/hoteles/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                alert("Hotel eliminado con éxito");
                getDatos();
            } else {
                alert("Error al eliminar el hotel");
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>Hoteles</h4></div>

            <div className="hoteles">
                <div className="cont-agregar">
                    <button className="boton-crear" onClick={manejarCrear}>Crear nuevo</button>
                    <input className="buscador-contenido" type="text" placeholder="Buscar" />
                </div>

                <div className="data">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((hotel) => (
                                <tr key={hotel.id}>
                                    <td>{hotel.nombre}</td>
                                    <td>{hotel.direccion}</td>
                                    <td>{hotel.telefono}</td>
                                    <td>{hotel.email}</td>
                                    <td>
                                        <button
                                            className="acciones editar"
                                            onClick={() => manejarEditar(hotel)}
                                        >
                                            <i className='bx bxs-edit-alt'></i>
                                        </button>
                                        <button
                                            className="acciones borrar"
                                            onClick={() => eliminarHotel(hotel.id)}
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

            {modoCrear && <HotelesForm modo="crear" cerrar={manejarCerrarFormulario} />}
            {modoEditar && <HotelesForm modo="editar" hotel={hotelActual} cerrar={manejarCerrarFormulario} />}
        </div>
    );
}

export function HotelesForm({ modo, hotel, cerrar }) {
    const dialog = useRef(null);
    const [formData, setFormData] = useState(hotel || {
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
    });

    useEffect(() => {
        dialog.current.showModal();
    }, []);

    const manejarCambio = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const manejoSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = modo === "crear"
            ? "http://localhost:8000/gestion/hoteles/"
            : `http://localhost:8000/gestion/hoteles/${hotel.id}/`;
        const method = modo === "crear" ? "POST" : "PUT";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(`Hotel ${modo === "crear" ? "creado" : "editado"} con éxito`);
                cerrar();
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <dialog ref={dialog} className="cont-form-contenido">
            <form className="form-contenido" onSubmit={manejoSubmit}>
                <div className="cont-titulo-form">
                    <h3>{modo === "crear" ? "Crear hotel" : "Editar hotel"}</h3>
                    <i className="bx bx-x icono-cerrar" onClick={cerrar}></i>
                </div>
                <div className="form-group">
                    <label htmlFor="nombre-hotel">Nombre</label>
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
                    <label htmlFor="direccion-hotel">Dirección</label>
                    <textarea
                        className="imput"
                        name="direccion"
                        value={formData.direccion}
                        onChange={manejarCambio}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="telefono-hotel">Teléfono</label>
                    <input
                        className="imput"
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={manejarCambio}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email-hotel">Email</label>
                    <input
                        className="imput"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={manejarCambio}
                        required
                    />
                </div>
                <button className="boton-submit" type="submit">Guardar</button>
            </form>
        </dialog>
    );
}
