import { FC } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

const DiscountInfo: FC = () => {
  return (
    <View>
      <Text>Discount Info</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default DiscountInfo;
