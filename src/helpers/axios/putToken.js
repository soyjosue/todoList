import axios from '../../config/axios';

const putToken = token => {

    axios.defaults.headers.common['x-auth-token'] = token;

}

export default putToken;