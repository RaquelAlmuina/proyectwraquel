import React, { useState, useEffect } from 'react';
import { FormularioTarea } from '../components/FormularioTarea.jsx';
import { v4 as uuidv4 } from 'uuid';
import { Tarea } from '../components/Tarea.jsx';
import { FormularioEditarTarea } from '../components/FormularioEditarTarea.jsx';
uuidv4();

export const TareasLocal = () => {
    const [tareas, setTareas] = useState([]);



    const agregarTarea = (tarea) => {
        const nuevasTareas = [...tareas, { id: uuidv4(), task: tarea, completed: false, isEditing: false }];
        setTareas(nuevasTareas);
        localStorage.setItem('tareas', JSON.stringify(nuevasTareas));
    };

    const toggleCompleto = (id) => {
        const nuevasTareas = tareas.map(tarea => tarea.id === id ? {...tarea, completed: !tarea.completed} : tarea);
        setTareas(nuevasTareas);
        localStorage.setItem('tareas', JSON.stringify(nuevasTareas));
    };

    const eliminarTarea = (id) => {
        const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
        setTareas(nuevasTareas);
        localStorage.setItem('tareas', JSON.stringify(nuevasTareas));
    };

    const editarTarea = (id) => {
        setTareas(tareas.map(tarea => tarea.id === id ? {...tarea, isEditing: !tarea.isEditing} : tarea));
    };

    const editarTareaExistente = (tarea, id) => {
        const nuevasTareas = tareas.map(t => t.id === id ? {...t, task: tarea, isEditing: !t.isEditing} : t);
        setTareas(nuevasTareas);
        localStorage.setItem('tareas', JSON.stringify(nuevasTareas));
    };

    return (
        <div className='TareasLocal'>
            <h1>¡Haz cosas!</h1>
            <FormularioTarea agregarTarea={agregarTarea} />
            {tareas.map((tarea, index) => (
                tarea.isEditing ? (
                    <FormularioEditarTarea editTarea={editarTareaExistente} tarea={tarea} key={index} />
                ) : (
                    <Tarea tarea={tarea} key={index} toggleCompleto={toggleCompleto} eliminarTarea={eliminarTarea} editarTarea={editarTarea} />
                )
            ))}
        </div>
    );
};
