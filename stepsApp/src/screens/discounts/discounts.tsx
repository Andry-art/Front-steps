import React, { FC, useEffect } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import DiscountCard from '../../components/DiscountCard';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiscountsAction } from '../../action/discountAction';
import {
  getAllDiscountSelector,
  isErrorDiscountSelector,
  isLoadingDiscountSelector,
} from '../../selectors/discountsSelectors';
import LoadingScreen from '../../components/loadingScreen';

const keyExtractor = (item: any) => item._id;

const Discounts: FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const allDiscounts = useSelector(getAllDiscountSelector);
  const isLoading = useSelector(isLoadingDiscountSelector);
  const error = useSelector(isErrorDiscountSelector);

  useEffect(() => {
    dispatch(getAllDiscountsAction());
  }, [dispatch]);

  const onPressDiscount = (title: string, item: any) => {
    navigation.navigate('DiscountInfo', { title, discountProps: item });
  };

  const renderDiscount = ({ item }: any) => {
    return (
      <DiscountCard
        img={item.img}
        title={item.title}
        description={item.rules}
        discount={item.discount}
        onPress={() => onPressDiscount(item.title, item)}
      />
    );
  };

  if (error) {
    Alert.alert(error);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <FlatList
        data={allDiscounts}
        renderItem={item => renderDiscount(item)}
        keyExtractor={keyExtractor}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
});

export default Discounts;
