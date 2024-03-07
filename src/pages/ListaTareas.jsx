import React, { useState, useEffect } from 'react';
import { FormularioTarea } from '../components/FormularioTarea.jsx';
import { Tarea } from '../components/Tarea.jsx';
import { FormularioEditarTarea } from '../components/FormularioEditarTarea.jsx';
import { TheCatAPI } from "@thatapicompany/thecatapi"; 
import { v4 as uuidv4 } from 'uuid';

export const ListaTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [theCatImage, setTheCatImage] = useState(null);

    useEffect(() => {
        const theCatAPI = new TheCatAPI("live_BIRxK2AtH5s2YF9DLCefqXGuhkTPMhz8HTro0lwn8kvkmzJ3l6CpNxVCH6GC9ZKB");
        theCatAPI.images
            .searchImages({ limit: 1 }) 
            .then(images => {
                if (images.length > 0) {
                    const image = images[0];
                    const formatImage = {
                        id: uuidv4(),
                        task: image.url,
                        completed: false,
                        isEditing: false
                    };
                    setTheCatImage(formatImage);
                }
            })
            .catch(error => console.error("Error fetching cat images:", error));
    }, []);

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
        <div className='ListaTareas'>
            <h1>¡Comencemos!</h1>
            <FormularioTarea agregarTarea={agregarTarea} />
            <div className="gato-images" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                {theCatImage && <img src={theCatImage.task} alt="Cat" style={{ width: '200px', height: '200px' }} />}
            </div>
            {tareas.map((tarea, index) => (
                tarea.isEditing ? (
                    <FormularioEditarTarea editarTarea={editarTareaExistente} tarea={tarea} key={index} />
                ) : (
                    <Tarea tarea={tarea} key={index} toggleCompleto={toggleCompleto} eliminarTarea={eliminarTarea} editarTarea={editarTarea} />
                )
            ))}
        </div>
    );
};
