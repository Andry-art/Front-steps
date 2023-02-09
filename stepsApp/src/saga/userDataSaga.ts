import {call, put, takeEvery} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
// import { logOutActionSuccess, userLogIn, userLogInFailed, userLogInSuccess } from '../action/registrationAction';
import { Api } from '../constants/api';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserDataAction, getUserDataFaild, getUserDataSucsses } from '../action/userDataAction';

export function* getUserData(
  action: ReturnType<typeof getUserDataAction>,
): Generator {
  try {
    // console.log(action.payload, 'payload')
    const response = (yield call(
      Api.authGet.bind(Api),
      `https://steps-app.cyclic.app/data/userhistory?userId=${action.payload}`,
    )) as Response | any;
// console.log(response)
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

export function* userDataSaga(): Generator {
  yield takeEvery('GET_USER_DATA', getUserData);
}