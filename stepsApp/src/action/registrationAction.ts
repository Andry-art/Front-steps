import { createAction } from '@reduxjs/toolkit';

export const userLogIn = createAction<{ email: string; password: string }>('USER_LOG_IN');

export const userSignUp = createAction<{ email: string; password: string }>('USER_SIGN_UP');

export const userLogInSuccess = createAction<undefined>('userLogInSuccess');
export const userLogInFailed = createAction<string>('userLogInFailed');

export const logOutAction = createAction<undefined>('LOGOUT');

export const cleanError = createAction<undefined>('CLEAN_ERROR');

export const logOutActionSuccess = createAction<undefined>('LogOutSuccuss');
