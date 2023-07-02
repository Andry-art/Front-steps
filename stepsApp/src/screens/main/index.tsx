import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [time, setTime] = useState('0 : 0 : 0');
  const [intervalId, setIntervalId] = useState<any>(0);
  const { isConnected } = useNetInfo();
  const dailyData = useSelector(dailyDataSelector);
  const animatedValue = useSharedValue(0);

  const todayData = new Date();

  const getStep = async () => {
    const lastSteps = await AsyncStorage.getItem('last_steps');
    if (lastSteps) {
      const stepData = JSON.parse(lastSteps);
      dispatch(sendUserData(stepData));
    }
  };

  useEffect(() => {
    getStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dayIsOff = () => {
    animatedValue.value = withSpring(0);
    Pedometer.stopPedometerUpdates();
    setIsStart(false);
    dispatch(refreshDailyState());
    setTime('0 : 0 : 0');
  };

  const onStart = async () => {
    animatedValue.value = withSequence(
      withSpring(20),
      withRepeat(
        withSequence(
          withTiming(10, { duration: 3000 }),
          withDelay(500, withTiming(20, { duration: 2000 })),
        ),
        -1,
        true,
      ),
    );

    const userId = await AsyncStorage.getItem('user_id');
    const timeStart = new Date();
    const startTime = moment(timeStart);
    const intervalId = setInterval(() => {
      const endTime = moment(new Date());
      const duration = moment.duration(endTime.diff(startTime));
      const time = `${duration.hours()} : ${duration.minutes()} : ${duration.seconds()}`;
      setTime(time);
      if (moment(startTime).format('D') !== moment(endTime).format('D')) {
        dayIsOff();
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
    animatedValue.value = withSequence(withTiming(20), withTiming(0));
    if (isConnected) {
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
    } else {
      Pedometer.stopPedometerUpdates();
      setIsStart(false);
      const lastSteps = {
        userId: dailyData.userId,
        date: dailyData.date,
        steps: dailyData.steps,
        tokens: dailyData.tokens,
      };
      await AsyncStorage.setItem('last_steps', JSON.stringify(lastSteps));

      setTime('0 : 0 : 0');
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
  };

  const firstCircleAnimate = useAnimatedStyle(() => {
    const size = interpolate(animatedValue.value, [0, 5, 10, 15, 20], [190, 200, 210, 220, 250]);
    const borderColor = interpolateColor(animatedValue.value, [0, 20], ['#40B4BB', '#86D9DE']);
    return {
      width: size,
      height: size,
      borderColor: borderColor,
    };
  });

  const secondCircleAnimate = useAnimatedStyle(() => {
    const size = interpolate(animatedValue.value, [0, 5, 10, 15, 20], [190, 200, 220, 260, 320]);
    const borderColor = interpolateColor(animatedValue.value, [0, 20], ['#40B4BB', '#B7ECEC']);
    return {
      width: size,
      height: size,
      borderColor: borderColor,
    };
  });

  const thirdBackgroundCircle = useAnimatedStyle(() => {
    const size = interpolate(animatedValue.value, [0, 5, 10, 15, 20], [190, 220, 260, 320, 390]);
    const borderColor = interpolateColor(animatedValue.value, [0, 20], ['#40B4BB', '#DBF6F8']);
    return {
      width: size,
      height: size,
      borderColor: borderColor,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenContainer}>
        <Animated.View style={[styles.thirdBackgroundCircle, thirdBackgroundCircle]}>
          <Animated.View style={[styles.secondBackgroundCircle, secondCircleAnimate]}>
            <Animated.View style={[styles.firstBackgroundCircle, firstCircleAnimate]}>
              <View style={styles.tokenCircle}>
                <Text style={styles.tokenInfo}>{dailyData.tokens}</Text>
                <Text style={styles.tokenTitle}>SP per walk</Text>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
      <View style={styles.buttomContainer}>
        <CommonInfo steps={dailyData?.steps} distance={dailyData?.distance} time={time} />
        <Button
          title={isStart ? 'stop' : 'start'}
          onPress={onPressButton}
          isMain
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
    backgroundColor: COLORS.white,
  },
  tokenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    width: 200,
    height: 200,
    shadowColor: COLORS.black,
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
    backgroundColor: COLORS.green,
    height: 80,
  },
  buttonColorStop: {
    backgroundColor: COLORS.red,
    height: 80,
  },
  buttomContainer: {
    height: '40%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  firstBackgroundCircle: {
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
  },
  secondBackgroundCircle: {
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 14,
  },
  thirdBackgroundCircle: {
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 20,
  },
});
