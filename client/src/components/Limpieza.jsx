import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/limpieza.css'

export function Limpieza() {

    const location = useLocation();
    const data = location.state; // Obtiene los datos de la ubicación
    const dialogRef = useRef(null); // Referencia para el diálogo
    const navigate = useNavigate();

    // Mostrar el modal al cargar el componente
    useEffect(() => {
        dialogRef.current.showModal();
    }, [])

    // Función para cerrar el diálogo
    const closeDialog = () => {
        dialogRef.current.close();
        navigate('/inicio'); // Redirige a la página de limpieza después de cerrar
    };

    const enviarDatos = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No estás autenticado. Inicia sesión primero.");
            return;
        }
    
        const formData = { id: data.habitacion.id, estado: 'disponible' }; // Solo el campo estado
    
        try {
            const response = await fetch(`http://localhost:8000/gestion/mantenimiento/`, {
                method: 'PATCH',  // Usamos PATCH para actualización parcial
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                alert(`Habitación liberada con éxito`);
                closeDialog(); // Cierra el diálogo
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };
    

    return (
        <>
            {/* Diálogo de confirmación */}
            <dialog ref={dialogRef} className='limpieza-modal'>
                <h2>Liberar Habitación</h2>
                <p>¿Estás seguro de que deseas liberar la habitación {data.habitacion.numero}?</p>
                <div>
                    <button onClick={enviarDatos}>Confirmar</button>
                    <button onClick={closeDialog}>Cancelar</button>
                </div>
            </dialog>
        </>
    );
}
