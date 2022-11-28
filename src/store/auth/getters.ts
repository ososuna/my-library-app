import AuthState from '@/models/state/AuthState';

export const currentState = ( state: AuthState ) => {
  return state.status;
}

export const loggedUserId = ( state: AuthState ) => {
  return state.user?.id;
}

export const loggedUserProfileImageUrl = ( state: AuthState ) => {
  return state.user?.profileImageUrl;
}

export const loggedUser = ( state: AuthState ) => {
  return state.user;
}
