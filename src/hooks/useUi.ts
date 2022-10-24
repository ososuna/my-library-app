import { computed } from 'vue';
import { useStore } from 'vuex';

export const useUi = () => {

  const store = useStore();

  const setAlertMessage = ( message: string ) => {
    store.dispatch( 'ui/setAlertMessage', message );
  }

  const setLoading = ( show: boolean, message: string ) => {
    store.dispatch( 'ui/setLoading', { show, message } );
  }

  return {
    setAlertMessage,
    setLoading,
    alert: computed(() => store.getters['ui/getAlert']),
    loading: computed(() => store.getters['ui/getLoading']),
  }
}
