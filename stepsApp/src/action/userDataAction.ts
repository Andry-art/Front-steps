import { createAction } from "@reduxjs/toolkit";
import { IDailyData, IUserDataResponse } from "../constants/types";

export const getUserDataAction = createAction<string>('GET_USER_DATA');

export const getUserDataSucsses = createAction<Array<IUserDataResponse>>('getUserDataSucsses');

export const getUserDataFaild = createAction<string>('getUserDataFaild');

export const sendUserData = createAction<IDailyData>('POST_USER_DATA');

export const setDailyData = createAction<IDailyData>('SET_DAILY_DATA');

export const refreshDailyState = createAction<undefined>('REFRESH_DAILY_STATE');

