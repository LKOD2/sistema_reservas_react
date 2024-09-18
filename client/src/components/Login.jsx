import React from "react";


export function Login(){

    return(

        <div className="gral-login-trab">

            <div className="cont-img-login">
                <img src="{{ url_for('static', filename='/img/img-login-trab.jpg')}}" alt=""/>
            </div>
            
            <form  id="form-login-trab" className="form-login-trab" method="POST">
    
                <h1 id="ini-sesion" className="titulo-login-trab">Login</h1>
        
                <div className="cont-entrada">
                    <label htmlFor="entrada-usuario" className="label">Usuario</label>
                    <input className="entrada usuario" type="text" id="entrada-usuario" name="usuario" required placeholder="Usuario"/> 
                    <label htmlFor="entrada-usuario" className="label error-usuario" id="error-usuario"></label>
                </div>
        
                <div className="cont-entrada">
                    <label htmlFor="entrada-clave" className="label">Contraseña</label>
                    <input className="entrada clave" type="password" id="entrada-clave" name="clave" required placeholder="Contraseña"/>
                    <label htmlFor="entrada-clave" className="label error-clave" id="error-clave"></label>

                </div>
        
                <input className="boton-login" type="submit" value="Login"/>

            </form>    
        </div>


    )


}