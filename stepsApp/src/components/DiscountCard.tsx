import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  img: any;
  title: string;
  description: string;
  discount: string;
  onPress: () => void;
}

const DiscountCard: FC<Props> = ({ img, title, description, discount, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={{ uri: img }} style={styles.img} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
      <Text style={styles.discount}>-{discount}%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 120,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    width: '70%',
    marginLeft: 15,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
  },
  discount: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: COLORS.red,
    fontWeight: '800',
  },
});

export default DiscountCard;
