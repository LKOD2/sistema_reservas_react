import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../styles/salida.css'

export function Salida() {

    const navigate = useNavigate();
    const location = useLocation();
    const dataHabitacion = location.state;
    const [hotel, setHotel] = useState(JSON.parse(localStorage.getItem('hotel')))
    const [dataHuesped, setDataHuesped] = useState({});
    const [dataReserva, setDataReserva] = useState({})
    const [dataVentaReserva, setDataVentaReserva] = useState({})
    const [productosVendidos, setProductosVendidos] = useState([]);
    const [total, setTotal] = useState(0)

    const venta = []

    useEffect(() => {
        if (!hotel) {
            alert('Para ver las habitaiones debes seleccionar un hotel');
            navigate('/general');
            return;
        }
        getDatos();
    }, [hotel]);


    useEffect(() => {
        let totalProductos = 0;
    
        // Verificar si hay productos vendidos y calcular el subtotal de los productos
        if (productosVendidos && productosVendidos.length > 0) {
            totalProductos = productosVendidos.reduce((acc, producto) => acc + (producto.subtotal || 0), 0);
            console.log('total productos', totalProductos);
            
        }
    
        // Calcular el total según los productos vendidos
        const total = (parseFloat(dataVentaReserva.saldo_restante) || 0) + (parseFloat(dataVentaReserva.multa) || 0) + totalProductos;
        console.log('datos sumados >', dataVentaReserva.saldo_restante, dataVentaReserva.multa, totalProductos);
        console.log('total >', total);
        // Actualizar el estado de total
        setTotal(total);
    }, [productosVendidos, dataVentaReserva.saldo_restante, dataVentaReserva.multa]); // Dependencias actualizadas
    
    const manejarMulta = (e) => {
        const multa = parseFloat(e.target.value) || 0; // Convertir el valor del input a número
        setDataVentaReserva((prevState) => ({
            ...prevState,
            multa: multa, // Actualizar solo el campo multa
        }));
    };
    
    // MANEJO DE DATOS
    const getDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Inicia sesión primero.");
                return;
            }

            const response = await fetch(
                `http://localhost:8000/gestion/salida?habitacion=${dataHabitacion.habitacion.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDataReserva(data.reserva)
                setDataHuesped(data.huesped);
                setDataVentaReserva(data.venta_reserva)
                setProductosVendidos(data.productos_vendidos || []);


            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    // ENVIO DE DATOS

    const enviarDatos = async (e) => {
        e.preventDefault();

        const formData = {
            habitacion: dataHabitacion.habitacion.id,
        };

        console.log('========>>', dataHabitacion.habitacion.id);


        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8000/gestion/salida/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`Check-out realizado con exito`);
                navigate('/inicio')
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

            <div className="titulo-contenido"><h4>Salida</h4></div>

            <div className="salida">

                {/* <!-- ---------------------------- DATOS HUESPED RESPONSABLE -------------------------------- --> */}
                <div className="sal-cont-datos">

                    <div className="sal-datos-huesped">
                        <div className="sal-cont-titulo-form">
                            <h4 className="titulo-form">Datos del huésped responsable</h4>
                        </div>
                        <table>
                            {dataHuesped ? (
                                <>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{dataHuesped.nombre} {dataHuesped.apellido}</td>
                                    </tr>

                                    <tr>
                                        <th>Email</th>
                                        <td>{dataHuesped.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Teléfono</th>
                                        <td>{dataHuesped.telefono}</td>
                                    </tr>
                                    <tr>
                                        <th>{dataHuesped.tipo_documento}</th>
                                        <td>{dataHuesped.num_documento}</td>
                                    </tr>
                                </>
                            ) : (null)}
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
                                <td>{dataHabitacion.habitacion.numero}</td>
                            </tr>
                            <tr>
                                <th>Tipo</th>
                                <td>{dataHabitacion.habitacion.tipo}</td>
                            </tr>
                            <tr>
                                <th>Orientación</th>
                                <td>{dataHabitacion.habitacion.orientacion}</td>
                            </tr>
                            <tr>
                                <th>Precio por noche</th>
                                <td>{dataHabitacion.habitacion.precio}</td>
                            </tr>
                        </table>
                    </div>

                    {/* <!-- ---------------------------- DATOS RESERVA -------------------------------- --> */}

                    <div className="sal-datos-reserva">

                        <div className="cont-titulo-form">
                            <h4 className="titulo-form" >Datos de la reserva</h4>
                        </div>

                        <table>
                            <tr>
                                <th>Fecha entrada</th>
                                <td>{dataReserva.fecha_entrada}</td>
                            </tr>
                            <tr>
                                <th>Fecha salida</th>
                                <td>{dataReserva.fecha_salida}</td>
                            </tr>
                            <tr>
                                <th>Observación</th>
                                <td>{dataReserva.observacion}</td>
                            </tr>
                        </table>
                    </div>

                </div>

                <form className="sal-form-salida" onSubmit={enviarDatos}>

                    {/* <!-- ---------------------------- RESUMEN DE PAGOS -------------------------------- --> */}

                    <div className="sal-datos-pagos">
                        <h4 className="titulo-form">Resumen de pagos</h4>
                        <div className="sal-cont-inputs">
                            <div className="form-group">
                                <label for="costo-estadia">Costo Estadia</label>
                                <input
                                    className="imput"
                                    id="costo-estadia"
                                    type="text"
                                    name="costo-estadia"
                                    value={dataVentaReserva.total_estadia}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label for="adelanto">Adelanto</label>
                                <input
                                    className="imput"
                                    id="adelanto"
                                    type="number"
                                    name="adelanto"
                                    value={dataVentaReserva.adelanto}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label for="restante-pago">Saldo restante</label>
                                <input
                                    className="imput"
                                    id="restante-pago"
                                    type="number"
                                    name="restante-pago"
                                    readOnly
                                    value={dataVentaReserva.saldo_restante}
                                />
                            </div>
                            <div className="form-group">
                                <label for="multa-pago">Multa</label>
                                <input
                                    className="imput"
                                    id="multa-pago"
                                    type="number"
                                    name="multa"
                                    onChange={manejarMulta}
                                    value={dataVentaReserva.multa}
                                />
                            </div>

                        </div>
                    </div>

                    {/* <!-- ---------------------------- VENTAS -------------------------------- --> */}

                    <div className="sal-datos-pagos">
                        <h4 className="titulo-form">Servicio al cuarto</h4>
                        {productosVendidos.length > 0 ? (

                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio unitario</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosVendidos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.subtotal}</td>
                                            <td><div className={`estado ${producto.estado}`}>{producto.estado}</div></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No hay productos vendidos.</p>
                        )}
                    </div>


                    <div className="cont-doble-boton">
                        <div className="form-group-total">
                            <label for="total-pago">Total a pagar</label>
                            <input className="imput" id="total-pago" type="number" name="total-pago" value={total} readOnly />
                        </div>
                        <input className="boton-submit" type="submit" value="Finalizar" />
                    </div>

                </form>

            </div>

        </div>
    )
}