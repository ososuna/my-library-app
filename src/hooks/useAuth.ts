import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginRequest from '@/models/auth/LoginRequest';
import SignUpRequest from '@/models/auth/SignUpRequest';

export const useAuth = () => {

  const store = useStore();
  
  const checkAuth = async() => {
    const resp = await store.dispatch( 'auth/checkAuth' );
    return resp;
  }

  const createUser = async( signUpRequest: SignUpRequest ) => {
    return await store.dispatch('auth/createUser', signUpRequest);
  }

  const loginUser = async( user: LoginRequest ) => {
    return await store.dispatch('auth/loginUser', user);
  }

  const logout = () => {
    store.commit( 'auth/logout' );
  }

  return {
    checkAuth,
    createUser,
    loginUser,
    logout,
    currentAuthState: computed(()=>store.getters['auth/currentState']),
    loggedUserId: computed(()=>store.getters['auth/loggedUserId']),
    loggedUser: computed(()=>store.getters['auth/loggedUser'])
  }

}