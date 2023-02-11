import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import registration from './reducer/registration';
import { RootSaga } from './saga/rootSaga';
import userData from './reducer/userData';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const SagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  registration,
  userData
//   discounts,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [SagaMiddleware],
});

export const persister = persistStore(store);

SagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof rootReducer>;