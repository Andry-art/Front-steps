import AsyncStorage from '@react-native-community/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FC, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from 'victory-native';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { TabNavigation } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  userHistorySelector,
  weeklyStatisticsSelector,
} from '../../selectors/userDataSelector';

interface Props {
  navigation: BottomTabNavigationProp<TabNavigation>;
}

const Monthly: FC<Props> = ({ navigation }) => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const weeklyStatistics = useSelector(weeklyStatisticsSelector);
  const dispatch = useDispatch();
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<{ date: string, steps: number, fullDate: string, tokens: number}>();
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user_id');
    if (userData) {
      dispatch(getUserDataAction(userData));
    }
  };

//   useEffect(() => {
//       getUserData();
//   }, []);

  // console.log(historySteps);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {dailyData && (
        <View>
          <Text>{dailyData?.fullDate}</Text>
          <Text>{dailyData?.steps}</Text>
          <Text>{dailyData?.tokens}</Text>
        </View>
      )}
      <View style={styles.chart}>
        <VictoryChart
          width={screenWidth}
          theme={VictoryTheme.material}
          domainPadding={{ x: 15 }}
          animate={{
            duration: 600,
          }}
        >
          <VictoryBar
            data={weeklyStatistics}
            x="date"
            y="steps"
            width={100}
            cornerRadius={8}
            style={{ data: { fill: '#40B4BB', width: 30, borderRadius: 30 } }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'data',
                        mutation: props => {
                          console.log(props.datum);
                          setDailyData(props.datum);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    alignItems: 'center',
  },
});

export default Monthly;