import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/limpieza.css'

export function Limpieza() {

  const location = useLocation();
  const data = location.state;
  const dialogRef = useRef(null);

  const navigate = useNavigate();

  useEffect( () => {
    dialogRef.current.showModal();
  },[])

  const closeDialog = () => {
    dialogRef.current.close();
    navigate('/limpieza')
  };

  const handleConfirm = () => {
    closeDialog(); // Cierra el dialog después de confirmar
  };

  return (
    <>
      {/* Dialog nativo de HTML */}
      <dialog ref={dialogRef} className='limpieza-modal'>
        <h2>Liberar Habitación</h2>
        <p>¿Estás seguro de que deseas liberar la habitación {data.habitacion.numero}?</p>
        <div>
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={closeDialog}>Cancelar</button>
        </div>
      </dialog>
    </>
  );
}
