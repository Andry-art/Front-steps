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
      return { date: day, steps: itemDate.steps, fullDate, tokens: itemDate.tokens };
    } else {
      const day = moment(item, 'DD.MM.YYYY').format('DD');
      return { steps: 0, date: day, tokens: 0 };
    }
  });
  const totalSteps = arr
    .map(it => it.steps)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  const totalTokens = arr
    .map(it => it.tokens)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  return { data: arr.reverse(), totalSteps, totalTokens };
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
      return { date: day, steps: itemDate.steps, fullDate, tokens: itemDate.tokens };
    } else {
      const day = moment(item, 'DD.MM.YYYY').format('DD');
      return { steps: 0, date: day, tokens: 0 };
    }
  });
  const totalSteps = arr
    .map(it => it.steps)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  const totalTokens = arr
    .map(it => it.tokens)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  return { data: arr, totalSteps, totalTokens };
});

export const yearlyStatisticsSelector = createDraftSafeSelector(userHistorySelector, state => {
  const allMonthsData = [];

  for (let i = 0; i < 12; i++) {
    const monthName = moment().month(i).format('MMM');
    const fullMonthName = moment().month(i).format('MMMM');
    const month = moment().month(i).format('MM.YYYY');
    const arrayOfMonthData = state.filter(item => {
      const dateArr = item.date.split('.');
      const day = moment(dateArr, 'DD.MM.YYYY').format('MM.YYYY');
      return day === month;
    });
    if (arrayOfMonthData.length > 0) {
      const sumOfSteps = arrayOfMonthData
        .map(it => it.steps)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      const sumOfTokens = arrayOfMonthData
        .map(it => it.tokens)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      const mothData = {
        month: monthName,
        steps: sumOfSteps,
        tokens: sumOfTokens,
        fullDate: fullMonthName,
      };

      allMonthsData.push(mothData);
    } else {
      allMonthsData.push({ month: monthName, steps: 0, tokens: 0, fullDate: fullMonthName });
    }
  }

  const totalSteps = allMonthsData
    .map(it => it.steps)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  const totalTokens = allMonthsData
    .map(it => it.tokens)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  return { data: allMonthsData, totalSteps, totalTokens };
});

export const transactionsSelector = createDraftSafeSelector(userHistorySelector, state => {
  const withTokens = state.filter(it => it.tokens > 0);
  return withTokens.reverse();
});
