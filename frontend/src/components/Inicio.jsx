import React from "react";
import { Link } from "react-router-dom";

import "../styles/inicio.css";

export function Inicio() {
  return (
    <div className="contenido">
      <div className="titulo-contenido">
        <i className='bx bxs-home-alt-2'></i>
        <h4>Inicio</h4>
      </div>

      <div className="inicio">
        <div className="inicio-grid">
          <Link to={'/disponibles'} state={'disponibles'}>
            <div className="widget disponible">
              <div className="estado">
                <p>Disponibles</p>
              </div>
              <div className="cont-numero-icono">
                <div className="numero">300</div>
                <div className="icono">
                  <i className='bx bx-hotel'></i>
                </div>
              </div>
            </div>
          </Link>

          <Link to={'/ocupadas'} state={'ocupadas'}>
            <div className="widget ocupada">
              <div className="estado">
                <p>Ocupadas</p>
              </div>
              <div className="cont-numero-icono">
                <div className="numero">1</div>
                <div className="icono">
                  <i className='bx bx-hotel'></i>
                </div>
              </div>
            </div>
          </Link>

          <Link to={'/limpieza'} state={'limpieza'}>
            <div className="widget limpieza">
              <div className="estado">
                <p>Limpieza</p>
              </div>
              <div className="cont-numero-icono">
                <div className="numero">20</div>
                <div className="icono">
                  <i className='bx bx-hotel'></i>
                </div>
              </div>
            </div>
          </Link>

          <Link to={'/todas'} state={'todas'}>
            <div className="widget todas">
              <div className="estado">
                <p>Todas</p>
              </div>
              <div className="cont-numero-icono">
                <div className="numero">100</div>
                <div className="icono">
                  <i className='bx bx-hotel'></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
