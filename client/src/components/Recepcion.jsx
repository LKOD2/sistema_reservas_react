import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/recepcion.css';

export function Recepcion() {

    const navigate = useNavigate();
    const location = useLocation();
    const dataHabitacion = location.state;
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))

    const [dataHuesped, setDataHuesped]= useState({
        hotel: hotel.id,
        nombre: '', 
        apellido: '',
        email: '', 
        telefono: '', 
        pais: '', 
        tipo_documento: 'rut', 
        num_documento: '', 
        estado: 'activo'
    }) 

    const [dataReserva, setDataReserva] = useState({
        fecha_entrada: new Date().toISOString().split('T')[0], 
        fecha_salida: '', 
        observacion: '', 
        estado: 'confirmada'
    })

    const [dataPago, setDataPago] = useState({
        adelanto: 0, 
        total_estadia: dataHabitacion.habitacion.precio, 
        saldo_restante: 0,
    })

    useEffect(() => {
        if (!hotel){
            alert('Para realizar una reserva debes seleccionar un hotel');
            navigate('/general');
            return;
        } 
    }, [hotel]); 

    useEffect(() => {
        if (dataReserva.fecha_salida && dataReserva.fecha_salida > dataReserva.fecha_entrada) {
            console.log('fecha salida');
            
            
            const entrada = new Date(dataReserva.fecha_entrada);
            const salida = new Date(dataReserva.fecha_salida);
            const dias = (salida - entrada) / (1000 * 60 * 60 * 24);
            
            const total =  dias * dataHabitacion.habitacion.precio 
            const saldo =  dias * dataHabitacion.habitacion.precio - dataPago.adelanto
            

            //setDataPago({...dataPago, total_estadia : total});
            setDataPago({...dataPago, saldo_restante : saldo, total_estadia : total});

        } else if (dataPago.adelanto) {
            const total =  dataPago.total_estadia - dataPago.adelanto
            setDataPago({...dataPago, total_estadia : total});
        }
        
    }, [dataReserva.fecha_salida, dataHabitacion.habitacion.precio, dataPago.adelanto]);


    const manejarCambioHuesped = (e) => {
        setDataHuesped({ ...dataHuesped, [e.target.name]: e.target.value });
    };

    const manejarCambioReserva = (e) => {
        setDataReserva({ ...dataReserva, [e.target.name]: e.target.value });
    };

    const manejarCambioPago = (e) => {
        setDataPago({ ...dataPago, [e.target.name]: e.target.value });
    };

    const enviarDatos = async (e) => {
        e.preventDefault();

        const formData = {
            huesped: dataHuesped, 
            reserva: dataReserva, 
            habitacion: dataHabitacion.habitacion.id,
            pago: dataPago
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8000/gestion/reservar/', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`Reserva creada con éxito`);
                navigate('/inicio');
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="contenido">
            <div className="titulo-contenido">
                <h4>Recepción</h4>
            </div>

            <div className="recepcion">
                <form action="" className="form-recepcion" method="POST" onSubmit={enviarDatos}>
                    {/* Datos del Huesped Responsable */}
                    <div className="cont-datos-huespedes">
                        <div className="detalle-huesped resp">
                            <div className="cont-titulo-datos">
                                <h4 className="titulo-datos">Datos del responsable</h4>
                            </div>
                            <div className="form-huesped resp">
                                <div className="form-group">
                                    <label htmlFor="nombre-huesped">Nombre</label>
                                    <input 
                                        className="imput" 
                                        type="text" 
                                        name="nombre" 
                                        placeholder="Nombre" 
                                        required
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input 
                                        className="imput" 
                                        type="text" 
                                        name="apellido" 
                                        placeholder="Apellido" 
                                        required 
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.apellido}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        className="imput" 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email"  
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input 
                                        className="imput" 
                                        type="text" 
                                        name="telefono" 
                                        placeholder="Teléfono" 
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.telefono}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pais">País</label>
                                    <input 
                                        className="imput" 
                                        type="text" 
                                        name="pais" 
                                        placeholder="País"
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.pais}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipo_documento">Tipo Documento</label>
                                    <select 
                                        className="imput tipo-doc" 
                                        name="tipo_documento" 
                                        onChange={manejarCambioHuesped}
                                        value={dataHuesped.tipo_documento}
                                    >
                                        <option value="rut">Rut</option>
                                        <option value="id-card">ID Card</option>
                                        <option value="pasaporte">Pasaporte</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="num-documento">N° de Documento</label>
                                    <input 
                                        className="imput" 
                                        type="text" 
                                        name="num_documento" 
                                        placeholder="N° de Documento" 
                                        required 
                                        onChange={manejarCambioHuesped} 
                                        value={dataHuesped.num_documento}
                                    />
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
                                        <th>Número</th>
                                        <td>{dataHabitacion.habitacion.numero}</td>
                                    </tr>
                                    <tr>
                                        <th>Tipo</th>
                                        <td>{dataHabitacion.habitacion.tipo}</td>
                                    </tr>
                                    <tr>
                                        <th>Estado</th>
                                        <td>{dataHabitacion.habitacion.estado}</td>
                                    </tr>
                                    <tr>
                                        <th>Orientación</th>
                                        <td>{dataHabitacion.habitacion.orientacion}</td>
                                    </tr>
                                    <tr>
                                        <th>Precio por noche</th>
                                        <td>{dataHabitacion.habitacion.precio}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* DATOS DE LA RESERVA */}

                        <div className="cont-form-reserva">
                            <div className="cont-titulo-datos">
                                <h4 className="titulo-datos">Datos reserva</h4>
                            </div>

                            <div className="res-cont-form">
                                <div className="cont-doble">
                                    <div className="form-group">
                                        <label htmlFor="fecha-entrada">Fecha entrada</label>
                                        <input 
                                            className="imput" 
                                            type="date" 
                                            name="fecha_entrada" 
                                            readOnly 
                                            onChange={manejarCambioReserva}
                                            value={dataReserva.fecha_entrada}
                                            />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fecha-salida">Fecha salida</label>
                                        <input 
                                            className="imput" 
                                            type="date" 
                                            name="fecha_salida" 
                                            required
                                            min={dataReserva.fecha_entrada}
                                            onChange={manejarCambioReserva}
                                            value={dataReserva.fecha_salida}
                                        />
                                    </div>
                                </div>

                                {/* DATOS DEL PAGO */}

                                <div className="cont-doble">
                                    {/* <div className="form-group">
                                        <label htmlFor="tipo-pago">Tipo de Pago</label>
                                        <select 
                                            className="imput tipo-pago" 
                                            name="tipo_pago"
                                            onChange={manejarCambioPago}
                                            value={dataPago.tipo_pago}
                                            >
                                            <option value="efectivo">Efectivo</option>
                                            <option value="tarjeta">Tarjeta</option>
                                        </select>
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="adelanto">Adelanto</label>
                                        <input 
                                            className="imput" 
                                            type="number" 
                                            name="adelanto" 
                                            placeholder="Adelanto" 
                                            min="0" 
                                            required 
                                            onChange={manejarCambioPago}
                                            value={dataPago.adelanto}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="total_estadia">Costo estadia</label>
                                        <input 
                                            className="imput" 
                                            type="number" 
                                            name="total_estadia" 
                                            placeholder="Total" 
                                            min="0" 
                                            readOnly 
                                            required 
                                            onChange={manejarCambioPago}
                                            value={dataPago.total_estadia} 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="observacion">Observación</label>
                                    <textarea 
                                        className="textarea" 
                                        name="observacion"
                                        onChange={manejarCambioPago}
                                        value={dataPago.observacion} 
                                    ></textarea>
                                </div>

                                {/* <input className="boton-submit" type="submit" value="Reservar" /> */}
                                <div className="cont-doble-boton">
                                    <div className="form-group-total">
                                        <label for="total-pago">Total por pagar</label>
                                        <input 
                                            className="imput" 
                                            id="total-pago" 
                                            type="number" 
                                            name="saldo_restante" 
                                            readOnly
                                            onChange={manejarCambioPago}
                                            value={dataPago.saldo_restante}
                                        />
                                    </div>
                                    <input className="boton-submit" type="submit" value="Finalizar"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

