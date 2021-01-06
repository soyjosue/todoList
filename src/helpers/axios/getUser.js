import axios from '../../config/axios';

const getUser = async () => {

    try{

        const user = await axios.get('/login');
 
        return await user.data[0];

    } catch(err) {
        console.log(err.response.data.msg);
    }

}

export default getUser;