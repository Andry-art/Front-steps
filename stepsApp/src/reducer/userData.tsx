import { createReducer } from '@reduxjs/toolkit';
import { getUserDataFaild, getUserDataSucsses } from '../action/userDataAction';
import { IUserData, IUserDataResponse } from '../constants/types';

const initialState: IUserData = {
  data: [] as Array<IUserDataResponse>,
  isLoading: false,
  error: '',
};

const userData = createReducer<IUserData>(initialState, builder => {
  builder
    .addCase('GET_USER_DATA', (state) => {
      (state.isLoading = true), (state.error = '');
      return state;
    })
    .addCase(getUserDataSucsses, (state, action) => {
      state.data = action.payload;
      (state.isLoading = false), (state.error = '');
      return state;
    })
    .addCase(getUserDataFaild, (state, action) => {

      (state.isLoading = false), (state.error = action.payload);
      return state;
    });
});

export default userData;
