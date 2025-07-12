import axios from "axios";
import { baseUrl } from "../config/config";


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


export const getLatestProducts = async () => {
    try {
        const result = await axios.get(`${baseUrl}/product/latest`);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}


export const getAllProducts = async () => {
    try {
        const result = await axios.get(`${baseUrl}/product/all`);
        return result;
    } catch (error) {
        console.log('Error while addUser : ', error.message);
    }
}

