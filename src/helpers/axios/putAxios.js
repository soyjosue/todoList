import axios from '../../config/axios';

const putAxios = async(path, data, history) => {

    try{

        await axios.put(path, data);

        history.goBack();

    }catch(err) {
        if(err.response.data.msg === "El usuario no puede modificar esta lista.") {
            alert("Esta lista no existe.");
        }
    }

}

export default putAxios;