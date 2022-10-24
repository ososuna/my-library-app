import { Commit } from 'vuex';
import axios from 'axios';
import authApi from '@/api/authApi';
import LoginRequest from '../../models/auth/LoginRequest';
import qs from 'qs';

export const loginUser = async( { commit }: { commit: Commit }, user: LoginRequest ) => {
  try {
    const { data } = await authApi.post( '/login', qs.stringify(user) );
    const { user: userData, access_token: accessToken, refresh_token: refreshToken } = data;
    commit( 'loginUser', { user: userData, accessToken, refreshToken } );
    return { ok: true, message: 'login successful' };
  } catch ( error ) {
    if ( axios.isAxiosError( error ) ) {
      const { message } = error.response?.data as any || 'Ha ocurrido un error';
      return { ok: false, message: message+' &#128531;'  };
    } else {
      return { ok: false, message: 'Ha ocurrido un error' };
    }
  }
}

export const checkAuth = async ({ commit }: { commit: Commit }) => {
  
  const accessToken   = localStorage.getItem('access_token');
  const refreshToken  = localStorage.getItem('refresh_token');

  if ( !accessToken || !refreshToken ) {
    commit('logout');
    return { ok: false, message: 'No existe un token' };
  }

  try {
    const { data } = await authApi.get( '/token/refresh', {
      headers: {
        Authorization: `Bearer ${ refreshToken }`
      }
    });
    const { user, access_token: accessToken } = data;
    commit( 'loginUser', { user, accessToken, refreshToken } );
    return { ok: true };
  } catch ( error ) {
    commit('logout');
    if ( axios.isAxiosError( error ) ) {
      const { message } = error.response?.data as any || 'Ha ocurrido un error';
      return { ok: false, message };
    } else {
      return { ok: false, message: 'Ha ocurrido un error' };
    }
  }  
}
