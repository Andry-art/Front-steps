import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Pedometer from '@t2tx/react-native-universal-pedometer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getUserDataAction,
  refreshDailyState,
  sendUserData,
  setDailyData,
} from '../../action/userDataAction';
import CommonInfo from './commonInfo';
import { dailyDataSelector } from '../../selectors/userDataSelector';
import { useNetInfo } from '@react-native-community/netinfo';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [time, setTime] = useState('0 : 0 : 0');
  const [intervalId, setIntervalId] = useState<any>(0);
  const { isConnected } = useNetInfo();
  const [data, setData] = useState<any>('16');
  const dailyData = useSelector(dailyDataSelector);

  const todayData = new Date();

  const getStep = async () => {
    const lastSteps = await AsyncStorage.getItem('last_steps');
    if(lastSteps){
      const stepData = JSON.parse(lastSteps)
      dispatch(sendUserData(stepData));
    }
  };

  useEffect(() => {
    getStep();
  }, []);

  const dayIsOff = () => {
    Pedometer.stopPedometerUpdates();
    setIsStart(false);
    dispatch(refreshDailyState());
    setTime('0 : 0 : 0');
  }

  const onStart = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const timeStart = new Date();
    const startTime = moment(timeStart);
    const intervalId = setInterval(() => {
      const endTime = moment(new Date());
      const duration = moment.duration(endTime.diff(startTime));
      const time = `${duration.hours()} : ${duration.minutes()} : ${duration.seconds()}`
      setTime(time);
      if(moment(startTime).format('D') !== moment(endTime).format('D')){
        dayIsOff()
        clearInterval(intervalId);
      }
    }, 1000);
    setIntervalId(intervalId);
    setIsStart(true);
    
    Pedometer.startPedometerUpdatesFromDate(timeStart.getTime(), pedometerData => {
      const distance = pedometerData?.distance ? pedometerData?.distance / 1000 : 0;
      const tokensData = pedometerData?.numberOfSteps
        ? Math.floor(pedometerData?.numberOfSteps / 100)
        : dailyData.tokens;
      const stepData = {
        userId,
        date: moment(todayData).format('DD.MM.YYYY'),
        steps: pedometerData?.numberOfSteps,
        tokens: tokensData,
        distance,
      };
      if (pedometerData?.numberOfSteps) {
        dispatch(setDailyData(stepData));
      }
    });
  };

  const onEnd = async () => {
    if(isConnected){
      Pedometer.stopPedometerUpdates();
      setIsStart(false);
      if (dailyData.userId) {
        const stepData = {
          userId: dailyData.userId,
          date: dailyData.date,
          steps: dailyData.steps,
          tokens: dailyData.tokens,
        };
        dispatch(sendUserData(stepData));
        dispatch(getUserDataAction(dailyData.userId));
      }
      dispatch(refreshDailyState());
      setTime('0 : 0 : 0');
      clearInterval(intervalId);
      return;
    }else {
      Pedometer.stopPedometerUpdates();
      setIsStart(false);
      const lastSteps = {
        userId: dailyData.userId,
        date: dailyData.date,
        steps: dailyData.steps,
        tokens: dailyData.tokens,
      };
      await AsyncStorage.setItem('last_steps', JSON.stringify(lastSteps));
     
      setTime('0 : 0 : 0');;
      clearInterval(intervalId);
      dispatch(refreshDailyState());
      return;
    }
  };

  const onPressButton = async () => {
    if (!isStart) {
      if (isConnected) {
        await onStart();
      } else {
        Alert.alert('Turn on internet before start');
      }
    } else {
        onEnd();
    }
  }


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tokenContainer}>
          <View style={styles.tokenCircle}>
            <Text style={styles.tokenInfo}>{dailyData.tokens}</Text>
            <Text style={styles.tokenTitle}>SP per walk</Text>
          </View>
        </View>
        <View style={styles.buttomContainer}>
          <CommonInfo
            steps={dailyData?.steps}
            distance={dailyData?.distance}
            time={time}
          />
          <Button
            title={isStart ? 'stop' : 'start'}
            onPress={onPressButton}
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
