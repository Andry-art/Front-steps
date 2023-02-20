import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Monthly from '../screens/statistics/monthly';
import WeeklyStatistic from '../screens/statistics/weekly';

const TopTab = createMaterialTopTabNavigator();

function StatisticsTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="week" component={WeeklyStatistic} />
      <TopTab.Screen name="month" component={Monthly} />
      <TopTab.Screen name="year" component={WeeklyStatistic} />
    </TopTab.Navigator>
  );
}

export default StatisticsTabs;