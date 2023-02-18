import { createDraftSafeSelector } from "@reduxjs/toolkit";
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

  export const dailyDataSelector = (state: RootState) => {
    return state.userData.dailyData;
  };

  export const weeklyStatistics = createDraftSafeSelector(userHistorySelector, state => {
    console.log(state)
  })