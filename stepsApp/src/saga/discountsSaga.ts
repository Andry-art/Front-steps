import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getAllDiscountsAction,
  getDiscountDataFaild,
  getDiscountDataSuccess,
} from '../action/discountAction';
import { Api } from '../constants/api';

export function* getAllDiscountsData(action: ReturnType<typeof getAllDiscountsAction>): Generator {
  try {
    const response = (yield call(
      Api.authGet.bind(Api),
      `https://steps-app.cyclic.app/discounts/getdiscounts`,
      action.payload,
    )) as Response | any;

    if (response) {
      yield put(getDiscountDataSuccess(response));
    }
    if (!response) {
      yield put(getDiscountDataFaild('Network isn`t working'));
    }
  } catch (error) {
    yield put(getDiscountDataFaild((error as Error).message));
  }
}

export function* discountsSaga(): Generator {
  yield takeEvery('GET_ALL_DISCOUNTS', getAllDiscountsData);
}
