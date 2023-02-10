import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Pedometer from '@t2tx/react-native-universal-pedometer';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import moment from 'moment';
import BackgroundFetch from "react-native-background-fetch";
import configureBackgroundFetch from '../../backgroundFetch';
import AsyncStorage from '@react-native-community/async-storage';
import { sendUserData } from '../../action/userDataAction';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState<number | undefined>(385);
  const [distance, setDistance] = useState<number | undefined>(0);
  const [tokens, setTokens] = useState<number | undefined>(3);

  const todayData = new Date()

  const sendData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id')
      const stepData = {userId, date: moment(todayData).format('DD.MM.YYYY'), steps, tokens}
      dispatch(sendUserData(stepData))
      BackgroundFetch.finish();
    } catch (error) {
      console.log('[BackgroundFetch] Error:', error);
  
      // BackgroundFetch must signal completion by calling #finish.
      BackgroundFetch.finish();
    }
  }


  useEffect(() => {
    configureBackgroundFetch(sendData);
  }, []);

  var d = new Date();
  d.setHours(0, 0, 0, 0);

  Pedometer.startPedometerUpdatesFromDate(d.getTime(), pedometerData => {
    const distance = pedometerData?.distance ? pedometerData?.distance / 1000 : 0;
    const tokensData = pedometerData?.numberOfSteps
      ? Math.floor(pedometerData?.numberOfSteps / 100)
      : tokens;
    setDistance(distance);
    setSteps(pedometerData?.numberOfSteps);
    setTokens(tokensData);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Steps</Text>
          <Text style={styles.info}>{steps?.toLocaleString()}</Text>
        </View>
        {/* <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Active time</Text>
          <Text style={styles.info}>{dailyActiviteTime?.toLocaleString()}</Text>
        </View> */}
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>KM</Text>
          <Text style={styles.info}>{distance?.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenTitle}>STEP TOKENS FOR TODAY</Text>
        <Text style={styles.tokenInfo}>{tokens?.toLocaleString()}</Text>
      </View>
      {/* <Button title='start' onPress={()=>{}}></Button> */}
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    fontWeight: '800',
  },
  tokenContainer: {
    alignItems: 'center',
  },
  tokenTitle: {
    fontSize: 24,
    marginBottom: 50,
  },
  tokenInfo: {
    fontSize: 32,
    fontWeight: '800',
  },
});

