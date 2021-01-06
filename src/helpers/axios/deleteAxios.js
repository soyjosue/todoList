import axios from '../../config/axios';

const deleteAxios = async(path, history) => {

    try {

        await axios.delete(path);

        history.push('/');
        
    } catch (error) {
        console.log(error);
    }

}

export default deleteAxios;