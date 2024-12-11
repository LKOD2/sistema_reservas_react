import React from "react"

import { NavLink } from "react-router-dom";

export function Item ({titulo, ruta, icono}) {
    return(
        <li className="menu-item">
            <NavLink to={ruta} className="item">
                <div className="selector"></div>
                {icono}
                <p className="item-text">{titulo}</p>
            </NavLink>
        </li>
    )
}