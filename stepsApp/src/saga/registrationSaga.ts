import {call, put, takeEvery} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import { logOutActionSuccess, userLogIn, userLogInFailed, userLogInSuccess } from '../action/registrationAction';
import { Api } from '../constants/api';
import AsyncStorage from '@react-native-community/async-storage';

export function* userSendLogIn(
  action: ReturnType<typeof userLogIn>,
): Generator {
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      `https://steps-app.cyclic.app/auth/login`,
      action.payload.email,
      action.payload.password,
    )) as Response | any;
    console.log(typeof response.user.id, 'login')

    if (response) {
      yield AsyncStorage.setItem('user_id', response.user.id)
      yield put(userLogInSuccess());
    }

    if (!response) {
      yield put(userLogInFailed('Network isn`t working'));
    }
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userSendSignUp(
  action: ReturnType<typeof userLogIn>,
): Generator {
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      'https://steps-app.cyclic.app/auth/signup',
      action.payload.email,
      action.payload.password,
    )) as Response | any;
    console.log(response, 'signUp')

    if (response) {
      yield AsyncStorage.setItem('user_id', response.user.id)
      yield put(userLogInSuccess());
    }
    if (!response) {
      yield put(userLogInFailed('Network isn`t working'));
    }
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* userLogOut(): Generator {
  try {
    const response = (yield call(
      Api.authPost.bind(Api),
      `https://steps-app.cyclic.app/auth/logout`,
    )) as Response;
    yield AsyncStorage.removeItem('user_id')
    yield EncryptedStorage.clear();
    yield put(logOutActionSuccess());
  } catch (error) {
    yield put(userLogInFailed((error as Error).message));
  }
}

export function* registration(): Generator {
  yield takeEvery('USER_LOG_IN', userSendLogIn);
  yield takeEvery('USER_SIGN_UP', userSendSignUp);
  yield takeEvery('LOGOUT', userLogOut);
}