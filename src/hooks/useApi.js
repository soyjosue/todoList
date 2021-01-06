import { useEffect, useState } from 'react';
import axios from '../config/axios';


export const useApi = (type='', data='') => {

    const [ state, setState ] = useState({
        type,
        data
    });
    const [ result, setResult ] = useState([]);

    const apiCall = async (path) => {

        try{

            const result = await axios.get(path);

            setResult(await result.data[state.type]);
        } catch(err) {
            console.log(err.response);
        }
    
    
    }

    const getTasks = async() => {

        await apiCall(`/tasks/${state.data.list}`);

    }

    const getLists = async() => {

        await apiCall('/lists');

    }

    useEffect(() => {
        switch(state.type) {
            case 'lists':
                getLists()
                break;
            case 'tasks':
                getTasks()
                break;
            default:
                break
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const setInfo = (type='', data='') => {
        setState({
            type,
            data
        })
    }

    return [ result, setInfo ];
}