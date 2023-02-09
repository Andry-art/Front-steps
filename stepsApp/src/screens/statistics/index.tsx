import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/loadingScreen';
import { userHistoryLoadingSelector, userHistorySelector } from '../../selectors/userDataSelector';

const Statistic = () => {
  const historySteps = useSelector(userHistorySelector);
  const isLoading = useSelector(userHistoryLoadingSelector);
  

  // console.log(historySteps);
  if (isLoading) {
    return <LoadingScreen/>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {historySteps.map(it => {
        return <View key={String(it._id)} style={{flexDirection: 'row', marginBottom: 20, justifyContent: 'space-evenly'}}>
            <Text>{String(it.date)}</Text>
            <Text>{String(it.steps)}</Text>
            <Text>{String(it.tokens)}</Text>
        </View>
      })}
    </SafeAreaView>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
