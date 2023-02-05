import { RootState } from "../store";


export const IsLoadingUser = (state: RootState) => {
  return state.registration.isLoading;
};

export const userIsLogIn = (state: RootState) => {
  return state.registration.isLogIn;
};

export const logInError = (state: RootState) => {
  return state.registration.error;
};