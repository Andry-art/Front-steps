import React, { FC } from 'react';
import { FlatList, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

const DiscountInfo: FC = ({ navigation }) => {
  console.log(navigation.getState().routes[1].params, 'vvvv');
  return (
    <ScrollView style={styles.container}>
      <View>{/* <Image source={{ uri: img }} style={styles.img} /> */}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  img: {
    width: '100%',
    height: 100,
  },
});

export default DiscountInfo;
