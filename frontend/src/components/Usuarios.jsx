

import React, { useEffect, useRef, useState } from "react";

import '../styles/usuarios.css';

export function Usuario() {

    // const [usuarios, setUsuarios] = useState([
    //     {
    //         usuario: "jdoe",
    //         nombre: "John",
    //         apellido: "Doe",
    //         email: "jdoe@example.com",
    //         rol: "admin",
    //         estado: "activo"
    //     },
    //     // Agrega más usuarios aquí
    // ]);

    const [usuarios, setUsuarios] = useState([])
    
    const [filtro, setFiltro] = useState("activo");
    const [busqueda, setBusqueda] = useState("");
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState(null);


    useEffect(() => {
        getDatos();  // Llama a la función cuando se monte el componente
    }, []);
    
    const getDatos = async () => {
        try {
            const response = await fetch('http://localhost:8000/usuarios/api/v1/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                alert('Datos obtenidos con éxito');
                console.log(data);  // Aquí puedes manejar los datos obtenidos
                setUsuarios(data)
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };
    

    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const manejarCrear = () => {
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

    const agregarUsuario = (nuevoUsuario) => {
        setUsuarios([...usuarios, nuevoUsuario]);
    };

    const editarUsuario = (usuarioEditado) => {
        setUsuarios(usuarios.map(u => u.usuario === usuarioEditado.usuario ? usuarioEditado : u));
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
                            {usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.user_name}</td>
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
                                            onClick={() => { /* Manejar la eliminación aquí */ }}
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
                    <p id="cant-reg-users">{usuarios.length} Registros</p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right'></i>
                    </div>
                </div>

                {modoCrear && <CrearUser action="crear" funcion={manejarCerrarFormulario} agregarUsuario={agregarUsuario} />}
                {modoEditar && <CrearUser action="edit" user={usuarioActual} funcion={manejarCerrarFormulario} editarUsuario={editarUsuario} />}
            </div>
        </div>
    );
}


const CrearUser = ({ action, user, funcion, agregarUsuario, editarUsuario }) => {


    const dialogCrearUser = useRef(null);

    const [formData, setFormData] = useState({
        usuario: user?.usuario || "",
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        email: user?.email || "",
        clave: "",
        rol: user?.rol || "empleado",
        estado: user?.estado || "activo",
    });

    useEffect(() => {
        dialogCrearUser.current.showModal();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const manejoSubmit = async (e) => {
        e.preventDefault();
        if (action === "crear") {

            const nuevoUsuario = {
                nombre,
                email,
                password
            };

            try {
                // Realiza una petición POST a la API
                const response = await fetch('http://localhost:8000/api/crear-user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoUsuario)
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Usuario creado con éxito');
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${JSON.stringify(errorData)}`);
                }
            } catch (error) {
                alert('Error al conectar con el servidor');
            }
    
        } else if (action === "edit") {
            editarUsuario(formData);
        }
        funcion(); // Cerrar formulario
    };

    return (
        <dialog ref={dialogCrearUser} className="cont-form-contenido crear-user activo">
            <form className="form-crear-user" onSubmit={manejoSubmit}>
                <div className="cont-titulo-form">
                    <h3 className="titulo-form">{action === "crear" ? "Crear usuario" : "Editar Usuario"}</h3>
                    <i className="bx bx-x icono-cerrar" onClick={funcion}></i>
                </div>

                <div className="form-group">
                    <label htmlFor="imput-user" className="label-input">Usuario</label>
                    <input
                        className="imput"
                        id="imput-user"
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imput-nombre-user" className="label-input">Nombre</label>
                    <input
                        className="imput"
                        id="imput-nombre-user"
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imput-apellido-user" className="label-input">Apellido</label>
                    <input
                        className="imput"
                        id="imput-apellido-user"
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imput-clave-user" className="label-input">Contraseña</label>
                    <input
                        className="imput"
                        id="imput-clave-user"
                        type="password"
                        name="clave"
                        placeholder="Contraseña"
                        value={formData.clave}
                        onChange={handleChange}
                        required={action === "crear"} // La contraseña solo es obligatoria al crear
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imput-email-user" className="label-input">Email</label>
                    <input
                        className="imput"
                        id="imput-email-user"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tipo" className="label-input">Rol</label>
                    <select
                        className="imput"
                        id="tipo"
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                    >
                        <option value="empleado">Empleado</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="estado" className="label-input">Estado</label>
                    <select
                        className="imput"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                    >
                        <option value="activo">Activo</option>
                        <option value="desactivo">Desactivo</option>
                    </select>
                </div>

                <input className="boton-submit" type="submit" value={action === "crear" ? "Crear" : "Guardar cambios"} />
            </form>
        </dialog>
    );
};

export default CrearUser;
