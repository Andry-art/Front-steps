import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Pedometer from '@t2tx/react-native-universal-pedometer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserDataAction, refreshDailyState, sendUserData, setDailyData } from '../../action/userDataAction';
import CommonInfo from './commonInfo';
import { dailyDataSelector } from '../../selectors/userDataSelector';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [tokens, setTokens] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  let intervalId: any = null;

  const dailyData = useSelector(dailyDataSelector)

  useEffect(() => {
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning]);

  const todayData = new Date();

  var d = new Date();
  d.setHours(0, 0, 0, 0);

  const onStartCount = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    if (!isStart) {
      setIsTimerRunning(true);
      setIsStart(true);
      const timeStart = new Date();
      Pedometer.startPedometerUpdatesFromDate(timeStart.getTime(), pedometerData => {
        const distance = pedometerData?.distance ? pedometerData?.distance / 1000 : 0;
        const tokensData = pedometerData?.numberOfSteps
          ? Math.floor(pedometerData?.numberOfSteps / 100)
          : tokens;
          const stepData = { userId, date: moment(todayData).format('DD.MM.YYYY'), steps: pedometerData?.numberOfSteps, tokens: tokensData , distance };
        if (pedometerData?.numberOfSteps) {
          dispatch(setDailyData(stepData))
        }
      });
    } else {
      setIsTimerRunning(false);
      Pedometer.stopPedometerUpdates();
      setIsStart(false);
      if (userId) {
        const stepData = { userId, date: dailyData.date, steps: dailyData.steps, tokens: dailyData.tokens};
        dispatch(sendUserData(stepData));
        dispatch(getUserDataAction(userId));
      }
      dispatch(refreshDailyState())
      setSeconds(0);
    }
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenContainer}>
        <View style={styles.tokenCircle}>
          <Text style={styles.tokenInfo}>{tokens?.toLocaleString()}</Text>
          <Text style={styles.tokenTitle}>SP per walk</Text>
        </View>
      </View>
      {/* <Button
          title={'count'}
          onPress={() => setSteps(state => state + 1)}
          style={isStart ? styles.buttonColorStop : styles.buttonColorStart}
        /> */}
      <View style={styles.buttomContainer}>
        <CommonInfo
          steps={dailyData?.steps}
          distance={dailyData?.distance}
          hours={hours}
          minutes={minutes}
          seconds={remainingSeconds}
        />
        <Button
          title={isStart ? 'stop' : 'start'}
          onPress={onStartCount}
          style={isStart ? styles.buttonColorStop : styles.buttonColorStart}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  tokenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    width: 200,
    height: 200,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  tokenTitle: {
    fontSize: 24,
  },
  tokenInfo: {
    fontSize: 32,
    fontWeight: '800',
  },
  buttonColorStart: {
    backgroundColor: '#28B761',
    height: 80,
  },
  buttonColorStop: {
    backgroundColor: '#BB2C2C',
    height: 80,
  },
  buttomContainer: {
    height: '40%',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
