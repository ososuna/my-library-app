import { Commit } from 'vuex';

export const setLoading = ( { commit }: { commit: Commit }, loading: boolean ) => {
  commit( 'setLoading', loading );
}

export const setAlertMessage = ( { commit }: { commit: Commit }, message = '',) => {
  commit( 'setAlertMessage', message);
}
