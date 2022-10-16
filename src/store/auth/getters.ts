import AuthState from '@/models/state/AuthState';

export const currentState = ( state: AuthState ) => {
  return state.status;
}

export const loggedUserId = ( state: AuthState ) => {
  return state.user?.id;
}
