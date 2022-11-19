import axios from 'axios';
import noteApi from '@/api/noteApi';
import NewNoteDto from '@/models/dto/NewNoteDto';

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
  const createNote = async(note: NewNoteDto) => {
    try {
      await noteApi.post('', note);
      return { ok: true, message: 'The note has been created &#129303' }
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
    getNotesByBookId,
    createNote
  }
}
