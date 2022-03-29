import axios from "axios";


const API = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("accessToken")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    }
    return req;
});

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const registerUser = async (formData) => {
    try {
        const { data } = await API.post("/accounts/api/register/", formData, config);
        console.log(data);
        localStorage.setItem("accessToken", data.token.access);
        localStorage.setItem("refreshToken", data.token.refresh);
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export const signIn = async (formData, navigate) => {
    try {
        const { data } = await API.post(`/accounts/api/token/`, formData, config);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate('/timer');
        return;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
};

export const generateOrder = async () => {
    try {
        const { data } = await API.get("/payment/");
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export const makePayment = async (formData) => {
    try {
        const { data } = await API.post("/payment/", formData, config);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}