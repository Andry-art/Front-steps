import { call, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../constants/api';
import {
  getUserDataAction,
  getUserDataFaild,
  getUserDataSucsses,
  sendUserData,
} from '../action/userDataAction';
import AsyncStorage from '@react-native-community/async-storage';

export function* getUserData(action: ReturnType<typeof getUserDataAction>): Generator {
  try {
    const response = (yield call(
      Api.authGet.bind(Api),
      `https://steps-app.cyclic.app/data/userhistory?userId=${action.payload}`,
    )) as Response | any;

    if (response) {
      yield put(getUserDataSucsses(response));
    }

    if (!response) {
      yield put(getUserDataFaild('Network isn`t working'));
    }
  } catch (error) {
    yield put(getUserDataFaild((error as Error).message));
  }
}

export function* postUserData(action: ReturnType<typeof sendUserData>): Generator {
  try {
    console.log(action.payload, 'payloadDaily');
    const response = (yield call(
      Api.authPost.bind(Api),
      `https://steps-app.cyclic.app/data/newstepitem`,
      action.payload,
    )) as Response | any;

    if (!response) {
      yield put(getUserDataFaild('Network isn`t working'));
    }
    if (response) {
      yield AsyncStorage.removeItem('last_steps');
    }
  } catch (error) {
    // yield put(getUserDataFaild((error as Error).message));
  }
}

export function* userDataSaga(): Generator {
  yield takeEvery('GET_USER_DATA', getUserData);
  yield takeEvery('POST_USER_DATA', postUserData);
}
