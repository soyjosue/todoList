import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import { useApi } from '../hooks/useApi';

import Tasks from '../components/Tasks';

import '../css/pages/List.css';

import image from '../img/img1.png';

const List = () => {

    const [reset, setReset] = useState(0);

    const { name, id } = useParams();
    const history = useHistory();

    const [tasks, setInfo] = useApi();

    useEffect(() => {

        setTimeout(() => {
            setInfo('tasks', {
                list: id
            });
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname, reset]);

    return (
        <div className="lists-div">

            <div className="edits">
                <Link to={`/nueva-tarea/${name}/${id}`}>Agregar <span>Tarea</span></Link>
                <Link to={`/editar-lista/${name}/${id}`}>Editar <span>Lista</span></Link>
                <Link to={`/eliminar-lista/${name}/${id}`}>Borrar <span>Lista</span></Link>
            </div>

            <div className="header">
                <h1> {name}</h1>
            </div>

            <ul className="div-task">
                {
                    tasks.length !== 0 ?
                        tasks.map(task => (
                            <Tasks
                                key={task.id}
                                setReset={setReset}
                                {...task}
                            />
                        )
                        )
                        :
                        <>
                            <hr />

                            <div className="no-found">
                                <p>Ups... No hay Tareas</p>
                                <img src={image} alt="No se encontro tareas" />
                            </div>
                        </>
                }
            </ul>
        </div>
    );

}

export default List;