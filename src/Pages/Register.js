import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

// Custom Hooks
import { useToken } from '../hooks/useToken';
import { useForm } from '../hooks/useForm';

// Utils
import putToken from '../helpers/axios/putToken';
import validateEmail from '../helpers/validateEmail';
import validateToken from '../helpers/axios/validateToken';
import loginAxios from '../helpers/axios/loginAxios';

// CSS
import '../css/pages/Login.css';

const Register = () => {

  const token = useToken();
  const [showAlert, setShowAlert] = useState({
    isShow: false,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [dataForm, handlerChange] = useForm({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const history = useHistory();

  useEffect(() => {

    if(token) {
      
      putToken(token);
      validateToken(history);

    }

  }, [token, history]);

  const { name, email, password, confirm } = dataForm;

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if(name.trim() === '') {
      errors.name = 'El nombre es obligatorio.';
    }
    if(email.trim() === '') {
      errors.email = 'El correo es obligatorio.';
    } else if(!validateEmail(email)) {
      errors.email = 'Coloque un correo valido.';
    }
    if(password.trim() === '') {
      errors.password = 'La contraseña es obligatoria.';
    } else if(password.trim() <= 6) {
      errors.password = 'La contraseña debe ser mayor a 6 caracteres.';
    }
    if(confirm.trim() !== password.trim()) {
      errors.confirm = 'Las Contraseñas deben coincidir.';
    }

    setErrors(errors);

    if(Object.entries(errors).length !== 0) return;

    loginAxios({
      path: '/register',
      data: { name, email, password },
      setShowAlert,
      history
    });

  }

  return (
    <div className="body">

      {showAlert.isShow && (
        <Alert 
          variant="filled" 
          severity="warning"
          onClick={() => { setShowAlert({ isShow: false, message: '' }) }}
        >{showAlert.message}</Alert>
      )}

      <div className="register">
        <h1>Crear Cuenta</h1>

        <form
          onSubmit={onSubmit}
        >

          <div>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              {errors.name && (
                <div className="error-form">
                  {errors.name}
                </div>
              )}
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Tu Nombre"
                value={name}
                onChange={handlerChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo:</label>
              {errors.email && (
                <div className="error-form">
                  {errors.email}
                </div>
              )}
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Tu Correo"
                value={email}
                onChange={handlerChange}
              />
            </div>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              {errors.password && (
                <div className="error-form">
                  {errors.password}
                </div>
              )}
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Tu Contraseña"
                value={password}
                onChange={handlerChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirmar Contraseña: </label>
              {errors.confirm && (
                <div className="error-form">
                  {errors.confirm}
                </div>
              )}
              <input
                name="confirm"
                type="password"
                id="confirm"
                placeholder="Tu Contraseña"
                value={confirm}
                onChange={handlerChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="button-submit"
          > Registrarme </button>

        </form>

        <Link to="/iniciar-sesion" className="suggestion">Si ya tienes una cuenta, dar click aquí.</Link>
      </div>
    </div>
  );
}

export default Register;