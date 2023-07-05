import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  yearlyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';
import { COLORS } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

const Yearly: FC = () => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const yearlyStatistics = useSelector(yearlyStatisticsSelector);
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const [monthlyData, setMonthlyData] = useState<IStatisticType>();

  const showInfo = useCallback((data: IStatisticType) => {
    setMonthlyData(data);
  }, []);

  if (!yearlyStatistics.data.find(it => it.steps > 0)) {
    return (
      <View style={styles.emptyChartContainer}>
        <Text>{t('info.no_steps_year')}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <InfoModal
        date={monthlyData?.fullDate}
        steps={monthlyData?.steps}
        tokens={monthlyData?.tokens}
        totalSteps={yearlyStatistics.totalSteps}
        totalTokens={yearlyStatistics.totalTokens}
        year
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
            data={yearlyStatistics.data}
            x="month"
            y="steps"
            width={100}
            cornerRadius={8}
            style={{ data: { fill: '#40B4BB', width: 20, borderRadius: 30 } }}
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
  emptyChartContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    alignItems: 'center',
  },
});

export default Yearly;
