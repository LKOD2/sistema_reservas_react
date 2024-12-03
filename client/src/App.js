
import './styles/base.css';
import { BrowserRouter as Router, Route, Routes, useNavigate,Navigate } from "react-router-dom";

import React, { createContext, useEffect, useState } from 'react';

import Base from './components/Base';
import {Inicio} from './components/Inicio';
import { Usuario } from './components/Usuarios';
import { Huespedes } from './components/Huespedes';
import { Recepcion } from './components/Recepcion';
import { Salida } from './components/Salida';
import { Vender } from './components/Vender';
import { Habitaciones } from './components/Habitaciones';
import { Productos } from './components/Productos';
import { Gestion } from './components/Gestion';
import { Limpieza } from './components/Limpieza';
import { Hoteles } from './components/Hoteles';
import { Login } from './pages/Login';
import { ConfigGeneral } from './components/ConfigGeneral';



function App() {

  const [user, setUser] = useState(localStorage.getItem('user'));

  // Cargar el usuario desde localStorage en el primer renderizado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Si el usuario está guardado como objeto, usa JSON.parse
      setUser(JSON.parse(storedUser));
      console.log('user:', user);
    }
    
    
  }, []);

  const logout = async () => {

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        body: JSON.stringify({})
      });

      if (response.ok) {
        localStorage.removeItem('user'); 
        setUser(null); 
        alert('sesion cerrada')
      }
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública de login */}
       
        <Route path="/login" element={ <Login setUser={setUser} />} />

        {/* Ruta 404 para rutas no definidas */}
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />

        
        <Route path="/" element={user ? <Base logout={logout}/> : <Navigate to={'/login'} />}>

          {/* <Route path="system" element={<Base logout={logout}/> } /> */}
          <Route index element={<Navigate to="inicio" />} />
          <Route path="inicio" element={<Inicio />} />
          
          <Route path="disponibles" element={<Gestion modo="disponible" />} />
          <Route path="ocupadas" element={<Gestion modo="ocupada" />} />
          <Route path="limpieza" element={<Gestion modo="limpieza" />}>
            <Route path="liberar" element={<Limpieza />} />
          </Route>
          <Route path="todas" element={<Gestion modo="todo" />} />
          <Route path="recepcion" element={<Recepcion />} />
          <Route path="salida" element={<Salida />} />
          <Route path="tienda" element={<Gestion modo="venta" />} />
          <Route path="vender" element={<Vender />} />
          <Route path="productos" element={<Productos />} />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="huespedes" element={<Huespedes />} />
          <Route path="usuarios" element={<Usuario />} />
          <Route path="hoteles" element={<Hoteles />} />
          <Route path="general" element={<ConfigGeneral />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;