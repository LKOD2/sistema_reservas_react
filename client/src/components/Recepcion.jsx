import React from "react";
import '../styles/recepcion.css'

export function Recepcion (){
    const data = ''
    return(
        <div className="contenido">

            <div className="titulo-contenido"><h4>Recepción</h4></div>

            <div className="recepcion">
        
                <form action="" className="form-recepcion" id="form-recepcion" method="POST">
            
                    {/* <!-- ---------------------------- FORM HUESPED -------------------------------- --> */}
            
                    <div className="cont-datos-huespedes" id="cont-form-recepcion">
            
            
                        <div  className="detalle-huesped resp" id="detalle-huesped-resp">
                            
                            <div className="cont-titulo-datos">
                                <h4 className="titulo-datos">Datos del responsable</h4>
                            </div>
                            <div className="form-huesped resp" id="form-huesped-resp">
                                
                                    <div className="form-group">
                                        <label htmlFor="imput-nombre-huesped">Nombre</label>
                                        <input className="imput" id="imput-nombre-huesped" type="text" name="nombre" placeholder="Nombre" required disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imput-apellido-huesped">Apellido</label>
                                        <input className="imput" id="imput-apellido-huesped" type="text" name="apellido" placeholder="Apellido" required disabled/>
                                    </div>    
                                
                                
                                    <div className="form-group">
                                        <label htmlFor="imput-email-huesped">Email</label>
                                        <input className="imput" id="imput-email-huesped" type="email" name="email" placeholder="Email" disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imput-telefono-huesped">Teléfono</label>
                                        <input className="imput" id="imput-telefono-huesped" type="text" name="telefono" placeholder="Teléfono" disabled/>
                                    </div>
                                
            
                                
                                    <div className="form-group">
                                        <label htmlFor="imput-pais-huesped">País</label>
                                        <input className="imput" id="imput-pais-huesped" type="" name="pais" placeholder="País" disabled/>
                                    </div>    
                                    <div className="form-group">
                                        <label htmlFor="imput-tipo-doc-huesped">Tipo Documento</label>
                                        <select className="imput tipo-doc" id="imput-tipo-doc-huesped" name="tipo-doc" disabled>
                                            <option value="rut">Rut</option>
                                            <option value="id-card">ID Card</option>
                                            <option value="pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imput-num-doc-huesped">N° de Documento</label>
                                        <input className="imput" id="imput-num-doc-huesped" type="text" name="num-doc" placeholder="N° de Documento" required disabled/>
                                    </div>    
                                
                            </div>
                        </div>

            

            
                    </div>
            
                    <div className="cont-datos-hab-res">
            
                        {/* <!-- ---------------------------- DATOS HABITACION -------------------------------- --> */}
            
            
                        <div className="rec-datos-habitacion" id="rec-datos-habitacion" ID-hab= "{{data.ID}}" >
                            <h4 className="titulo-datos">Detalles de habitación</h4>
                            <table className="rec-datos-hab-tabla">
                                <tr>
                                    <th>Numero</th>
                                    <td id="numero-habitacion">{data.numero}</td>
                                </tr>
                                <tr>
                                    <th>Tipo</th>
                                    <td id="tipo-habitacion">{data.tipo}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td id="estado-habitacion">{data.estado}</td>
                                </tr>
                                <tr>
                                    <th>Orientación</th>
                                    <td id="orientacion-habitacion">{data.orientacion}</td>
                                </tr>
                                <tr>
                                    <th>Precio</th>
                                    <td id="precio-habitacion">{data.precio}</td>
                                </tr>
                            </table>
                        </div>
                
                        {/* <!-- ---------------------------- FORM RESERVA -------------------------------- --> */}
                
                        <div className="cont-form-reserva " id="cont-form-reserva">
            
                            <div className="cont-titulo-datos">
                                <h4 className="titulo-datos">Datos reserva</h4>
            
                            </div>
            
                            <div className="res-cont-form">
            
                                <div className="cont-doble">
                                    <div className="form-group">
                                        <label htmlFor="imput-fecha-entrada">Fecha entrada</label>
                                        <input className="imput" id="imput-fecha-entrada" type="date" name="fecha-entrada" value="" readonly/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imput-fecha-salida">Fecha salida</label>
                                        <input className="imput" id="imput-fecha-salida" type="date" name="fecha-salida" required/>
                                    </div>    
                                </div>
                                <div className="cont-doble">
                                    <div className="form-group">
                                        <label htmlFor="imput-tipo-pago">Tipo de Pago</label>
                                        <select className="imput tipo-pago" id="imput-tipo-pago" name="tipo-pago">
                                            <option value="efectivo">Efectivo</option>
                                            <option value="tarjeta">Tarjeta</option>
                                        </select>
                                    </div>    
                                    <div className="form-group">
                                        <label htmlFor="imput-adelanto">Adelanto</label>
                                        <input className="imput" id="imput-adelanto" type="number" name="adelanto" placeholder="Adelanto" min="0" value="0" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imput-total-pago">Total a pagar</label>
                                        <input className="imput" id="imput-total-pago" type="number" name="total-pago" placeholder="Total" min="0" value="{{data.precio}}" readonly required/>
                                    </div>
            
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imput-observacion">Observación</label>
                                    <textarea className="textarea" id="imput-observacion" name="observacion"></textarea>
                                </div>
                
                                <input className="boton-submit" type="submit" value="Reservar"/>
                            </div>
                
                        </div>    
                        
                    </div>
                </form>
            </div>
        </div> 
    )
}