import validateToken from './axios/validateToken';

const goToLogin = async (history) => {
    if (await validateToken(history) === "Unauthorized") {
        history.push('/login');
    }
}

export default goToLogin;