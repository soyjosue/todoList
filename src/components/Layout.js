import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Custom Hooks
import { useToken } from '../hooks/useToken';
import { useApi } from '../hooks/useApi';

// Utils
import goToLogin from '../helpers/goToLogin';
import putToken from '../helpers/axios/putToken';
import getUser from '../helpers/axios/getUser';

import '../css/layout.css';

const Layout = props => {

  const [user, setUser] = useState({});

  const token = useToken();

  const history = useHistory();

  const [ lists, setInfo ] = useApi();
  
  useEffect(() => {

    setTimeout(() => {
      if(user) {
        setInfo('lists');
      }
    }, 300);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, history.location.pathname]);

  useEffect(() => {

    if(!token) {
      history.push('/iniciar-sesion');
    }

    if(token) {
      putToken(token);
      goToLogin(history);
    }

  }, [token, history]);

  useEffect(() => {

    if(token) {
      const asyncUser = async () => setUser( await getUser() )
      asyncUser();
    }

  }, [token]);

  const logout = () => {

    localStorage.removeItem('h$d$t$$$%o#@@#k@#$%e@##n');
    putToken('');

    history.push( '/iniciar-sesion' );

  }

  return (
    <div className="home">
      <div className="sidebar">
          <Link className="brand-sidebar" to="/">Todo <span>List</span></Link>

          <div className="create-div">
            <Link 
              to="/nuevo-listado"
              className="button-create-list"
            >Crear <span>Listado</span></Link>
          </div>
          
          <div className="list-div">
            <h2>Listas de Tareas</h2>
            <div className="lists">
              {lists.map(list => (
                <p 
                  key={list.id}
                  style={{color: list.color}}
                  onClick={() => history.push(`/lista/${list.name}/${list.id}`)}
                >{list.name}</p>
              ))}
            </div>
          </div>
      </div>

      <div className="content-center">
        <div className="top">
          <div className="welcome">
            <p>Bienvenido, <span> { user.name }</span></p>
          </div>
          <div 
            className="logout"
            onClick={logout}
          >
          <p>Cerrar <span>Sesión</span></p>
          </div>
        </div>

        <div className="pages">
          {props.children}
        </div>
      </div>


    </div>
  );
}

export default Layout;