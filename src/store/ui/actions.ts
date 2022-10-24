import { Commit } from 'vuex';

export const setLoading = ( { commit }: { commit: Commit }, { show = true, message = '' } ) => {
  commit( 'setLoading', { show, message } );
}

export const setAlertMessage = ( { commit }: { commit: Commit }, message = '',) => {
  commit( 'setAlertMessage', message);
}
