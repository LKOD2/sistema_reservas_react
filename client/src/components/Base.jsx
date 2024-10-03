import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Gestion } from "./Gestion";

const Base = () => {
    const [menu, setMenu] = useState(false);
    const [submenuGestion, setSubmenuGestion] = useState(false);
    const [submenuConfig, setSubmenuConfig] = useState(false);
    const [submenuVentas, setSubmenuVentas] = useState(false);

    const [seleccionado, setSeleccionado] = useState(false)

    const controlMenu = () => {
        setMenu(!menu);
    };

    const darkMode = () => {
        document.body.classList.toggle('dark');
    };

    const toggleSubmenu = (section) => {
        if (section === 'gestion') {
            setSubmenuGestion(!submenuGestion);
            setSubmenuConfig(false);
            setSubmenuVentas(false);
        } else if (section === 'configuracion') {
            setSubmenuConfig(!submenuConfig);
            setSubmenuGestion(false);
            setSubmenuVentas(false);
        } else if (section === 'ventas') {
            setSubmenuVentas(!submenuVentas);
            setSubmenuGestion(false);
            setSubmenuConfig(false);
        }
    };

    const seleccion = (valor) =>{
        setSeleccionado(valor);
    }

    const [section, setSection] = useState(false);

    const nose = () =>{
        setSection(!section)
    }

    return (
        <div className="gral">

            {/* Header */}

            <div className="header">
                <div className="cont-busqueda">
                    <form action="#">
                        <input type="search" placeholder="Buscar" />
                    </form>
                </div>

                <div className="cont-user">
                    <label htmlFor="menu-user" className="nombre-user">usuario</label>
                    <select name="menu-user" className="menu-user">
                        <option value="perfil" disabled>usuario</option>
                        <option value="logout">Cerrar Sesión</option>
                    </select>
                    <div className="icono-user">
                        <i className='bx bxs-user'></i>
                    </div>
                </div>
            </div>

            {/* Menu */}

            <div className={`menu ${menu ? 'activo' : ''}`}>
                <div className="contenido-menu">
                    <div className="boton-menu">
                        <i className='bx bx-menu boton-menu-icono' onClick={controlMenu}></i>
                    </div>

                    <div className="logo">
                        <img className="logo-img" src="./images/LOGO-LOS ANDES.png" alt="logo" width="40px" height="40px" />
                        <h2 className="logo-text">Hotel</h2>
                    </div>

                    <div className="cont-lista">
                        <ul className="menu-lista">
                            {/* ----------------------------------------- */}

                            {/* <li className="menu-item">
                                <NavLink to='/inicio' className="item">
                                    <i className='bx bx-home-alt-2 item-icono'></i>
                                    <p className="item-text">prueba</p>
                                </NavLink>
                            </li>

                            <li className={`menu-item ${section ? 'activo' : ''}`} onClick={nose}>
                                <div className="item">
                                    <span className="material-symbols-outlined item-icono">check_in_out</span>
                                    <p className="item-text">Dashboard</p>
                                    <i className='bx bxs-chevron-right flecha-item'></i>
                                </div>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to={'/disponibles'} className={'item'}>
                                            <i className='bx bx-cart-add submenu-icono'></i>
                                            <p className="item-text">Nose 1</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/ocupadas'} className={'item'}>
                                            <i className='bx bx-cart-add submenu-icono'></i>
                                            <p className="item-text">Nose 2</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}

                            {/* ----------------------------------------- */}

                            <li className="menu-item">
                                <NavLink to='/inicio' className="item">
                                    <i className='bx bx-home-alt-2 item-icono'></i>
                                    <div className="item-text">
                                        <p>Inicio</p>
                                    </div>
                                </NavLink>
                            </li>

                            <li className={`menu-item ${submenuGestion ? 'activo' : ''}`}>
                                <div className="item" onClick={() => toggleSubmenu('gestion')}>
                                    <span className="material-symbols-outlined item-icono">check_in_out</span>
                                    <div className="item-text">
                                        <p>Gestion</p>
                                        <i className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to={'/disponibles'} className="item">
                                            <i className='bx bx-cart-add submenu-icono'></i>
                                            <p className="item-text">Recepción</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/ocupadas'} className="item">
                                            <i className='bx bx-cart-add submenu-icono'></i>
                                            <p className="item-text">Salida</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={`menu-item ${submenuVentas ? 'activo' : ''}`}>
                                <div className="item" onClick={() => toggleSubmenu('ventas')}>
                                    <i className='bx bx-store-alt item-icono'></i>
                                    <div className="item-text">
                                        <p>Tienda</p>
                                        <i className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to={'/vender'} className="item" onClick={ ()=> seleccion('vender')}>
                                            <i className='bx bx-cart-add submenu-icono'></i>
                                            <p className="item-text">Vender</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/productos'} className="item">
                                            <i className='bx bx-barcode submenu-icono'></i>
                                            <p className="item-text">Productos</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu-item">
                                <NavLink to={'/habitaciones'} className="item">
                                    <span className="material-symbols-outlined item-icono">bedroom_parent</span>
                                    <div className="item-text">
                                        <p>Habitaciones</p>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu-item">
                                <NavLink to={'/huespedes'} className="item">
                                    <span className="material-symbols-outlined item-icono">hotel</span>
                                    <div className="item-text">
                                        <p>Huespedes</p>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to='/usuarios' className="item">
                                    <i className='bx bx-group item-icono'></i>
                                    <div className="item-text">
                                        <p>Usuarios</p>
                                    </div>
                                </NavLink>
                            </li>

                            <li className={`menu-item ${submenuConfig ? 'activo' : ''}`}>
                                <div className="item" onClick={() => toggleSubmenu('configuracion')}>
                                    <i className='bx bx-cog item-icono'></i>
                                    <div className="item-text">
                                        <p>Configuración</p>
                                        <i className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>
                                <ul className="submenu">
                                    <li>
                                        <NavLink to={'/hoteles'} className="item">
                                            <i className='bx bx-group item-icono'></i>
                                            <p className="item-text">Hoteles</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu-item">
                                <div className="item">
                                    <div className="item-text">
                                        <i class='bx bx-moon item-icono'></i>
                                        <p>Modo Oscuro</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" onChange={darkMode} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="item-user">
                        <div className="item-user-icono">
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="menu-cont-label-user">
                            <label className="item-user-nombre">usuario</label>
                            <i className='bx bx-log-out bx-rotate-180 item-icono-exit'></i>
                        </div>
                    </div>
                </div>

                <div className="cont-flecha-menu-abrir">
                    <i className='bx bxs-chevron-right'></i>
                </div>
            </div>

            {/* Main content */}

            <div className="main">
                <Outlet />
            </div>

            {/* Disponibles */}

            <div className="dis">
                <div className="cont-flecha-dis-abrir">
                    <i className='bx bxs-chevron-left'></i>
                </div>

                <div className="contenido-dis">
                    <div className="titulo-dis">
                        <h4>Disponibles</h4>
                    </div>

                    <div className="cont-disponibles">
                        disponibles
                    </div>

                    <div className="cont-flecha-dis-cerrar">
                        <i className='bx bxs-chevron-right'></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Base;
