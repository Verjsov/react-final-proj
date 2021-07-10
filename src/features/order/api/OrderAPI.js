import { axiosInstance } from "../../../services/axios";



export function create({ data }) {
    return axiosInstance.post(`/order`, data);
}



