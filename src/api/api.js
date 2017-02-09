import axios from 'axios';

let base = '';

export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.post(`${base}/user/remove`, {params: params});
};

export const editUser = params => {
    return axios.post(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.post(`${base}/user/add`, {params: params});
};