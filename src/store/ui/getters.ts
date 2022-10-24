import UiState from "@/models/state/UiState";

export const getAlert = ( state: UiState ) => {
  return state.alert;
}

export const getLoading = ( state: UiState ) => {
  return state.loading;
}

