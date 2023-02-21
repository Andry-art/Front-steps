import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Monthly from '../screens/statistics/monthly';
import WeeklyStatistic from '../screens/statistics/weekly';
import Yearly from '../screens/statistics/yearly';

const TopTabStatistics = createMaterialTopTabNavigator();

function StatisticsTabs() {
  return (
    <TopTabStatistics.Navigator>
      <TopTabStatistics.Screen name="week" component={WeeklyStatistic} />
      <TopTabStatistics.Screen name="month" component={Monthly} />
      <TopTabStatistics.Screen name="year" component={Yearly} />
    </TopTabStatistics.Navigator>
  );
}

export default StatisticsTabs;