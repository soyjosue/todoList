import React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import { useForm } from '../hooks/useForm';

import postAxios from '../helpers/axios/postAxios';

import '../css/pages/NewTaks.css';

const NewTaks = () => {

    const history = useHistory();

    const { name: title, id } = useParams();
    const [data, handlerChange] = useForm({
        name: ''
    });

    const { name } = data;

    const onSubmit = e => {

        e.preventDefault();

        const errors = {};

        if (name.trim() === '') {
            errors.name = 'El nombre es obligatorio.'
        };

        if (Object.entries(errors).length !== 0) return;

        postAxios(
            'tasks',
            {
                name,
                isCompleted: false,
                list: id
            },
            history,
            `/lista/${title}/${id}`
        )

    }

    return (

        <div className="new-tasks">

            <div className="edits">
                <Link to={`/lista/${title}/${id}`}>Volver <span>Atras</span></Link>
            </div>


            <div className="list-name">
                <h1>Crear Tarea</h1>
                <p>Lista: <span>{title}</span></p>
            </div>

            <hr />

            <form
                onSubmit={onSubmit}
            >
                <label className="name-input" htmlFor="color">Nombre de la Tarea:</label>
                <input
                    type="text"
                    className="inputs w-80"
                    name="name"
                    id="color"
                    placeholder={`Lista: ${title}`}
                    value={name}
                    onChange={handlerChange}
                />

                <button
                    type="submit"
                    className="btn-input-new"
                >Agregar Tarea</button>
            </form>

        </div>
    );
}

export default NewTaks;