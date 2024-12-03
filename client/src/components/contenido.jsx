
import React, { useState } from "react";

import '../styles/usuarios.css'

export function Usuario({dato}) {
    const [usuarios, setUsuarios] = useState([
        {
            usuario: "jdoe",
            nombre: "John",
            apellido: "Doe",
            email: "jdoe@example.com",
            rol: "admin",
            estado: "activo"
        },
        // Agrega más usuarios aquí
    ]);
    const [filtro, setFiltro] = useState("activo");
    const [busqueda, setBusqueda] = useState("");
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState(null);

    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const manejarCrear = () => {
        console.log('crear');
        
        setModoCrear(true);
    };

    const manejarEditar = (usuario) => {
        setUsuarioActual(usuario);
        setModoEditar(true);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setUsuarioActual(null);
    };

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.estado === filtro || filtro === "todos"
    ).filter(usuario =>
        usuario.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="contenido" id="usuarios">
            <div className="titulo-contenido"><h4>Usuarios</h4></div>

            <div className="usuarios">

                <div className="cont-agregar">
                    <button className="boton-crear" id="boton-crear-user" onClick={manejarCrear}>Crear nuevo</button>
                    <select
                        name="select-usuarios"
                        id="select-usuarios"
                        className="select-filtros"
                        value={filtro}
                        onChange={manejarFiltro}
                    >
                        <option value="activo">Activos</option>
                        <option value="desactivo">Desactivos</option>
                        <option value="todos">Todos</option>
                    </select>
                    <input
                        className="buscador-contenido"
                        type="search"
                        placeholder="Buscar"
                        value={busqueda}
                        onChange={manejarBusqueda}
                    />
                </div>

                <div className="data" id="contenido-usuarios">
                    <table>
                        <thead className="head-tabla-user" id="head-tabla-crud">
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="body-tabla-user" id="body-tabla-user">
                            {usuariosFiltrados.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.usuario}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol}</td>
                                    <td>
                                        <div className={`estado ${usuario.estado}`}>
                                            {usuario.estado}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="acciones editar user"
                                            onClick={() => manejarEditar(usuario)}
                                        >
                                            <i className='bx bxs-edit-alt'></i>
                                        </button>
                                        <button
                                            className="acciones borrar user"
                                            onClick={() => {} /* Maneja la eliminación */}
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
                    <p id="cant-reg-users">{usuariosFiltrados.length} Registros</p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right'></i>
                    </div>
                </div>
            </div>
        </div>
    )};