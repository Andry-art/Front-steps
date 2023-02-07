import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { dailyActiveTimeSelector, dailyBalanceSelector, dailyDistanceSelector, dailyStepsSelector } from '../../selectors/userDataSelector';



const MainScreen = () => {
  const dailySteps = useSelector(dailyStepsSelector);
  const dailyActiviteTime = useSelector(dailyActiveTimeSelector);
  const dailyDistance= useSelector(dailyDistanceSelector);
  const dailyBalance = useSelector(dailyBalanceSelector);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Steps</Text>
          <Text style={styles.info}>{dailySteps.toLocaleString()}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Active time</Text>
          <Text style={styles.info}>{dailyActiviteTime?.toLocaleString()}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>KM</Text>
          <Text style={styles.info}>{dailyDistance?.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenTitle}>STEP TOKENS FOR TODAY</Text>
        <Text style={styles.tokenInfo}>{dailyBalance?.toLocaleString()}</Text>
      </View>
      <Button title='start' onPress={()=>{}}></Button>
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
    justifyContent: 'space-between',
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
