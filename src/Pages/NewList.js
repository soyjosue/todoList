import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import ListsColor from '../components/ListsColor';

// Custom Hooks
import { useForm } from '../hooks/useForm';

// Utils
import handlerPutClass from '../helpers/handlerPutClass';
import getColor from '../helpers/getColor';
import postAxios from '../helpers/axios/postAxios';

import '../css/pages/NewList.css';

const NewList = () => {

  const [activeBefore, setActiveBefore] = useState('');
  const [errors, setErrors] = useState({});
  const [data, handlerChange] = useForm({ name: '', color: '' });

  const history = useHistory();

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

    const newList = {

      name: data.name,
      color: data.color

    }

    const errors = {};

    if (newList.name.trim() === '') {
      errors.name = 'El nombre es obligatorio.';
    }
    if (newList.color === '#000000') {
      errors.color = 'Debes seleccionar un color.';
    }

    setErrors(errors);

    if (Object.entries(errors).length !== 0) return;


    postAxios(
      'lists',
      newList,
      history,
      'lista'
    );

  }

  return (
    <div className="new-list">

      <h1>Nuevo Listado</h1>

      <form
        onSubmit={onSubmit}
      >
        <label className="name-input" htmlFor="color">Nombre:</label>
        {errors.name && (
          <div 
            className="error-form"
            style={{width: '70%', margin: '5px auto'}}
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
          onChange={handlerChange}
        />
        <label className="name-input">Colores:</label>
        {errors.color && (
          <div 
            className="error-form"
            style={{width: '70%', margin: '5px auto'}}
          >
            {errors.color}
          </div>
        )}
        <ListsColor
          handlerPutClass={handlerPutClass}
          activeBefore={activeBefore}
          setActiveBefore={setActiveBefore}
        />

        <button
          type="submit"
          className="btn-input-new"
        >Crear Listado</button>
      </form>

    </div>
  );
}

export default NewList;