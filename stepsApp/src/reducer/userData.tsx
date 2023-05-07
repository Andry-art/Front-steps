import { createReducer } from '@reduxjs/toolkit';
import { getUserDataFaild, getUserDataSucsses, setDailyData } from '../action/userDataAction';
import { IDailyData, IUserData, IUserDataResponse } from '../constants/types';

const initialState: IUserData = {
  data: [
    {
      __v: 0,
      _id: '63e6757e61a23735c23124da',
      date: '10.02.2023',
      steps: 3496,
      tokens: 34,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63e679b987fc5f70428120a5',
      date: '11.02.2023',
      steps: 6434,
      tokens: 62,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63e8d676bb601766bd68d235',
      date: '12.02.2023',
      steps: 256,
      tokens: 0,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63ea6cbade99630501c1dfd1',
      date: '14.02.2023',
      steps: 196,
      tokens: 0,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63ecd388a5267917eb5af62d',
      date: '15.02.2023',
      steps: 3702,
      tokens: 35,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63eeeca8b9f1d8a98b66e329',
      date: '16.02.2023',
      steps: 2786,
      tokens: 27,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63eefd3dbe62f11a82f0244c',
      date: '17.02.2023',
      steps: 7847,
      tokens: 77,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f068649d2c16fc78d2adda',
      date: '18.02.2023',
      steps: 1944,
      tokens: 19,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f20525ded49e77ee1b6d63',
      date: '19.02.2023',
      steps: 3889,
      tokens: 38,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f446c73d4c6859ea61fad1',
      date: '21.02.2023',
      steps: 5529,
      tokens: 54,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f621eca72158e94fe65c26',
      date: '22.02.2023',
      steps: 3485,
      tokens: 34,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f6f16ed73e75474b856488',
      date: '23.02.2023',
      steps: 2412,
      tokens: 24,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f8b515193ba31c49c89431',
      date: '24.02.2023',
      steps: 4692,
      tokens: 46,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63f98c45e53bb64f335b3ab8',
      date: '25.02.2023',
      steps: 2216,
      tokens: 22,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63faffb8e75512eda7a8e816',
      date: '26.02.2023',
      steps: 2998,
      tokens: 29,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63fc8f32aad19c7982f6da12',
      date: '27.02.2023',
      steps: 3801,
      tokens: 37,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63fded530de84e0fb445ab39',
      date: '28.02.2023',
      steps: 1057,
      tokens: 9,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '63ff24820149930f5ff0e557',
      date: '01.03.2023',
      steps: 809,
      tokens: 8,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '640876b932338db89a070368',
      date: '08.03.2023',
      steps: 337,
      tokens: 3,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '640c642ff42141ade62ce804',
      date: '11.03.2023',
      steps: 812,
      tokens: 8,
      userId: '63e129e0eef10d9cd150305d',
    },
    {
      __v: 0,
      _id: '640dcd4b39a86c0fe097ec5a',
      date: '12.03.2023',
      steps: 4394,
      tokens: 43,
      userId: '63e129e0eef10d9cd150305d',
    },
  ] as Array<IUserDataResponse>,
  dailyData: { userId: '', date: '', steps: 0, tokens: 0, distance: 0 } as IDailyData,
  isLoading: false,
  error: '',
};

const userData = createReducer<IUserData>(initialState, builder => {
  builder
    .addCase('GET_USER_DATA', state => {
      (state.isLoading = true), (state.error = '');
      return state;
    })
    .addCase(getUserDataSucsses, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = '';
      return state;
    })
    .addCase(getUserDataFaild, (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
      return state;
    })
    .addCase(setDailyData, (state, action) => {
      state.dailyData = action.payload;
      return state;
    })
    .addCase('REFRESH_DAILY_STATE', state => {
      state.dailyData = { userId: '', date: '', steps: 0, tokens: 0, distance: 0 };
      return state;
    });
});

export default userData;
