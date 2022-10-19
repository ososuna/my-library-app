import { useStore } from 'vuex';
import LoginRequest from '../models/auth/LoginRequest';

export const useAuth = () => {

  const store = useStore();

  const loginUser = async( user: LoginRequest ) => {
    return await store.dispatch('auth/loginUser', user);
  }

  return {
    loginUser
  }
}