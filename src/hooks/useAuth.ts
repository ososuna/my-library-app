import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginRequest from '@/models/auth/LoginRequest';

export const useAuth = () => {

  const store = useStore();
  
  const checkAuth = async() => {
    const resp = await store.dispatch( 'auth/checkAuth' );
    return resp;
  }

  const loginUser = async( user: LoginRequest ) => {
    return await store.dispatch('auth/loginUser', user);
  }

  const logout = () => {
    store.commit( 'auth/logout' );
  }

  return {
    checkAuth,
    loginUser,
    logout,
    currentAuthState: computed(()=>store.getters['auth/currentState']),
    loggedUserId: computed(()=>store.getters['auth/loggedUserId'])
  }

}