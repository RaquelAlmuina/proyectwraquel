import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Tarea = ({ tarea, toggleCompleto, eliminarTarea, editarTarea }) => {
  const tareaCompletaClass = tarea.completed ? 'completed' : 'incompleted';
  const [mostrarIcono, setMostrarIcono] = useState(false);

  const handleToggleCompleto = () => {
    toggleCompleto(tarea.id);
    setMostrarIcono(true);
  };

  return (
    <div className="Tarea">
      
      {!tarea.completed && (
        <button className="completar-btn" onClick={handleToggleCompleto}>
          Hecho
        </button>
      )}

      {mostrarIcono && tarea.completed && (
        <div>
          <FontAwesomeIcon
            className="check-icon completed"
            icon={faCheckSquare}
            onClick={handleToggleCompleto}
          />
        </div>
      )}

      <p className={tareaCompletaClass} onClick={() => editarTarea(tarea.id)}>
        {tarea.task}
      </p>

      <div>
        <FontAwesomeIcon className="edit-icon" icon={faEdit} onClick={() => editarTarea(tarea.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => eliminarTarea(tarea.id)} />
      </div>
    </div>
  );
};
