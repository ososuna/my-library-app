import UiState from "@/models/state/UiState";

export const getLoading = ( state: UiState ) => {
  return state.loading.show;
}

export const getAlert = ( state: UiState ) => {
  return state.alert;
}
