import axios from '../utils/axios';

const register = async(data) => {
    try {
        const response = await axios.post('/api/register', data);
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
}

export default register;