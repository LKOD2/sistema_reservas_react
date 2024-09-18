import React, { useState } from "react"

export function Huespedes() {

    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);

    const manejarCrear = () => {
        setModoCrear(!modoCrear);
    };

    const manejarEditar = () => {
        setModoEditar(!modoEditar);
    };

    const huesped = ''
    return (
        <div className="contenido">


            <div className="titulo-contenido"><h4>Huespedes</h4></div>

            <div className="huespedes">

            

                <div className="cont-agregar">
                    {/* <!-- <button className="boton-crear" id="boton-crear-huesped">Crear nuevo</button> --> */}
                    <select name="select-huespedes" id="select-huespedes" className="select-filtros">
                        <option value="activo">Activos</option>
                        <option value="inactivo">Inactivos</option>
                        <option value="todos">Todos</option>
                    </select>
                    <input className="buscador-contenido" type="search" placeholder="Buscar"/>
                </div>

                <div className="data" id="contenido-huespedes">

                    <table>
                        <thead className="head-tabla-huesped">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Pais</th>
                                <th>Telefono</th>
                                <th>Tipo documento</th>
                                <th>N° de documento</th>
                                <th>Estado</th>
                                <th>N Habitación</th>
                                {/* <!-- <th>Acciones</th> --> */}
                            </tr>
                        </thead>
                        <tbody className="body-tabla-huesped" id="body-tabla-huesped">

                            <tr>
                                <td>{huesped.nombre}</td>
                                <td>{huesped.apellido}</td>
                                <td>{huesped.email}</td>
                                <td>{huesped.pais}</td>
                                <td>{huesped.telefono}</td>
                                <td>{huesped.tipo_documento}</td>
                                <td>{huesped.num_documento}</td>
                                <td><div className="estado {{huesped.estado}}">{huesped.estado}</div></td>
                                <td>{huesped.numero_hab}</td>
                                {/* <!-- <td>
                                    <button className="acciones editar huesped" id="boton-editar" data-huesped="{{ huesped.id }}" type="button"><i className='bx bxs-edit-alt'></i></button>
                                    <button className="acciones borrar huesped" id="boton-borrar" data-huesped="{{ huesped.id }}" type="button"><i className='bx bx-x'></i></button>
                                </td> --> */}
                            </tr>
                            
                        </tbody>

                    </table>

                </div>

                <div className="barra-inferior">
                    <p id="cant-reg-huespedes">  Registros </p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right' ></i>
                    </div>
                </div>



                {/* <!-- ---------------------------- FORM ENVIO -------------------------------- --> */}

                {/* <div className="cont-form-contenido crear-huesped" id="cont-form-crear-huesped">
                    <form id="crear-huesped-form" className="form-contenido" method="POST">
                        <div className="cont-titulo-form">
                            <h3 className="titulo-form">Crear huesped</h3>
                            <i className='bx bx-x icono-cerrar' id="icono-cerrar"></i>
                        </div>
                        <div className="form-group">
                            <label for="imput-nombre-huesped">Nombre</label>
                            <input className="imput" id="imput-nombre-huesped" type="text" name="nombre" placeholder="Nombre" required/>
                        </div>
                        <div className="form-group">
                            <label for="imput-apellido-huesped">Apellido</label>
                            <input className="imput" id="imput-apellido-huesped" type="text" name="apellido" placeholder="Apellido" required/>
                        </div>
                        <div className="form-group">
                            <label for="imput-email-huesped">Email</label>
                            <input className="imput" id="imput-email-huesped" type="email" name="email" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <label for="imput-pais-huesped">País</label>
                            <input className="imput" id="imput-pais-huesped" type="text" name="pais" placeholder="País" required/>
                        </div>
                        <div className="form-group">
                            <label for="imput-telefono-huesped">Teléfono</label>
                            <input className="imput" id="imput-telefono-huesped" type="text" name="telefono" placeholder="Teléfono" required/>
                        </div>
                        <div className="form-group">
                            <label for="imput-tipo-doc-huesped">Tipo de Documento</label>
                            <select className="imput" id="imput-tipo-doc-huesped" name="tipo-doc">
                                <option value="rut">Rut</option>
                                <option value="id-card">ID Card</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="imput-num-doc-huesped">N° de Documento</label>
                            <input className="imput" id="imput-num-doc-huesped" type="text" name="num-doc" placeholder="N° de Documento" required/>
                        </div>
                        <input className="boton-submit" type="submit"/>
                    </form>
                </div>


                <!-- ---------------------------- FORM EDICION -------------------------------- -->


                <div className="cont-form-contenido edit-huesped" id="cont-form-edit-huesped">
                    <form id="edit-huesped-form" className="form-contenido" method="POST">
                        <div className="cont-titulo-form">
                            <h3 className="titulo-form">Editar usuario</h3>
                            <i className='bx bx-x icono-cerrar' id="icono-cerrar"></i>
                        </div>
                        <input type="hidden" id="edit-id-huesped" name="id"/>
                        <input className="imput" id="edit-nombre-huesped" type="text" name="nombre" placeholder="Nombre" required/>
                        <input className="imput" id="edit-apellido-huesped" type="text" name="apellido" placeholder="Apellido" required/>
                        <input className="imput" id="edit-email-huesped" type="email" name="email" placeholder="Email" required/>
                        <input className="imput" id="edit-pais-huesped" type="text" name="pais" placeholder="Pais" required/>
                        <input className="imput" id="edit-telefono-huesped" type="text" name="telefono" placeholder="Telefono" required/>
                        <select className="imput" id="edit-tipo-doc-huesped" name="tipo-doc">
                            <option value="rut">Rut</option>
                            <option value="id-card">Id card</option>
                            <option value="pasaporte">Pasaporte</option>
                        </select>
                        <input className="imput" id="edit-num-doc-huesped" type="text" name="num_doc" placeholder="N° de Documento" required/>
                        <input className="boton-submit" type="submit"/>
                    </form>
                </div> */}
            </div>
            
        </div>
    )
}