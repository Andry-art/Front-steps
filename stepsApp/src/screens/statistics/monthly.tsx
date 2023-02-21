import { FC, useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  monthlyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';

const Monthly: FC = () => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const monthlyStatistics = useSelector(monthlyStatisticsSelector);
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<IStatisticType>();

  const showInfo = useCallback((data: IStatisticType) => {
    setDailyData(data);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <InfoModal
        date={dailyData?.fullDate}
        steps={dailyData?.steps}
        tokens={dailyData?.tokens}
        totalSteps={monthlyStatistics.totalSteps}
        totalTokens={monthlyStatistics.totalTokens}
      />
      <View style={styles.chart}>
        <VictoryChart
          width={screenWidth}
          theme={VictoryTheme.material}
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
            data={monthlyStatistics.data}
            x="date"
            y="steps"
            width={100}
            cornerRadius={5}
            style={{ data: { fill: '#40B4BB', width: 10, borderRadius: 10 } }}
            events={[
              {
                target: 'data',
                eventHandlers: { onPressIn: (event, data) => showInfo(data.datum) },
              },
            ]}
          />
          <VictoryAxis
            tickCount={6}
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
    backgroundColor: 'white',
  },
  chart: {
    alignItems: 'center',
  },
});

export default Monthly;
