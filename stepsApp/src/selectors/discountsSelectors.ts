import { RootState } from '../store';

export const getAllDiscountSelector = (state: RootState) => {
  return state.discountState.data;
};

export const isLoadingDiscountSelector = (state: RootState) => {
  return state.discountState.isLoading;
};

export const isErrorDiscountSelector = (state: RootState) => {
  return state.userData.error;
};
