import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

import axios from '../config/axios';

const Tasks = (props) => {

    const { setReset, name: title, isCompleted, id } = props;

    const [checked, setChecked] = useState(isCompleted !== 0);

    const { id: list } = useParams();

    useEffect(() => {

        const editChecked = async() => {
            try {
                await axios.put('/tasks', {
                    id,
                    name: title,
                    isCompleted: checked
                });
            } catch (error) {
                console.log(error.response);
            }
        }

        editChecked();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const handleChange = e => {
        setChecked(e.target.checked);
    }

    const handleDelete = async() => {
        try {
            await axios.delete(`/tasks/${id}`);
            setReset(e => e + 1);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <li>
            <div className="task-info">
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <p>{title}</p>
            </div>
            <div className="task-opcion">
                <p 
                    className="delete"
                    onClick={handleDelete}
                >X</p>
                <Link 
                    onClick={(  ) => localStorage.setItem('--isCompleted--', checked)}
                    to={`/editar-tarea/${list}/${title}/${id}`}
                    className="edit"
                >Editar</Link>
            </div>
        </li>
    );
}

export default Tasks;