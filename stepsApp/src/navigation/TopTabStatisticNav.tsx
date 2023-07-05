import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Monthly from '../screens/statistics/monthly';
import WeeklyStatistic from '../screens/statistics/weekly';
import Yearly from '../screens/statistics/yearly';
import { useTranslation } from 'react-i18next';

const TopTabStatistics = createMaterialTopTabNavigator();

function StatisticsTabs() {
  const { t } = useTranslation();

  return (
    <TopTabStatistics.Navigator>
      <TopTabStatistics.Screen
        name="week"
        component={WeeklyStatistic}
        options={{
          title: t('statistic.week'),
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabStatistics.Screen
        name="month"
        component={Monthly}
        options={{
          title: t('statistic.month'),
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabStatistics.Screen
        name="year"
        component={Yearly}
        options={{
          title: t('statistic.year'),
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
    </TopTabStatistics.Navigator>
  );
}

export default StatisticsTabs;
