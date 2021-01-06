import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const useToken = () => {

    const history = useHistory();

    const [ token, setToken ] = useState(localStorage.getItem('h$d$t$$$%o#@@#k@#$%e@##n'));

    useEffect(() => {

        setToken(localStorage.getItem('h$d$t$$$%o#@@#k@#$%e@##n'));

    }, [history.location.pathname]);

    return token;

}