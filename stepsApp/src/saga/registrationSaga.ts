import {call, put, takeEvery} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getUserDataAuth, logOutActionSuccess, userLogIn, userLogInFailed, userLogInSuccess } from '../action/registrationAction';
import Config from 'react-native-config';
import { Api } from '../constants/api';

export function* userSendLogIn(
  action: ReturnType<typeof userLogIn>,
): Generator {
    console.log(action)
  try {
    const response = (yield call(
      Api.auth.bind(Api),
      `https://steps-app.cyclic.app/auth/login`,
      action.payload.email,
      action.payload.password,
    )) as Response | any;
    console.log(response, 'login')

    if (response) {
      yield put(userLogInSuccess());
      yield put(getUserDataAuth(response?.data));
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
    )) as Response;
    console.log(response, 'signUp')

    if (response) {
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
    console.log(response, 'logout')
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