import AsyncStorage from '@react-native-community/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataAction } from '../../action/userDataAction';
import LoadingScreen from '../../components/loadingScreen';
import { TabNavigation } from '../../constants/types';
import { userHistoryLoadingSelector, userHistorySelector } from '../../selectors/userDataSelector';

interface Props{
  navigation: BottomTabNavigationProp<TabNavigation>;

}

const WeeklyStatistic:FC<Props> = ({navigation}) => {
  const historySteps = useSelector(userHistorySelector);
  const isLoading = useSelector(userHistoryLoadingSelector);


    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <SafeAreaView style={styles.container}>
    
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

export default WeeklyStatistic;