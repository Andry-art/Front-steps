import { createReducer } from '@reduxjs/toolkit';
import { getUserDataFaild, getUserDataSucsses, setDailyData } from '../action/userDataAction';
import { IDailyData, IUserData, IUserDataResponse } from '../constants/types';

const initialState: IUserData = {
  data: [] as Array<IUserDataResponse>,
  dailyData: { userId: '', date: '', steps: 0, tokens: 0, distance: 0 } as IDailyData,
  isLoading: false,
  error: '',
};

const userData = createReducer<IUserData>(initialState, builder => {
  builder
    .addCase('GET_USER_DATA', state => {
      (state.isLoading = true), (state.error = '');
      return state;
    })
    .addCase(getUserDataSucsses, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = '';
      return state;
    })
    .addCase(getUserDataFaild, (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
      return state;
    })
    .addCase(setDailyData, (state, action) => {
      state.dailyData = action.payload;
      return state;
    })
    .addCase('REFRESH_DAILY_STATE', state => {
      state.dailyData = { userId: '', date: '', steps: 0, tokens: 0, distance: 0 };
      return state;
    });
});

export default userData;
