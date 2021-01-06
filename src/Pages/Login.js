import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

// Custom Hooks
import { useForm } from '../hooks/useForm';
import { useToken } from '../hooks/useToken';

// Utils
import validateToken from '../helpers/axios/validateToken';
import validateEmail from '../helpers/validateEmail';
import putToken from '../helpers/axios/putToken';
import loginAxios from '../helpers/axios/loginAxios';

// CSS
import '../css/pages/Login.css';

const Login = () => {

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState({
    isShow: false,
    message: ''
  });
  const isMounted = useRef(false);

  const token = useToken();

  const [dataForm, handlerChange] = useForm({
    email: '',
    password: ''
  })

  const history = useHistory();

  useEffect(() => {

    isMounted.current = true;

    const token = localStorage.getItem('h$d$t$$$%o#@@#k@#$%e@##n');

    if (token) {
      if(isMounted.current) {
        setShowAlert({
          isShow: true,
          message: 'Sesión Caducada'
        });
        localStorage.removeItem('h$d$t$$$%o#@@#k@#$%e@##n');
      }
    }

    return () => {isMounted.current = false};

  }, []);

  useEffect(() => {

    if(!showAlert.isShow) {
      setTimeout(() => {

        if(isMounted.current) {
          setShowAlert({
            isShow: false,
            message: ''
          });
        }
  
      },7000);
    }

    return () => {isMounted.current = false};

  }, [showAlert]);

  useEffect(() => {

    if (token) {

      if(isMounted.current) {
        putToken(token);
        validateToken(history);
      }

    }

    return () => {isMounted.current = false};

  }, [token, history]);

  const { email, password } = dataForm;

  const onSubmit = e => {

    e.preventDefault();

    const errors = {};

    if (email.trim() === '') {
      errors.email = 'El correo es obligatorio.';
    } else if (!validateEmail(email)) {
      setShowAlert({
        isShow: true,
        message: 'Correo o contraseña incorrecta'
      });

    }
    if (password.trim() === '') {
      errors.password = 'La contraseña es obligatoria.';
    }

    setErrors(errors);

    if (Object.entries(errors).length !== 0) return;

    loginAxios({
      path: '/login',
      data: { email, password },
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
      <div className="login">
        <h1>Iniciar Sesión</h1>
        <form
          onSubmit={onSubmit}
        >

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

          <button
            type="submit"
            className="button-submit"
          > Ingresar </button>

        </form>

        <Link to="/nuevo-usuario" className="suggestion">Si no tienes una cuenta, dar click aquí.</Link>
      </div>
    </div>
  );
}

export default Login;