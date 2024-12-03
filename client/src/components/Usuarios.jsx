

import React, { useEffect, useRef, useState } from "react";

import '../styles/usuarios.css';

export function Usuario() {
    const [usuarioActual, setUsuarioActual] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const [usuarios, setUsuarios] = useState([])
    
    const [filtro, setFiltro] = useState("todos");
    const [busqueda, setBusqueda] = useState("");
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    useEffect(() => {
        getDatos(filtro)
    }, [filtro])


    // OBTENCION DE DATOS

    useEffect(() => {
        getDatos(filtro);
    }, []);
    
    const getDatos = async (filtro) => {

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/usuarios/api/usuarios?is_active=${filtro}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: `Token ${token}`,}
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Datos de usuarios obtenidos con éxito');
                setUsuarios(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`http://localhost:8000/usuarios/api/usuarios/${id}/`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', Authorization: `Token ${token}`,}
            });
    
            if (response.ok) {
                alert('Usuario eliminado con éxito');
                // Actualiza la lista de usuarios eliminando el usuario eliminado
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            } else {
                alert('Error al eliminar el usuario');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };


    const cambiarEstado = async (usuario) => {

        if (!window.confirm(`¿Estás seguro de que quieres ${usuario.is_active ? 'desactivar' : 'activar'} este usuario?`)) return;

        const token = localStorage.getItem('token');

        const estado = usuario.is_active ? false : true;
    
        try {
            const response = await fetch(`http://localhost:8000/usuarios/api/usuarios/${usuario.id}/`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', Authorization: `Token ${token}`,},
                body: JSON.stringify({ is_active: estado }),
            });
    
            if (response.ok) {
                alert(`Usuario ${usuario.is_active ? 'desactivado' : 'activado'} con éxito`);
                getDatos(filtro);
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };
     
    
    // MANEJO DE FILTRO

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
        setUsuarioEditar(usuario);
        setModoEditar(true);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setUsuarioEditar(null);
    };

   
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
                        <option value="true">Activos</option>
                        <option value="false">Desactivos</option>
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
                                    <td>{usuario.username}</td>
                                    <td>{usuario.first_name}</td>
                                    <td>{usuario.last_name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.is_superuser? 'Administrador' : usuario.is_staff ? 'Recepción': 'Mantenimiento'}</td>
                                    <td>
                                        <div className={`estado ${usuario.is_active? 'activo': 'desactivo'}`}>
                                            {usuario.is_active? 'Activo': 'Desactivo'}
                                        </div>
                                    </td>
                                    <td>
                                    {usuarioActual.id === usuario.id ? (
                                        'Mi usuario'
                                    ) : (
                                        <>
                                            <button
                                                className="acciones editar user"
                                                onClick={() => manejarEditar(usuario)}
                                            >
                                                <i className='bx bxs-edit-alt'></i>
                                            </button>
                                            <button
                                                className="acciones borrar user"
                                                onClick={() => eliminarUsuario(usuario.id)}
                                            >
                                                <i className='bx bx-x'></i>
                                            </button>
                                            <button
                                                className="acciones"
                                                onClick={() => cambiarEstado(usuario)}
                                            >
                                                <i className='bx bx-x'></i>
                                            </button>
                                        </>
                                    )}

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

                {modoCrear && <FormUser action="crear" funcion={manejarCerrarFormulario}  />}
                {modoEditar && <FormUser action="edit" user={usuarioEditar} funcion={manejarCerrarFormulario}  />}
            </div>
        </div>
    );
}


const FormUser = ({ action, user, funcion}) => {
    
    const dialogCrearUser = useRef(null);

    const [formData, setFormData] = useState({
        id: user?.id || "",
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        rol: user?.is_staff || false,
        estado: user?.is_active || true,
    });

    useEffect(() => {
        dialogCrearUser.current.showModal();
        console.log(formData);
        
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const manejoSubmit = async (e) => {
        e.preventDefault();
        if (action === "crear") {
            crearUsuario(formData)
            console.log(formData);
            
    
        } else if (action === "edit") {
            editarUsuario(formData);
        }
        funcion(); // Cerrar formulario
    };

    const crearUsuario = async (nuevoUsuario) => {
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    
        try {
            const response = await fetch('http://localhost:8000/usuarios/api/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`, // Añade el token en el encabezado
                },
                body: JSON.stringify(nuevoUsuario),
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
    };
    
    const editarUsuario = async (usuarioEditado) => {
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    
        try {
            const response = await fetch(`http://localhost:8000/usuarios/api/usuarios/${usuarioEditado.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`, // Añade el token en el encabezado
                },
                body: JSON.stringify(usuarioEditado),
            });
    
            if (response.ok) {
                alert('Usuario actualizado con éxito');
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };
    
    

    return (
        <dialog ref={dialogCrearUser} className="cont-form-contenido">
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
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
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
                        name="first_name"
                        placeholder="Nombre"
                        value={formData.first_name}
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
                        name="last_name"
                        placeholder="Apellido"
                        value={formData.last_name}
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
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
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
                        value={formData.is_staff}
                        onChange={handleChange}
                    >
                        <option value="true">Recepción</option>
                        <option value="false">Mantenimiento</option>                      
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="estado" className="label-input">Estado</label>
                    <select
                        className="imput"
                        id="estado"
                        name="estado"
                        value={formData.is_active}
                        onChange={handleChange}
                    >
                        <option value="true">Activo</option>
                        <option value="false">Desactivo</option>
                    </select>
                </div>

                <input className="boton-submit" type="submit" value={action === "crear" ? "Crear" : "Guardar cambios"} />
            </form>
        </dialog>
    );
};

export default FormUser;
