
import './styles/base.css';
import { BrowserRouter as Router, Route, Routes, useNavigate,Navigate } from "react-router-dom";

import React, { createContext, useState } from 'react';

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

function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
        <Route path="/" element={<Base />}>
          <Route index element={<Navigate to="inicio" />} />
          <Route path="inicio" element={<Inicio />} />

          <Route path='disponibles' element={<Gestion dato={'disponibles'} />}/>
          <Route path='ocupadas' element={<Gestion dato={'ocupadas'} />}/>
          <Route path='limpieza' element={<Gestion dato={'limpieza'} />}>
            <Route path='liberar' element={<Limpieza />} />
          </Route>

          <Route path='todas' element={<Gestion dato={'todas'} />}/>
          
          

          <Route path='recepcion' element={<Recepcion />} />
          <Route path='salida' element={<Salida />} />

          <Route path='vender' element={<Vender />} />
          <Route path='productos' element={<Productos />} />
          <Route path='habitaciones' element={<Habitaciones />} />
          <Route path='huespedes' element={<Huespedes />} />
          <Route path='usuarios' element={<Usuario />} />
          <Route path='hoteles' element={<Hoteles/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
