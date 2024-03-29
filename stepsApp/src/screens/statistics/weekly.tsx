import AsyncStorage from '@react-native-community/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View, Text, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType, TabNavigation } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  weeklyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';
import { COLORS } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

interface Props {
  navigation: BottomTabNavigationProp<TabNavigation>;
}

const Weekly: FC<Props> = () => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const weeklyStatistics = useSelector(weeklyStatisticsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<IStatisticType>();

  const showInfo = (data: IStatisticType) => {
    setDailyData(data);
  };

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user_id');
    if (userData) {
      dispatch(getUserDataAction(userData));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!weeklyStatistics.data.find(it => it.steps > 0)) {
    return (
      <View style={styles.emptyChartContainer}>
        <Text>{t('info.no_steps_week')}</Text>
      </View>
    );
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <InfoModal
        date={dailyData?.fullDate}
        steps={dailyData?.steps}
        tokens={dailyData?.tokens}
        totalSteps={weeklyStatistics.totalSteps}
        totalTokens={weeklyStatistics.totalTokens}
      />
      <View style={styles.chart}>
        <VictoryChart
          width={screenWidth}
          theme={VictoryTheme.material}
          domainPadding={{ x: 15 }}
          animate={{
            duration: 600,
          }}
        >
          <VictoryAxis
            dependentAxis
            style={{
              grid: { stroke: 'none' },
            }}
          />
          <VictoryBar
            name="Bar"
            data={weeklyStatistics.data}
            x="date"
            y="steps"
            width={100}
            cornerRadius={8}
            style={{ data: { fill: '#40B4BB', width: 30, borderRadius: 30 } }}
            eventKey={'steps'}
            events={[
              {
                target: 'data',
                eventHandlers: { onPressIn: (event, data) => showInfo(data.datum) },
              },
            ]}
          />
          <VictoryAxis
            style={{
              grid: { stroke: 'none' },
            }}
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
    backgroundColor: COLORS.white,
  },
  chart: {
    alignItems: 'center',
  },
  emptyChartContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weekly;
