import {React, useState, useEffect} from "react";

import { Link, Outlet } from "react-router-dom";


const Base = ()=>{
    const [menu, setMenu] = useState('')
    const [submenuGestion, setSubmenuGestion] = useState('');
    const [submenuConfig, setSubmenuConfig] = useState('');
    const [submenuVentas, setSubmenuVentas] = useState('');

    const controlMenu = ()=>{
        setMenu(!menu)
    }

    const darkMode = ()=>{
        const body = document.querySelector('body');
        body.classList.toggle('dark')
    }

    const toggleSubmenu = (nose) => {
        if(nose == 'gestion'){
            setSubmenuGestion(!submenuGestion);
            setSubmenuConfig(false)
            setSubmenuVentas(false)
        }else if(nose == 'configuracion'){
            setSubmenuConfig(!submenuConfig)
            setSubmenuGestion(false)
            setSubmenuVentas(false)
        }else if(nose == 'ventas'){
            setSubmenuVentas(!submenuVentas)
            setSubmenuGestion(false)
            setSubmenuConfig(false)
        }   
    };

    return(
        
        <div className="gral">

            {/* <!-- ---------------------- header -------------------------- --> */}

            <div className="header">
                <div className="cont-busqueda">
                    <form action="#">
                        <input type="search" placeholder="Buscar"/>
                    </form>
                </div>

                <div className="cont-user">
                
                    <label htmlFor="menu-user" className="nombre-user">usuario</label>
                    <select name="menu-user" id="menu-user" className="menu-user">
                        <option value="perfil" selected disabled id="btn-perfil">usuario</option>
                        <option value="logout" id="btn-logout">Cerrar Sesión</option>
                    </select>

                    <div className="icono-user"><i className='bx bxs-user'></i></div>                 
                    
                </div>

            </div>

            {/* <!-- ---------------------- menu -------------------------- --> */}

            <div className={`menu ${menu ? 'activo' : ''}`} id="menu">

                <div className="contenido-menu">

                    <div className="menu-cont-boton">
                        <i id="menu-boton" className='bx bx-menu menu-boton' onClick={controlMenu}></i>
                    </div>
                
                    <div className="cont-logo">
                        <img className="logo" src="./images/LOGO-LOS ANDES.png" alt="" width="40px" height="40px"/>
                        <h2 id="nombre-hotel" className="nombre-hotel">Los Andes</h2>
                    </div>

                    <div className="cont-lista">
                        <ul>
                            <li className="menu-item" id="menu-item-inicio">
                                <Link to='/inicio' className="menu-cont-item">
                                    <i className='bx bx-home-alt-2 menu-icono'></i>
                                    <div className="item" id="item-inicio">
                                        <p>Inicio</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`menu-item ${submenuGestion ? 'activo' : ''} desplegable`} id="menu-item-gestion">
                                <div className="menu-cont-item" onClick={() => toggleSubmenu('gestion')}>
                                    <span class="material-symbols-outlined menu-icono">check_in_out</span>
                                    <div className="item" id="item-gestion">
                                        <p>Gestion</p>
                                        <i id="flecha-item-reservas" className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>
                                <ul className="submenu submenu-reservas" id="submenu-reservas">
                                    <li className="submenu-item" id="item-recepcion">
                                        <Link to={'/recepcion'}><p>Recepción</p></Link>
                                    </li>
                                    <li className="submenu-item" id="item-salida">
                                        <Link to={'/salida'}><p>Salida</p></Link>
                                    </li>
                                </ul>
                            </li>
                            
                            <li className={`menu-item ${submenuVentas ? 'activo' : ''} desplegable`} id="menu-item-ventas">
                                <div className="menu-cont-item" onClick={() => toggleSubmenu('ventas')}>
                                    <i class='bx bx-store-alt menu-icono'></i>
                                    <div className="item" id="item-ventas">
                                        <p>Tienda</p>
                                        <i id="flecha-item-ventas" className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>
                                <ul className="submenu ">
                                    <li >
                                        <Link to={'/vender'} className="submenu-item">
                                            <i class='bx bx-cart-add submenu-icono'></i>
                                            <p className="submenu-text">Vender</p>
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to={'/productos'} className="submenu-item">
                                            <i class='bx bx-barcode submenu-icono'></i>
                                            <p className="submenu-text">Productos</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item" id="menu-item-reservas" style={{display: 'none'}}>
                                <div className="item" id="item-reservas">
                                    <i className='bx bx-hard-hat'></i>
                                    <p>Reservas</p>
                                </div>
                            </li>
                            <li className="menu-item" id="menu-item-habitaciones">
                                <Link to={'/habitaciones'} className="menu-cont-item">
                                    <span className="material-symbols-outlined menu-icono">bedroom_parent</span>
                                    <div className="item" id="item-habitaciones">
                                        <p>Habitaciones</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="menu-item" id="menu-item-huespedes">
                                <Link to={'/huespedes'} className="menu-cont-item">
                                    <span className="material-symbols-outlined menu-icono">hotel</span>
                                    <div className="item" id="item-huespedes">
                                        <p>Huespedes</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="menu-item" id="menu-item-usuarios">
                                <Link to='/usuarios' className="menu-cont-item">
                                    <i className='bx bx-group menu-icono'></i>
                                    <div className="item" id="item-usuarios">
                                        <p>Usuarios</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`menu-item ${submenuConfig ? 'activo': ''} desplegable`} id="menu-item-config">
                                <div className="menu-cont-item" onClick={()=> toggleSubmenu('configuracion')}>
                                    <i className='bx bx-cog menu-icono'></i>
                                    <div className="item" id="item-config">
                                        <p>Configuración</p>
                                        <i id="flecha-item-config" className='bx bxs-chevron-right flecha-item'></i>
                                    </div>
                                </div>

                                <ul className="submenu submenu-ventas" id="submenu-ventas">
                                    <li className="submenu-item" id="item-hoteles">
                                        <Link><p>Hoteles</p></Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item" id="menu-item-usuarios">
                                <div className="menu-cont-item">
                                    <span className="material-symbols-outlined menu-icono"> dark_mode</span>
                                    <div className="item">
                                        <p>Modo Oscuro</p>
                                        <label className="switch" >
                                            <input type="checkbox" onChange={darkMode}/>
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div className="menu-cont-user">
                        <div className="menu-icono-user"><i className='bx bxs-user'></i></div>                 
                        <div className="menu-cont-label-user">
                            <label htmlFor="menu-user" className="menu-nombre-user">usuario</label>
                            <i className='bx bx-log-out bx-rotate-180 menu-icono-exit' ></i>
                        </div>

                    </div>
                </div>

                <div className="cont-flecha-menu-abrir" id="boton-menu-abrir">
                    <i className='bx bxs-chevron-right'></i>
                </div>
            </div>

            {/* <!-- --------------------------- main ----------------------------- --> */}

            <div className="main" id="main">

            {/* <!-- aca va mi contenido --> */}
                <Outlet/>
            </div>

            {/* <!-- ----------------------- disponibles -------------------------- --> */}

            <div className="dis">

                <div className="cont-flecha-dis-abrir" id="boton-dis-abrir">
                    <i className='bx bxs-chevron-left'></i>
                </div>

                <div className="contenido-dis">
                    <div className="titulo-dis"><h4>Disponibles</h4></div>

                    <div className="cont-disponibles" id="cont-disponibles">
                        disponibles
                    </div>
                    
                    <div className="cont-flecha-dis-cerrar">
                        <i id="boton-dis-cerrar" className='bx bxs-chevron-right'></i>
                    </div> 

                </div> 
            </div>  
            
        </div>

    )
}

export default Base;