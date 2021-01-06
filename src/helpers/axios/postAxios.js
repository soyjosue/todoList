import axios from '../../config/axios';

const postAxios = async(path, data, history, push='/') => {

    try {
        const { data: datas } = await axios.post(path, data);

        if(push === 'lista') {
            await history.push(`/lista/${data.name}/${datas.id}`);
        } else {
            await history.push(push);
        }


    } catch (error) {
        console.log(error.response);
    }

}

export default postAxios;