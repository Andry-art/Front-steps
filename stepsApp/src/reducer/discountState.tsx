import { createReducer } from '@reduxjs/toolkit';
import { IDiscountData } from '../constants/types';
import { getDiscountDataFaild, getDiscountDataSuccess } from '../action/discountAction';

interface IDiscountState {
  data: Array<IDiscountData>;
  isLoading: boolean;
  error: string;
}

const initialState: IDiscountState = {
  data: [],
  isLoading: false,
  error: '',
};

const discountState = createReducer<IDiscountState>(initialState, builder => {
  builder
    .addCase('GET_ALL_DISCOUNTS', state => {
      state.isLoading = true;
      state.error = '';
      return state;
    })
    .addCase(getDiscountDataSuccess, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = '';
      return state;
    })
    .addCase(getDiscountDataFaild, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    });
});

export default discountState;
