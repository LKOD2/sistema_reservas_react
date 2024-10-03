import React, { useState, useRef, useEffect } from 'react';

import '../styles/hoteles.css'

export function Hoteles () {
    const hoteles = []
    const [crearModalVisible, setCrearModalVisible] = useState(false);
    const [editarModalVisible, setEditarModalVisible] = useState(false);
    const [hotelAEditar, setHotelAEditar] = useState(null);

    const handleCrear = () => setCrearModalVisible(true);

    const handleEditar = (hotel) => {
        setHotelAEditar(hotel);
        setEditarModalVisible(true);
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido"><h4>Hoteles</h4></div>

            <div className="cont-agregar">
                <button className="boton-crear" onClick={handleCrear}>Crear nuevo</button>
                <input className="buscador-contenido" type="text" placeholder="Buscar" />
            </div>

            <div className="data">
                <table>
                <thead className="head-tabla-hotel">
                    <tr>
                    <th>nombre</th>
                    <th>direccion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="body-tabla-hotel">
                {hoteles.length > 0 ? (
                    hoteles.map((hotel) => (
                    <tr key={hotel.ID}>
                        <td>{hotel.nombre}</td>
                        <td>{hotel.direccion}</td>
                        <td>{hotel.estado}</td>
                        <td>
                        <button className="acciones editar hotel" onClick={() => handleEditar(hotel)} type="button">
                            <i className="bx bxs-edit-alt"></i>
                        </button>
                        <button className="acciones borrar hotel" type="button">
                            <i className="bx bx-x"></i>
                        </button>
                        <button className="acciones seleccionar hotel" type="button">
                            <i className="bx bx-check"></i>
                        </button>
                        </td>
                    </tr>
                    ))):(
                        <tr>
                            <td colSpan="4">No hay hoteles disponibles</td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>

            <div className="barra-inferior">
                <p>{hoteles.length} Registros</p>
                <div className="cont-num-pagina">
                <i className="bx bxs-chevron-left"></i>
                <p>3</p>
                <i className="bx bxs-chevron-right"></i>
                </div>
            </div>

            {crearModalVisible && (
                <FormularioCrearHotel funcion={setCrearModalVisible}/>
                
            )}

            {editarModalVisible && hotelAEditar && (
                <FormularioEditarHotel hotel={hotelAEditar} funcion={setEditarModalVisible}/>
            )}
        </div>
    );
};

const FormularioCrearHotel = ({funcion}) => {

    const formCrear = useRef(null)

    useEffect(()=>{
        formCrear.current.showModal()
    }, [])

    const closeDialog = () => {
        formCrear.current.close();
        funcion(false);
      };

    return (
        <dialog ref={formCrear} className="cont-form-contenido activo">
            <form className="form-contenido" method="POST">
                <div className="cont-titulo-form">
                    <h3 className="titulo-form">Crear hotel</h3>
                    <i className="bx bx-x icono-cerrar" onClick={closeDialog}></i>
                </div>
                <div className="form-group">
                    <label className="label-input">Nombre</label>
                    <input className="imput" type="text" name="nombre" placeholder="Nombre" min="1" required />
                    <label className="label-error"></label>
                </div>
                <div className="form-group">
                    <label className="label-input">Dirección</label>
                    <input className="imput" type="text" name="direccion" placeholder="Dirección" required />
                    <label className="label-error"></label>
                </div>
                <div className="form-group">
                    <label className="label-input">Estado</label>
                    <select className="imput opcion" name="estado">
                    <option value="activo">Activo</option>
                    <option value="desactivo">Desactivo</option>
                    </select>
                </div>
                <input className="boton-submit" type="submit" />
            </form>
        </dialog>
    );
};

const FormularioEditarHotel = ({ hotel, funcion }) => {
    
    const formEdit = useRef(null)

    useEffect(()=>{
        formEdit.current.showModal()
    }, [])

    const closeDialog = () => {
        formEdit.current.close();
        funcion(false);
      };

    return(
        <dialog ref={formEdit} className="cont-form-contenido">
            <form className="form-contenido" method="POST">
                <div className="cont-titulo-form">
                    <h3 className="titulo-form">Editar hotel</h3>
                    <i className="bx bx-x icono-cerrar" onClick={closeDialog}></i>
                </div>
                <div className="form-group">
                    <label className="label-input">Nombre</label>
                    <input className="imput" type="text" name="nombre" defaultValue={hotel.nombre} placeholder="Nombre" min="1" required />
                    <label className="label-error"></label>
                </div>
                <div className="form-group">
                    <label className="label-input">Dirección</label>
                    <input className="imput" type="text" name="direccion" defaultValue={hotel.direccion} placeholder="Dirección" required />
                    <label className="label-error"></label>
                </div>
                <div className="form-group">
                    <label className="label-input">Estado</label>
                    <select className="imput opcion" name="estado" defaultValue={hotel.estado}>
                    <option value="activo">Activo</option>
                    <option value="desactivo">Desactivo</option>
                    </select>
                </div>
                <input className="boton-submit" type="submit" />
            </form>
        </dialog>
    )
};

