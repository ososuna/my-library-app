import axios from 'axios';

const bookApi = axios.create({
  baseURL: 'http://localhost:3001/api/v1/book',
});

export default bookApi;
