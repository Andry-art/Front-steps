import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FC, useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import LoadingScreen from '../../components/loadingScreen';
import { IStatisticType, TabNavigation } from '../../constants/types';
import {
  userHistoryLoadingSelector,
  monthlyStatisticsSelector,
} from '../../selectors/userDataSelector';
import InfoModal from './infoModal';

interface Props {
  navigation: BottomTabNavigationProp<TabNavigation>;
}

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

const Monthly: FC<Props> = ({ navigation }) => {
  const isLoading = useSelector(userHistoryLoadingSelector);
  const monthlyStatistics = useSelector(monthlyStatisticsSelector);
  const { width: screenWidth } = useWindowDimensions();
  const [dailyData, setDailyData] = useState<IStatisticType>();
  const animatedValue = useSharedValue(0);

  const modalOpacity = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  const showInfo = (data: IStatisticType) => {
    setDailyData(data);
    animatedValue.value = withTiming(1);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <InfoModal
        date={dailyData?.fullDate}
        steps={dailyData?.steps}
        tokens={dailyData?.tokens}
        animatedStyle={modalOpacity}
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
            data={monthlyStatistics}
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
