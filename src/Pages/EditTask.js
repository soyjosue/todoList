import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useForm } from '../hooks/useForm';

import putAxios from '../helpers/axios/putAxios'

const EditTask = () => {

    const [errors, setErrors] = useState({});

    const { task, taskId } = useParams();
    const history = useHistory();

    const [data, handleChange] = useForm({
        name: task
    });

    const handleSubmit = e => {

        e.preventDefault();

        const errors = {};

        if (data.name.trim() === '') {
            errors.name = 'El nombre es obligatorio';
        }

        setErrors(errors);

        if (Object.entries(errors).length !== 0) return;

        if (data.name === task) return history.goBack();

        putAxios(
            'tasks',
            {
                id: taskId,
                name: data.name,
                isCompleted: localStorage.getItem('--isCompleted--')
            },
            history
        )

        localStorage.removeItem('--isCompleted--');

    }

    return (
        <div className="new-tasks">

            <div className="edits">
                <p onClick={() => history.goBack()}>Volver <span>Atras</span></p>
            </div>


            <div className="list-name">
                <h1>Editar Tarea</h1>
                <p>Tarea: <span>{task}</span></p>
            </div>

            <hr />

            <form
                onSubmit={handleSubmit}
            >
                <label className="name-input" htmlFor="color">Nuevo Nombre:</label>
                {errors.name && (
                    <div
                        className="error-form"
                        style={{ width: '70%', margin: '5px auto' }}
                    >
                        {errors.name}
                    </div>
                )}
                <input
                    type="text"
                    className="inputs w-80"
                    name="name"
                    id="color"
                    value={data.name}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn-input-new"
                >Editar Tarea</button>
            </form>

        </div>
    );
}

export default EditTask;