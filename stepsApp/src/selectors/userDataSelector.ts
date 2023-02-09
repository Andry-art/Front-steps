import { RootState } from "../store";


export const userHistorySelector = (state: RootState) => {
  return state.userData.data;
};

export const userHistoryLoadingSelector = (state: RootState) => {
    return state.userData.isLoading;
  };
  

  export const userHistoryErrorSelector = (state: RootState) => {
    return state.userData.error;
  };