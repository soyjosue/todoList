import axios from '../../config/axios';

const loginAxios = async ({ path, data, setShowAlert, history }) => {

    try{

        const res = await axios.post(path, data);

        const { token } = res.data;

        localStorage.setItem('h$d$t$$$%o#@@#k@#$%e@##n', token);

        history.push('/');

    } catch(err) {

        setShowAlert({
            isShow: true,
            message: err.response.data.msg
          });

    }

}

export default loginAxios;