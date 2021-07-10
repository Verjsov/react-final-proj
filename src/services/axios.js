import axios from "axios";
import { appConf } from "../config";
export const axiosInstance = axios.create({
    baseURL: appConf.api.baseURL,
});

export default axiosInstance;