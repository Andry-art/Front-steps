import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Monthly from '../screens/statistics/monthly';
import WeeklyStatistic from '../screens/statistics/weekly';
import Yearly from '../screens/statistics/yearly';

const TopTabStatistics = createMaterialTopTabNavigator();

function StatisticsTabs() {
  return (
    <TopTabStatistics.Navigator>
      <TopTabStatistics.Screen
        name="week"
        component={WeeklyStatistic}
        options={{
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabStatistics.Screen
        name="month"
        component={Monthly}
        options={{
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabStatistics.Screen
        name="year"
        component={Yearly}
        options={{
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
    </TopTabStatistics.Navigator>
  );
}

export default StatisticsTabs;
