
import React, { useState } from "react";

import '../styles/usuarios.css'

export function Usuario() {
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

                {/* <!-- ---------------------------- CREAR USER -------------------------------- --> */}

                {modoCrear && (
                    <div className='cont-form-contenido crear-user activo' id="cont-form-crear-user">
                        <form id="crear-user-form" className="form-contenido" onSubmit={() => {}}>
                            <div className="cont-titulo-form">
                                <h3 className="titulo-form">Crear usuario</h3>
                                <i className='bx bx-x icono-cerrar' onClick={manejarCerrarFormulario}></i>
                            </div>

                            <div class="form-group">
                                <label for="imput-user" class="label-input">Usuario</label>
                                <input class="imput" id="imput-user" type="text" name="usuario" placeholder="Usuario" required/>
                                <label for="imput-user" class="label-error" id="error-imput-user"></label>
                            </div>
                            <div class="form-group">
                                <label for="imput-nombre-user" class="label-input">Nombre</label>
                                <input class="imput" id="imput-nombre-user" type="text" name="nombre" placeholder="Nombre" required/>
                                <label for="imput-nombre-user" class="label-error" id="error-imput-nombre-user"></label>
                            </div>
                            <div class="form-group">
                                <label for="imput-apellido-user" class="label-input">Apellido</label>
                                <input class="imput" id="imput-apellido-user" type="text" name="apellido" placeholder="Apellido" required/>
                                <label for="imput-apellido-user" class="label-error" id="error-imput-apellido-user"></label>
                            </div>
                            <div class="form-group">
                                <label for="imput-clave-user" class="label-input">Contraseña</label>
                                <input class="imput" id="imput-clave-user" type="password" name="clave" placeholder="Contraseña" required/>
                                <label for="imput-clave-user" class="label-error" id="error-imput-clave-user"></label>
                            </div>
                            <div class="form-group">
                                <label for="imput-email-user" class="label-input">Email</label>
                                <input class="imput" id="imput-email-user" type="email" name="email" placeholder="Email" required/>
                                <label for="imput-email-user" class="label-error" id="error-imput-email-user"></label>
                            </div>
                            <div class="form-group">
                                <label for="tipo" class="label-input">Rol</label>
                                <select class="imput" id="tipo" name="tipo">
                                    <option value="empleado">Empleado</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label for="tipo" class="label-error" id="error-tipo"></label>
                            </div>
                            <div class="form-group">
                                <label for="estado" class="label-input">Estado</label>
                                <select class="imput" id="estado" name="estado">
                                    <option value="activo">Activo</option>
                                    <option value="desactivo">Desactivo</option>
                                </select>
                                <label for="estado" class="label-error" id="error-estado"></label>
                            </div>

                            <input className="boton-submit" type="submit" value="Crear" />
                        </form>
                    </div>
                )}

                {/* <!-- ---------------------------- EDITAR USER -------------------------------- --> */}

                {modoEditar && (
                    <div className="cont-form-contenido edit-user activo" id="cont-form-edit-user">
                        <form id="edit-user-form" className="form-contenido" onSubmit={() => {}}>
                            <div className="cont-titulo-form">
                                <h3 className="titulo-form">Editar usuario</h3>
                                <i className='bx bx-x icono-cerrar' onClick={manejarCerrarFormulario}></i>
                            </div>
                            {/* Los inputs y labels con datos del usuarioActual van aquí */}
                            <div class="form-group">
                                <label for="edit-usuario" class="label-input">Usuario</label>
                                <input class="imput" type="text" name="usuario" id="edit-usuario" placeholder="Usuario" readonly/>
                                <label for="edit-usuario" class="label-error" id="error-edit-usuario"></label>
                            </div>
                            <div class="form-group">
                                <label for="edit-nombre" class="label-input">Nombre</label>
                                <input class="imput" type="text" name="nombre" id="edit-nombre" placeholder="Nombre"/>
                                <label for="edit-nombre" class="label-error" id="error-edit-nombre"></label>
                            </div>
                            <div class="form-group">
                                <label for="edit-apellido" class="label-input">Apellido</label>
                                <input class="imput" type="text" name="apellido" id="edit-apellido" placeholder="Apellido"/>
                                <label for="edit-apellido" class="label-error" id="error-edit-apellido"></label>
                            </div>
                            <div class="form-group">
                                <label for="edit-email" class="label-input">Email</label>
                                <input class="imput" type="email" name="email" id="edit-email" placeholder="Email"/>
                                <label for="edit-email" class="label-error" id="error-edit-email"></label>
                            </div>
                            <div class="form-group">
                                <label for="edit-tipo" class="label-input">Rol</label>
                                <select class="imput" id="edit-tipo" name="tipo">
                                    <option value="empleado">Empleado</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <label for="edit-tipo" class="label-error" id="error-edit-tipo"></label>
                            </div>
                            <div class="form-group">
                                <label for="edit-estado" class="label-input">Estado</label>
                                <select class="imput" id="edit-estado" name="estado">
                                    <option value="activo">Activo</option>
                                    <option value="desactivo">Desactivo</option>
                                </select>
                                <label for="edit-estado" class="label-error" id="error-edit-estado"></label>
                            </div>
                            <input className="boton-submit" type="submit" value="Guardar" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
