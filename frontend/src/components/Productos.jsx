import React, { useState } from "react";
import '../styles/productos.css';

export function Productos() {
    const [productos, setProductos] = useState([
        {
            codigo: "P001",
            nombre: "Producto 1",
            descripcion: "Descripción del producto 1",
            precio: 100,
            stock: 50,
            estado: "disponible"
        },
        // Agrega más productos aquí
    ]);
    const [filtro, setFiltro] = useState("disponible");
    const [busqueda, setBusqueda] = useState("");
    const [modoCrear, setModoCrear] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);
    const [productoActual, setProductoActual] = useState(null);

    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const manejarCrear = () => {
        setModoCrear(true);
    };

    const manejarEditar = (producto) => {
        setProductoActual(producto);
        setModoEditar(true);
    };

    const manejarCerrarFormulario = () => {
        setModoCrear(false);
        setModoEditar(false);
        setProductoActual(null);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
    };

    const productosFiltrados = productos.filter(producto =>
        producto.estado === filtro || filtro === "todos"
    ).filter(producto =>
        producto.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="contenido">
            <div className="titulo-contenido">
                <h4>Productos</h4>
            </div>

            <div className="productos">
                <div className="cont-agregar">
                    <button className="boton-crear" onClick={manejarCrear}>Crear nuevo</button>
                    <select
                        name="select-productos"
                        className="select-filtros"
                        value={filtro}
                        onChange={manejarFiltro}
                    >
                        <option value="disponible">Disponibles</option>
                        <option value="no disponible">No Disponibles</option>
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

                <div className="data">
                    <table>
                        <thead className="head-tabla-producto">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="body-tabla-producto">
                            {productosFiltrados.map((producto, index) => (
                                <tr key={index}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <div className={`estado ${producto.estado}`}>
                                            {producto.estado}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="acciones editar producto"
                                            onClick={() => manejarEditar(producto)}
                                        >
                                            <i className='bx bxs-edit-alt'></i>
                                        </button>
                                        <button
                                            className="acciones borrar producto"
                                            onClick={() => {} /* Maneja la eliminación */}
                                        >
                                            <i className='bx bx-x'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="barra-inferior">
                    <p>{productosFiltrados.length} Registros</p>
                    <div className="cont-num-pagina">
                        <i className='bx bxs-chevron-left'></i>
                        <p>1</p>
                        <i className='bx bxs-chevron-right'></i>
                    </div>
                </div>

                {/* ---------------------------- CREAR PRODUCTO -------------------------------- */}

                {modoCrear && (
                    <div className='cont-form-contenido crear-producto activo'>
                        <form className="form-contenido" onSubmit={manejarSubmit}>
                            <div className="cont-titulo-form">
                                <h3 className="titulo-form">Crear producto</h3>
                                <i className='bx bx-x icono-cerrar' onClick={manejarCerrarFormulario}></i>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Código</label>
                                <input className="imput" type="text" name="codigo" placeholder="Código" required />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Nombre</label>
                                <input className="imput" type="text" name="nombre" placeholder="Nombre" required />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Descripción</label>
                                <input className="imput" type="text" name="descripcion" placeholder="Descripción" required />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Precio</label>
                                <input className="imput" type="number" name="precio" placeholder="Precio" required />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Stock</label>
                                <input className="imput" type="number" name="stock" placeholder="Stock" required />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Estado</label>
                                <select className="imput" name="estado">
                                    <option value="disponible">Disponible</option>
                                    <option value="no disponible">No disponible</option>
                                </select>
                                <label className="label-error"></label>
                            </div>
                            <input className="boton-submit" type="submit" value="Crear" />
                        </form>
                    </div>
                )}

                {/* ---------------------------- EDITAR PRODUCTO -------------------------------- */}

                {modoEditar && (
                    <div className="cont-form-contenido edit-producto activo">
                        <form className="form-contenido" onSubmit={manejarSubmit}>
                            <div className="cont-titulo-form">
                                <h3 className="titulo-form">Editar producto</h3>
                                <i className='bx bx-x icono-cerrar' onClick={manejarCerrarFormulario}></i>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Código</label>
                                <input className="imput" type="text" name="codigo" placeholder="Código" value={productoActual?.codigo || ''} readOnly />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Nombre</label>
                                <input className="imput" type="text" name="nombre" placeholder="Nombre" value={productoActual?.nombre || ''} />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Descripción</label>
                                <input className="imput" type="text" name="descripcion" placeholder="Descripción" value={productoActual?.descripcion || ''} />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Precio</label>
                                <input className="imput" type="number" name="precio" placeholder="Precio" value={productoActual?.precio || ''} />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Stock</label>
                                <input className="imput" type="number" name="stock" placeholder="Stock" value={productoActual?.stock || ''} />
                                <label className="label-error"></label>
                            </div>
                            <div className="form-group">
                                <label className="label-input">Estado</label>
                                <select className="imput" name="estado" value={productoActual?.estado || ''}>
                                    <option value="disponible">Disponible</option>
                                    <option value="no disponible">No disponible</option>
                                </select>
                                <label className="label-error"></label>
                            </div>
                            <input className="boton-submit" type="submit" value="Guardar cambios" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
