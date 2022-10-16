import axios from 'axios';

const bookApi = axios.create({
  baseURL: 'https://mylibrary-bobbytables.herokuapp.com/api/v1/book',
});

export default bookApi;
