import axios from 'axios';

const authApi = axios.create({
  baseURL: process.env.VUE_APP_API_URI + '/auth',
});

export default authApi;
