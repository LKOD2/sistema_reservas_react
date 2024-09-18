
import './styles/base.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate,Navigate } from "react-router-dom";

import Base from './components/Base';

import {Inicio} from './components/Inicio';
import { Usuario } from './components/Usuarios';
import { Huespedes } from './components/Huespedes';
import { Recepcion } from './components/Recepcion';
import { Salida } from './components/Salida';
import { Vender } from './components/Vender';
import { Habitaciones } from './components/Habitaciones';
import { Productos } from './components/Productos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Navigate to="inicio" />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path='recepcion' element={<Recepcion />} />
          <Route path='salida' element={<Salida />}/>
          <Route path='vender' element={<Vender />} />
          <Route path='productos' element={<Productos />} />
          <Route path='habitaciones' element={<Habitaciones />} />
          <Route path='huespedes' element={<Huespedes />} />
          <Route path='usuarios' element={<Usuario />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
