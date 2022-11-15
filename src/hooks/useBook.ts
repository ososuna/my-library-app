import axios from 'axios';
import bookApi from '@/api/bookApi';
import BookDto from '../models/dto/BookDto';

export const useBook = () => {
  const getBooks = async() => {
    try {
      const { data } = await bookApi.get('/all');
      return { ok: true, data };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has occurred' };
      }
    }
  }
  const getBooksByUser = async( userId: number ) => {
    try {
      const { data } = await bookApi.get(`/user/${userId}`);
      return { ok: true, data };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has occurred' };
      }
    }
  }
  const createBook = async( book: BookDto ) => {
    try {
      await bookApi.post('', book);
      return { ok: true, message: 'The book has been created &#129303' }
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has ocurred' };
      }
    }
  }
  const updateBook = async( id: number, book: BookDto ) => {
    try {
      await bookApi.put(`/${id}`, book);
      return { ok: true, message: 'The book has been updated &#129303' }
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has ocurred' };
      }
    }
  }
  const deleteBook = async( id: number ) => {
    try {
      await bookApi.delete(`/${id}`);
      return { ok: true, message: 'The book has been deleted' }
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has ocurred' };
      }
    }
  }
  return {
    getBooksByUser,
    getBooks,
    createBook,
    updateBook,
    deleteBook
  }
}
