import { createDraftSafeSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

export const userHistorySelector = (state: RootState) => {
  return state.userData.data;
};

export const userHistoryLoadingSelector = (state: RootState) => {
  return state.userData.isLoading;
};

export const userHistoryErrorSelector = (state: RootState) => {
  return state.userData.error;
};

export const dailyDataSelector = (state: RootState) => {
  return state.userData.dailyData;
};

export const weeklyStatisticsSelector = createDraftSafeSelector(userHistorySelector, state => {
  const momentDay = moment(new Date());
  const days = Array.from({ length: 7 }, (_, i) =>
    momentDay.clone().subtract(i, 'days').format('DD.MM.YYYY'),
  );
  const arr = days.map(item => {
    const itemDate = state.find(it => it.date === item);
    if (itemDate) {
      const dateArr = itemDate.date.split('.');
      const day = moment(dateArr, 'DD.MM.YYYY').format('DD');
      const fullDate = moment(dateArr, 'DD.MM.YYYY').format('DD MMMM YYYY');
      return { date: day, steps: itemDate.steps, fullDate, tokens: itemDate.tokens};
    } else {
      const day = moment(item, 'DD.MM.YYYY').format('DD');
      return { steps: 0, date: day };
    }
  });
  return arr.reverse();
});

export const monthlyStatisticsSelector = createDraftSafeSelector(userHistorySelector, state => {
  const daysInMonth = moment(new Date()).daysInMonth();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(moment(`${i}.MM.YYYY`, "DD.MM.YYYY'").format('DD.MM.YYYY'));
  }
  const arr = days.map(item => {
    const itemDate = state.find(it => it.date === item);
    if (itemDate) {
      const dateArr = itemDate.date.split('.');
      const day = moment(dateArr, 'DD.MM.YYYY').format('DD');
      const fullDate = moment(dateArr, 'DD.MM.YYYY').format('DD MMMM YYYY');
      return { date: day, steps: itemDate.steps, fullDate, tokens: itemDate.tokens};
    } else {
      const day = moment(item, 'DD.MM.YYYY').format('DD');
      return { steps: 0, date: day };
    }
  });
  return arr;
});
