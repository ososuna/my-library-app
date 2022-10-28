import { useStore } from 'vuex';
import axios from 'axios';
import userApi from '@/api/userApi';

export const useUser = () => {

  const store = useStore();

  const updateUser = async( id: number, formData: FormData ) => {
    try {
      const { data } = await userApi.put( `/${ id }`, formData, { headers: {'Content-Type': 'multipart/form-data'} });
      store.commit( 'auth/updateProfileImageUrl', data.profileImageUrl );
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