import React, { useState } from 'react'

export const FormularioTarea = ({ agregarTarea }) => {
    const [valor, setValor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valor) {
            agregarTarea(valor);
            setValor('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="FormularioTarea">
            <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} className="entrada-tarea" placeholder='¿Cuál es la tarea hoy?' />
            <button type="submit" className='btn-tarea'>Agregar Tarea</button>
        </form>
    )
}
