import AsyncStorage from '@react-native-community/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { TabNavigation } from '../../constants/types';
import { userHistoryLoadingSelector, userHistorySelector } from '../../selectors/userDataSelector';

interface Props {
  navigation: BottomTabNavigationProp<TabNavigation>;
}

const Statistic: FC<Props> = ({ navigation }) => {
  const historySteps = useSelector(userHistorySelector);
  const isLoading = useSelector(userHistoryLoadingSelector);
  const dispatch = useDispatch();
  const { width: screenWidth } = useWindowDimensions();
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user_id');
    if (userData) {
      dispatch(getUserDataAction(userData));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return unsubscribe;
  }, []);
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  console.log(historySteps);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* {historySteps.map(it => {
          return (
            <View
              key={String(it._id)}
              style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-evenly' }}
            >
              <Text>{String(it.date)}</Text>
              <Text>{String(it.steps)}</Text>
              <Text>{String(it.tokens)}</Text>
            </View>
          );
        })} */}
      <View style={styles.chart}>
        <VictoryChart width={400} theme={VictoryTheme.material} domainPadding={{ x: 15 }} animate={{
            duration: 600,
          }}>
          <VictoryBar
            data={historySteps}
            x="date"
            y="steps"
            width={100}
            cornerRadius={8}
            style={{ data: { fill: '#404CB2', width: 30, borderRadius: 30 } }}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  chart: {
    alignItems: 'center',
  },
});

export default Statistic;
