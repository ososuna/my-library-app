import axios from 'axios';

const bookApi = axios.create({
  baseURL: process.env.VUE_APP_API_URI + '/book',
});

export default bookApi;
