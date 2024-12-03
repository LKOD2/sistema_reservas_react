import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import '../styles/autenticacion/login.css';

export function Login({setUser}) {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const login = async (e) => {
        e.preventDefault();

        if (!usuario || !clave) {
            alert('Por favor, ingresa todos los campos');
            return;
        }

        const credentials = { usuario, clave };

        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user)
                console.log('user login:', data.user);
                
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="gral-login-trab">
            <div className="cont-img-login">
                <img src="./images/login-portada.jpg" alt="Imagen de login" />
            </div>

            <form className="form-login-trab" onSubmit={login}> 
                <h1 id="ini-sesion" className="titulo-login-trab">Login</h1>

                <div className="cont-entrada">
                    <label htmlFor="entrada-usuario" className="label">Usuario</label>
                    <input
                        className="entrada usuario"
                        type="text"
                        id="entrada-usuario"
                        name="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value.trim())}
                        required
                        placeholder="Usuario"
                    />
                    <label htmlFor="entrada-usuario" className="label error-usuario" id="error-usuario"></label>
                </div>

                <div className="cont-entrada">
                    <label htmlFor="entrada-clave" className="label">Contraseña</label>
                    <input
                        className="entrada clave"
                        type="password"
                        id="entrada-clave"
                        name="clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                        placeholder="Contraseña"
                    />
                    <label htmlFor="entrada-clave" className="label error-clave" id="error-clave"></label>
                </div>

                <input className="boton-login" type="submit" value="Login" />
            </form>
        </div>
    );
}
