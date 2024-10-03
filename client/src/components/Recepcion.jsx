import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/recepcion.css';

export function Recepcion() {
  
  const location = useLocation();
  const data = location.state;

  console.log(data);

  return (
    <div className="contenido">
      <div className="titulo-contenido">
        <h4>Recepción</h4>
      </div>

      <div className="recepcion">
        <form action="" className="form-recepcion" method="POST">
          {/* Datos del Huesped Responsable */}
          <div className="cont-datos-huespedes">
            <div className="detalle-huesped resp">
              <div className="cont-titulo-datos">
                <h4 className="titulo-datos">Datos del responsable</h4>
              </div>
              <div className="form-huesped resp">
                <div className="form-group">
                  <label htmlFor="nombre-huesped">Nombre</label>
                  <input className="imput" type="text" name="nombre" placeholder="Nombre" required disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido-huesped">Apellido</label>
                  <input className="imput" type="text" name="apellido" placeholder="Apellido" required disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="email-huesped">Email</label>
                  <input className="imput" type="email" name="email" placeholder="Email" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono-huesped">Teléfono</label>
                  <input className="imput" type="text" name="telefono" placeholder="Teléfono" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="pais-huesped">País</label>
                  <input className="imput" type="text" name="pais" placeholder="País" disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="tipo-doc-huesped">Tipo Documento</label>
                  <select className="imput tipo-doc" name="tipo-doc" disabled>
                    <option value="rut">Rut</option>
                    <option value="id-card">ID Card</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="num-doc-huesped">N° de Documento</label>
                  <input className="imput" type="text" name="num-doc" placeholder="N° de Documento" required disabled />
                </div>
              </div>
            </div>
          </div>

          {/* Datos de la Habitación */}
          <div className="cont-datos-hab-res">
            <div className="rec-datos-habitacion">
              <h4 className="titulo-datos">Detalles de habitación</h4>
              <table className="rec-datos-hab-tabla">
                <tbody>
                  <tr>
                    <th>Numero</th>
                    <td>{data.habitacion.numero}</td>
                  </tr>
                  <tr>
                    <th>Tipo</th>
                    <td>{data.habitacion.tipo}</td>
                  </tr>
                  <tr>
                    <th>Estado</th>
                    <td>{data.habitacion.estado}</td>
                  </tr>
                  <tr>
                    <th>Orientación</th>
                    <td>{data.habitacion.orientacion}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>{data.habitacion.precio}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Datos de la Reserva */}
            <div className="cont-form-reserva">
              <div className="cont-titulo-datos">
                <h4 className="titulo-datos">Datos reserva</h4>
              </div>

              <div className="res-cont-form">
                <div className="cont-doble">
                  <div className="form-group">
                    <label htmlFor="fecha-entrada">Fecha entrada</label>
                    <input className="imput" type="date" name="fecha-entrada" readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fecha-salida">Fecha salida</label>
                    <input className="imput" type="date" name="fecha-salida" required />
                  </div>
                </div>
                <div className="cont-doble">
                  <div className="form-group">
                    <label htmlFor="tipo-pago">Tipo de Pago</label>
                    <select className="imput tipo-pago" name="tipo-pago">
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta">Tarjeta</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="adelanto">Adelanto</label>
                    <input className="imput" type="number" name="adelanto" placeholder="Adelanto" min="0" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="total-pago">Total a pagar</label>
                    <input className="imput" type="number" name="total-pago" placeholder="Total" min="0" readOnly required value={data.precio} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="observacion">Observación</label>
                  <textarea className="textarea" name="observacion"></textarea>
                </div>

                <input className="boton-submit" type="submit" value="Reservar" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
