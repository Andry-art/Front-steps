import { FC } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import addSourceIcon from '../../assets/add.png';

interface Props {
  date: string;
  tokens: number;
}

const Transaction: FC<Props> = ({ date, tokens }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.token}>{tokens}</Text>
      <Image source={addSourceIcon} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 80,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    tintColor: '#57cc09',
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
  },
  token: {
    fontSize: 22,
    fontWeight: '800',
  },
});

export default Transaction;
