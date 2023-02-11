import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import registration from './reducer/registration';
import { RootSaga } from './saga/rootSaga';
import userData from './reducer/userData';

const SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
  userData
//   discounts,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [SagaMiddleware],
});


SagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof rootReducer>;