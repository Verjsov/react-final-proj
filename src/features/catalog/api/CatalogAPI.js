import { axiosInstance } from "../../../services/axios";

export function getList() {
    return axiosInstance.get('/products');
}

export function getProduct(id) {
    return axiosInstance.get(`/products/${id}`);
}

export function getCategories() {
    return axiosInstance.get('/category');
}

/*
export function create({ title = 'Test title', body = 'Test body' }) {
    return axiosInstance.post(`/products`, {
        title,
        body,
    });
}

export function update(id, { title = 'Test title', body = 'Test body' }) {
    return axiosInstance.put(`/products/${id}`, {
        title,
        body,
    });
}

export function remove(id) {
    return axiosInstance.delete(`/products/${id}`);
}
 */