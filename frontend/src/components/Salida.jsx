
import '../styles/salida.css'

export function Salida (){
    const data = ''
    return(
        <div className="contenido">

            <div className="titulo-contenido"><h4>Salida</h4></div>

            <div className="sal-data">

                {/* <!-- ---------------------------- DATOS HUESPED RESPONSABLE -------------------------------- --> */}
                <div className="sal-cont-datos">
                
                    <div className="sal-datos-huesped">
                        <div className="sal-cont-titulo-form">
                            <h4 className="titulo-form">Datos del huésped responsable</h4>
                        </div>
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <td id="nombre-responsable">{data.nombre}</td>
                            </tr>
                            <tr>
                                <th>Apellido</th>
                                <td id="apellido-responsable">{data.apellido}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td id="email-responsable">{data.email}</td>
                            </tr>
                            <tr>
                                <th>Teléfono</th>
                                <td id="telefono-responsable">{data.telefono}</td>
                            </tr>
                            <tr>
                                <th>Pais</th>
                                <td id="telefono-responsable">{data.pais}</td>
                            </tr>
                            <tr>
                                <th>Tipo de documento</th>
                                <td id="telefono-responsable">{data.tipo_documento}</td>
                            </tr>
                            <tr>
                                <th>N documento</th>
                                <td id="telefono-responsable">{data.num_documento}</td>
                            </tr>
                        </table>
                    </div>

                    {/* <!-- ---------------------------- DATOS HABITACION -------------------------------- --> */}

                    <div className="sal-datos-habitacion">
                        <div className="cont-titulo-form">
                            <h4 className="titulo-form">Detalles habitación</h4>
                        </div>
                        <table>
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

                    {/* <!-- ---------------------------- DATOS RESERVA -------------------------------- --> */}

                    <div className="sal-datos-reserva" id="sal-cont-datos-reserva">

                        <div className="cont-titulo-form">
                            <h4 className="titulo-form" >Datos de la reserva</h4>
                        </div>

                        <table>
                            <tr>
                                <th>Fecha entrada</th>
                                <td id="fecha-entrada">{data.fecha_entrada}</td>
                            </tr>
                            <tr>
                                <th>Fecha salida</th>
                                <td id="fecha-salida">{data.fecha_salida}</td>
                            </tr>
                            <tr>
                                <th>Observación</th>
                                <td id="observacion-reserva">{data.observacion}</td>
                            </tr>
                        </table>
                    </div>
                
                </div> 

                <form className="sal-form-salida" id="formulario-salida" method="POST">
                    <input type="hidden" name="reserva_id" value="{{data.datos_reserva.ID}}"/>

                    {/* <!-- ---------------------------- RESUMEN DE PAGOS -------------------------------- --> */}

                    <div className="sal-datos-pagos">
                        <h4 className="titulo-form">Resumen de pagos</h4>
                        <div className="sal-cont-inputs">
                            <div className="form-group">
                                <label for="costo-estadia">Costo Estadia</label>
                                <input className="imput" id="costo-estadia" type="text" name="costo-estadia" value="{{data.datos_pago.precio_inicial}}" readonly/>
                            </div>
                            <div className="form-group">
                                <label for="adelanto">Adelanto</label>
                                <input className="imput" id="adelanto" type="number" name="adelanto" value="{{data.datos_pago.adelanto}}" readonly/>
                            </div>
                            <div className="form-group">
                                <label for="restante-pago">Restante por pagar</label>
                                <input className="imput" id="restante-pago" type="number" name="restante-pago" value="{{data.datos_pago.restante}}" readonly/>
                            </div>
                            <div className="form-group">
                                <label for="multa-pago">Multa</label>
                                <input className="imput" id="multa-pago" type="number" name="multa-pago" value="{{data.datos_pago.multa}}"/>
                            </div>

                        </div>
                    </div>
                    <div className="cont-doble-boton">
                        <div className="form-group-total">
                            <label for="total-pago">Total a pagar</label>
                            <input className="imput" id="total-pago" type="number" name="total-pago" value="{{data.datos_pago.restante}}" readonly/>
                        </div>
                        <input className="boton-submit" type="submit" value="Finalizar"/>
                    </div>

                </form>

            </div>

        </div>
    )
}