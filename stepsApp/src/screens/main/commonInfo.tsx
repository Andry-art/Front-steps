import AsyncStorage from '@react-native-community/async-storage';
import { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface Props {
  steps?: number;
  time: string;
  distance?: number;
}

const CommonInfo: FC<Props> = ({ steps, time, distance }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Steps</Text>
        <Text style={styles.info}>{steps?.toLocaleString()}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Time</Text>
        <Text style={styles.info}>{time}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>KM</Text>
        <Text style={styles.info}>{distance?.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 30,
    width: '30%',
    borderRadius: 8,
    marginBottom: 40,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default CommonInfo;
