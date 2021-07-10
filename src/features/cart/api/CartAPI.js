import { axiosInstance } from "../../../services/axios";



export function getCart() {
    return axiosInstance.get('/cart');
}



