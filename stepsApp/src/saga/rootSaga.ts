import {all} from 'redux-saga/effects';
import { registration } from './registrationSaga';

export function* RootSaga(): Generator {
  return yield all([registration()]);
}