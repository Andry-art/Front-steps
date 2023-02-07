import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserDataAuth,
} from '../action/registrationAction';
import { IUserData } from '../constants/types';



const initialState: IUserData = {
  id: '',
  balance: 0,
  dailySteps: 0,
  dailyActiveTime: 0,
  dailyDestenation: 0,
  dailyBalance: 0,
  stepsHistory: [],
  isLoading: false,
  error: '',
};

const userData = createReducer<IUserData>(initialState, builder => {
  builder.addCase(getUserDataAuth, (state, action) => {
    console.log(action.payload.id)
    state.id = action.payload.id;
    state.balance = action.payload.balance;
    state.dailySteps = action.payload.dailySteps;
    state.dailyActiveTime = action.payload.dailyActiveTime;
    state.dailyDestenation = action.payload.dailyDestenation;
    state.dailyBalance = action.payload.dailyBalance;
    state.stepsHistory = action.payload.stepsHistory;
    return state;
  });
});

export default userData;
