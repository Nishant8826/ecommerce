import axios from "axios";

const baseUrl = 'http://localhost:3000/api/v1';

export const addUser = async (data) => {
    try {
        await axios.post(`${baseUrl}/user/new`, data);
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}
