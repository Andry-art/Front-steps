import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
  date?: string;
  steps?: number;
  tokens?: number;
  animatedStyle?: any;
}

const InfoModal: FC<Props> = ({ date, steps, tokens, animatedStyle }) => {
  return (
    <Animated.View style={[styles.infoContainer, animatedStyle]}>
      <View style={styles.item}>
        <Text style={styles.title}>Date:</Text>
        <Text style={styles.info}>{date}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Steps:</Text>
        <Text style={styles.info}>{steps}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Tokens:</Text>
        <Text style={styles.info}>{tokens}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    padding: 20,
    marginTop: 40,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InfoModal;
