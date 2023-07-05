import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  monthlyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';
import { COLORS } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

const Monthly: FC = () => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const monthlyStatistics = useSelector(monthlyStatisticsSelector);
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<IStatisticType>();
  const { t } = useTranslation();

  const showInfo = useCallback((data: IStatisticType) => {
    setDailyData(data);
  }, []);

  if (!monthlyStatistics.data.find(it => it.steps > 0)) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{t('info.no_steps_month')}</Text>
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
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    alignItems: 'center',
  },
});

export default Monthly;
