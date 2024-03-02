import React, { useState } from 'react';

export const FormularioEditarTarea = ({ editarTarea, tarea }) => {
    const [valor, setValor] = useState(tarea.task); // Cambio aquí

    const handleSubmit = (e) => {
        e.preventDefault();
        editarTarea(valor, tarea.id);
    };

    return (
        <form onSubmit={handleSubmit} className="FormularioTarea">
            <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} className="entrada-tarea" placeholder='Actualizar tarea' />
            <button type="submit" className='btn-tarea'>Agregar tarea</button>
        </form>
    );
};
