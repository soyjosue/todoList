import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Login from './Pages/Login';
import Home from './Pages/Home';
import NewList from './Pages/NewList';
import Register from './Pages/Register';
import List from './Pages/List';
import NewTask from './Pages/NewTask';
import EditList from './Pages/EditList';
import DeleteList from './Pages/DeleteList';
import EditTask from './Pages/EditTask';

const App = () => {

  return (
    
    <Router>

        <Switch>

          <Route path="/nuevo-usuario" component={Register} />

          <Route path={["/iniciar-sesion", "/login"]} component={Login} />

          <Layout>
            <Route path="/nuevo-listado" component={NewList} />

            <Route exact path="/" component={Home} />

            <Route path="/lista/:name/:id" component={List} />

            <Route path="/nueva-tarea/:name/:id" component={NewTask} />

            <Route path="/editar-lista/:name/:id" component={EditList} />

            <Route path="/eliminar-lista/:name/:id" component={DeleteList} />

            <Route path="/editar-tarea/:listId/:task/:taskId" component={EditTask} />
          </Layout>

        </Switch>

    </Router>

  );
}


export default App;