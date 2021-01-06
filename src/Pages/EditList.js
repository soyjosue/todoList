import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import ListsColor from '../components/ListsColor';

// Utils
import handlerPutClass from '../helpers/handlerPutClass';
import putAxios from '../helpers/axios/putAxios';

import '../css/pages/NewList.css';
import { useForm } from '../hooks/useForm';
import getColor from '../helpers/getColor';

const EditList = () => {

  const [activeBefore, setActiveBefore] = useState('');
  const [errors, setErrors] = useState({});

  const { name, id } = useParams();
  const history = useHistory();

  const [data, handlerChange] = useForm({
    name,
    color: ''
  });

  useEffect(() => {

    handlerChange({
      target: {
        name: 'color',
        value: getColor(activeBefore)
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBefore]);

  const onSubmit = e => {

    e.preventDefault();

    const errors = {};

    const { name, color } = data;

    if (name.trim() === '') {
      errors.name = "El nombre es obligatorio.";
    }
    if (color === '#000000') {
      errors.color = "El color es obligatorio.";
    }

    setErrors(errors);

    if (Object.entries(errors).length !== 0) return;

    putAxios(
      'lists',
      {
        id,
        name: data.name,
        color:data.color
      },
      history
    )

  };

  return (
    <div className="new-list">
      <div className="edits">
        <Link to={`/lista/${name}/${id}`}>Volver <span>Atras</span></Link>
      </div>

      <div className="list-name">
        <h1>Editor de Lista</h1>
        <p>Lista: <span>{name}</span></p>
      </div>

      <hr />

      <form
        onSubmit={onSubmit}
      >
        <label className="name-input" htmlFor="name">Nuevo Nombre:</label>
        {
          errors.name && (
            <div
              className="error-form"
              style={{ width: '70%', margin: '5px auto' }}
            >
              {errors.name}
            </div>
          )
        }
        <input
          type="text"
          className="inputs w-80"
          name="name"
          id="name"
          value={data.name}
          onChange={handlerChange}
        />
        <label className="name-input">Colores:</label>
        {
          errors.color && (
            <div
              className="error-form"
              style={{ width: '70%', margin: '5px auto' }}
            >
              {errors.color}
            </div>
          )
        }
        <ListsColor
          handlerPutClass={handlerPutClass}
          activeBefore={activeBefore}
          setActiveBefore={setActiveBefore}
        />

        <button
          type="submit"
          className="btn-input-new"
        >Editar Listado</button>
      </form>

    </div>
  );
}

export default EditList;