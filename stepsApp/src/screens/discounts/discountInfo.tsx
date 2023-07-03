import React, { FC } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button';

interface Props {
  route: any;
}

const DiscountInfo: FC<Props> = ({ route }) => {
  const { img, rules, cost, discount } = route.params.discountProps;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: img }} style={styles.img} />
      </View>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{rules}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>Discount: </Text>
        <Text style={styles.cost}>{discount}%</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>Cost: </Text>
        <Text style={styles.cost}>{cost} SP</Text>
      </View>
      <Button title="Get discount" style={styles.button} isMain onPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
    paddingBottom: 400,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  cost: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
  button: {
    marginVertical: 20,
    backgroundColor: COLORS.green,
    marginBottom: 30,
  },
});

export default DiscountInfo;
