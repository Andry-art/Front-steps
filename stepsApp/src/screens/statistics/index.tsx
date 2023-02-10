import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { userHistoryLoadingSelector, userHistorySelector } from '../../selectors/userDataSelector';

const Statistic = () => {
  const historySteps = useSelector(userHistorySelector);
  const isLoading = useSelector(userHistoryLoadingSelector);
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user_id');
    if (userData) {
      dispatch(getUserDataAction(userData));
    }
  }
    useEffect(() => {
      getUserData();
    }, []);

    console.log(historySteps);
    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <SafeAreaView style={styles.container}>
        {historySteps.map(it => {
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
        })}
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Statistic;