import axios from 'axios';
import noteApi from '@/api/noteApi';

export const useNote = () => { 
  const getNotesByBookId = async(bookId: number) => {
    try {
      const { data } = await noteApi.get(`/${bookId}`);
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
  return {
    getNotesByBookId
  }
}
