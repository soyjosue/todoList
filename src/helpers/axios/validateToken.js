import axios from '../../config/axios';

const validateToken = async (history) => {
    try{
      await axios.get('/login');

      const { pathname } = history.location;

      if(pathname === '/login' || pathname === '/iniciar-sesion' || pathname === '/nuevo-usuario') {
        return history.push('/');
      }

    } catch(err) {
      console.log(err.response.data.msg);
      return err.response.statusText;
    }
}

export default validateToken;