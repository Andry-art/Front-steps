import { createAction } from "@reduxjs/toolkit";
import { IUserDataResponse } from "../constants/types";

export const getUserDataAction = createAction<string>('GET_USER_DATA');

export const getUserDataSucsses = createAction<Array<IUserDataResponse>>('getUserDataSucsses');

export const getUserDataFaild = createAction<string>('getUserDataFaild');