import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  img: any;
  title: string;
  description: string;
  discount: string;
}

const DiscountCard: FC<Props> = ({ img, title, description, discount }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Image source={img} style={styles.img}></Image>
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
    backgroundColor: 'white',
    height: 120,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
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
    color: 'red',
    fontWeight: '800',
  },
});

export default DiscountCard;
