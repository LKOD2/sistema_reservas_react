import React, { useState } from "react";

import "../styles/habitaciones.css"

export function Habitaciones(){
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);

    const manejarCrear = (e) => {
        setModoCrear(!modoCrear);
    };

    const manejarEditar = (e) => {
        setModoEditar(!modoEditar);
    };

    var habitacion = {numero: 1,tipo: 'triple', precio: 20000, estado: 'disponible'}


    return(
        <div className="contenido" id="usuarios">

            <div className="titulo-contenido"><h4>Habitaciones</h4></div>

            <div className="habitaciones">

                <div className="cont-agregar">
                    <button className="boton-crear" id="boton-crear-habitacion" onClick={manejarCrear}>Crear nuevo</button>
                    <input className="buscador-contenido" type="text" placeholder="Buscar"/>
                </div>

                <div className="data" id="contenido-habitaciones">

                    <table>
                        <thead className="head-tabla-habitacion">
                            <tr>
                                <th>Numero</th>
                                <th>Tipo</th>
                                <th>Orientacion</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="body-tabla-habitacion" id="body-tabla-habitacion">

                            <tr>
                                <td>{habitacion.numero}</td>
                                <td>{habitacion.tipo}</td>
                                <td>{habitacion.orientacion}</td>
                                <td>{habitacion.precio}</td>
                                <td><div className={`estado ${habitacion.estado}`}>{habitacion.estado}</div></td>
                                
                                <td>
                                    <button className="acciones editar hab" id="boton-editar" data-habitacion="{ habitacion.numero }" type="button" onClick={manejarEditar}><i className='bx bxs-edit-alt'></i></button>
                                    <button className="acciones borrar hab" id="boton-borrar" data-habitacion="{ habitacion.numero }" type="button"><i className='bx bx-x'></i></button>
                                </td>
                            </tr>
                            
                        </tbody>

                    </table>

                </div>

                <div className="barra-inferior">
                    <p id="cant-reg-habitaciones">  Registros</p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right' ></i>
                    </div>
                </div>

            

                {/* <!-- ---------------------------- FORM CREAR -------------------------------- --> */}
                
                <div className={`cont-form-contenido ${modoCrear ? 'activo' : ''} crear-habitacion`} onClick={manejarCrear}>
                    <form id="crear-habitacion-form" action="" className="form-contenido" method="POST">
                        <div className="cont-titulo-form">
                            <h3 className="titulo-form">Crear habitación</h3>
                            <i className='bx bx-x icono-cerrar' id="icono-cerrar" onClick={manejarCrear}></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="crear-numero-habitacion" className="label-input">Numero</label>
                            <input className="imput" id="crear-numero-habitacion" type="number" name="numero" placeholder="Número" min="1" max="500" required/>
                            <label htmlFor="crear-numero-habitacion" className="label-error" id="error-crear-numero-hab"></label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="crear-tipo-habitacion" className="label-input">Tipo</label>
                            <select className="imput opcion" id="crear-tipo-habitacion" name="tipo">
                                <option value="simple">Simple</option>
                                <option value="doble">Doble</option>
                                <option value="triple">Triple</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="crear-estado-habitacion" className="label-input">Estado</label>
                            <select className="imput opcion" id="crear-estado-habitacion" name="estado">
                                <option value="disponible">Disponible</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="ocupada">Ocupada</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="crear-orientacion" className="label-input">Orientación</label>
                            <select className="imput opcion" id="crear-orientacion-habitacion" name="orientacion">
                                <option value="norte">Norte</option>
                                <option value="sur">Sur</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="crear-precio-habitacion" className="label-input">Precio</label>
                            <input className="imput" id="crear-precio-habitacion" type="number" name="precio" placeholder="Precio" value="20000" min="1" required/>
                            <label htmlFor="crear-precio-habitacion" className="label-error" id="error-crear-precio-hab"></label>

                        </div>
                        <input className="boton-submit" type="submit"/>
                    </form>
                </div>

                {/* <!-- ---------------------------- FORM EDICION -------------------------------- --> */}

                <div className={`cont-form-contenido ${modoEditar ? 'activo' : ''} edit-habitacion`} id="cont-form-edit-habitacion">
                    <form id="edit-habitacion-form" action="" className="form-contenido" method="POST">
                        <div className="cont-titulo-form">
                            <h3 className="titulo-form" id="titulo-form-edit">Editar habitación</h3>
                            <i className='bx bx-x icono-cerrar' id="icono-cerrar" onClick={manejarEditar}></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-numero-habitacion" className="label-input">Numero</label>
                            <input className="imput" id="edit-numero-habitacion" type="number" name="numero" placeholder="Numero" min="1" required readonly/>
                            <label htmlFor="edit-numero-habitacion" className="label-error" id="error-edit-numero-hab"></label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-tipo-habitacion" className="label-input">Tipo</label>
                            <select className="imput opcion" id="edit-tipo-habitacion" name="tipo">
                                <option value="simple">Simple</option>
                                <option value="doble">Doble</option>
                                <option value="triple">Triple</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-estado-habitacion" className="label-input">Estado</label>
                            <select className="imput opcion" id="edit-estado-habitacion" name="estado">
                                <option value="disponible">Disponible</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="ocupada">Ocupada</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-orientacion" className="label-input">Orientación</label>
                            <select className="imput opcion" id="edit-orientacion-habitacion" name="orientacion">
                                <option value="norte">Norte</option>
                                <option value="sur">Sur</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-precio-habitacion" className="label-input">Precio</label>
                            <input className="imput" id="edit-precio-habitacion" type="number" name="precio" placeholder="Precio" min="1" required/>
                            <label htmlFor="edit-precio-habitacion" className="label-error" id="error-edit-precio-hab"></label>

                        </div>
                        <input className="boton-submit" type="submit"/>
                    </form>
                </div>
                
            </div>
        </div>

    )
}