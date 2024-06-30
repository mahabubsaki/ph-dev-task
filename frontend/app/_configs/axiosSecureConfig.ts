import axios from 'axios';
import { toast } from 'sonner';
import { deleteSession } from '../_libs/session';
import envConfigs from './envConfigs';

const axiosSecure = axios.create({
    baseURL: envConfigs.publicApiUrl,
    withCredentials: true,
});

axiosSecure.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    console.log(error, 'interceptor error');
    toast.error(error?.response?.data ? error?.response?.data?.message + " : " + error?.response?.data?.error : 'Something went wrong!');

    if (error?.response?.status === 401) {

        await deleteSession();
    }
    return Promise.reject(error);
});


export default axiosSecure;