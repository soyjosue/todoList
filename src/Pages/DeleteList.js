import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import '../css/pages/Delete.css';
import deleteAxios from '../helpers/axios/deleteAxios';

const DeleteList = () => {

    const { name, id } = useParams();
    const history = useHistory();

    const handlerClick = e => {

        switch (e.target.name) {
            case 'not':
                history.push(`/lista/${name}/${id}`);
                break;
            case 'yes':
                deleteAxios(`lists/${id}`, history);
                deleteAxios(`tasks/all/${id}`, history);
                break;
            default:
                break;
        }

    }

    return (
        <div>
            <div className="edits">
                <Link to={`/lista/${name}/${id}`}>Volver <span>Atras</span></Link>
            </div>

            <div className="list-name">
                <h1>Editor de Lista</h1>
                <p>Lista: <span>{name}</span></p>
            </div>

            <hr />

            <div>
                <p
                    className="mensaje"
                >Estas seguro de eliminar esta Lista?</p>
                <button
                    className="btn-input-new button-delete button"
                    name="yes"
                    onClick={handlerClick}
                >Si</button>
                <button
                    className="btn-input-new button"
                    name="not"
                    onClick={handlerClick}
                >No</button>
            </div>
        </div>
    );
}

export default DeleteList;