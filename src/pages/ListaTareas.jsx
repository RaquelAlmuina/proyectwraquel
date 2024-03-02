import React, { useState, useEffect } from 'react';
import { FormularioTarea } from '../components/FormularioTarea.jsx';
import { Tarea } from '../components/Tarea.jsx';
import { FormularioEditarTarea } from '../components/FormularioEditarTarea.jsx';
import { TheCatAPI } from "@thatapicompany/thecatapi"; // Importa TheCatAPI
import { v4 as uuidv4 } from 'uuid';

export const ListaTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [theCatImages, setTheCatImages] = useState([]);

    //La conexion a la API ealiza utilizando la biblioteca @thatapicompany/thecatapi, que proporciona acceso a la API de imágenes de gatos
    //Al principio del archivo, importas la biblioteca TheCatAPI
    //Se creo una instancia de  la API dentro del componente funcional ListaTareas, se crea una instancia de TheCatAPI con una clave de API específica
    //La conexion está creada, sin embargo aun no la puedo hacer funcionar, creo es por los metodos que estoy intrntado utilizar
    //Quiero que se muestren imagenes de gatos aleatoriamente
    useEffect(() => {
        const theCatAPI = new TheCatAPI("live_BIRxK2AtH5s2YF9DLCefqXGuhkTPMhz8HTro0lwn8kvkmzJ3l6CpNxVCH6GC9ZKB");
        theCatAPI.images
            .searchImages({ limit: 5 }) 
            .then(images => {
                const formatImages = images.map((image) => ({
                    id: uuidv4(),
                    task: image.url,
                    completed: false,
                    isEditing: false
                }));
                setTheCatImages(formatImages);
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
