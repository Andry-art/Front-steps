import {all} from 'redux-saga/effects';
import { registration } from './registrationSaga';
import { userDataSaga } from './userDataSaga';

export function* RootSaga(): Generator {
  return yield all([registration(), userDataSaga()]);
}