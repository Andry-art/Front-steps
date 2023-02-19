import AsyncStorage from '@react-native-community/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FC, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
    Bar,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from 'victory-native';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType, TabNavigation } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  userHistorySelector,
  weeklyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';

interface Props {
  navigation: BottomTabNavigationProp<TabNavigation>;
}

const Weekly: FC<Props> = ({ navigation }) => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const weeklyStatistics = useSelector(weeklyStatisticsSelector);
  const dispatch = useDispatch();
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<IStatisticType>();
  const animatedValue = useSharedValue(0);

  const modalOpacity = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  const showInfo = (data:IStatisticType) => {
    setDailyData(data)
    animatedValue.value = withTiming(1)
  }

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user_id');
    if (userData) {
      dispatch(getUserDataAction(userData));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // console.log(historySteps);
  if (isLoading) {
    return <LoadingScreen />;
  }
    function alert(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <SafeAreaView style={styles.container}>
      <InfoModal date={dailyData?.fullDate} steps={dailyData?.steps} tokens={dailyData?.tokens} animatedStyle={modalOpacity}/>

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
                          showInfo(props.datum);
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Weekly;
