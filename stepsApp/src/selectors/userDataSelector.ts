import { RootState } from "../store";


export const dailyStepsSelector = (state: RootState) => {
  return state.userData.dailySteps;
};

export const dailyActiveTimeSelector= (state: RootState) => {
    return state.userData.dailyActiveTime;
};
export const dailyDistanceSelector= (state: RootState) => {
    return state.userData.dailyDestenation;
};

export const dailyBalanceSelector= (state: RootState) => {
    return state.userData.dailyBalance;
};
  

