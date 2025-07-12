import axios from "axios";

export const baseUrl = 'http://localhost:5000/api/v1';

export const login = async (data) => {
    try {
        const result = await axios.post(`${baseUrl}/user/login`, data);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}

export const newUser = async (data) => {
    try {
        const result = await axios.post(`${baseUrl}/user/newUser`, data);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}

export const addUserViaGoogle = async (data) => {
    try {
        const result = await axios.post(`${baseUrl}/user/newViaGoogle`, data);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}

export const getUser = async (id) => {
    try {
        const result = await axios.get(`${baseUrl}/user/${id}`);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}

export const checkEmailExist = async (email) => {
    try {
        const result = await axios.post(`${baseUrl}/user/checkEmailExist`,email);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}
