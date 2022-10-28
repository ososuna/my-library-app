import axios from 'axios';
import userApi from '@/api/userApi';
import User from '@/models/User';

export const useUser = () => {

  const updateUser = async( user: User ) => {
    try {
      await userApi.put( `/${ user.id }`, user );
      return { ok: true, message: 'Your profile has been updated &#129303' };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message: message+' &#128531;'  };
      } else {
        return { ok: false, message: 'An error has occurred' };
      }
    }

  }

  return {
    updateUser
  }
}