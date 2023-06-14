import { createAction } from '@reduxjs/toolkit';
import { IDiscountData } from '../constants/types';

export const getAllDiscountsAction = createAction<undefined>('GET_ALL_DISCOUNTS');

export const getDiscountDataSuccess = createAction<Array<IDiscountData>>('DISCOUNT_DATA_SUCCESS');

export const getDiscountDataFaild = createAction<string>('DISCOUNT_DATA_FAILD');
