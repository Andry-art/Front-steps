import { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Transaction from '../../components/Transaction';
import { transactionsSelector } from '../../selectors/userDataSelector';
import { COLORS } from '../../constants/colors';

const keyExtractor = (item: any, ind: any) => ind;

const Transactions: FC = () => {
  const allTransactions = useSelector(transactionsSelector);

  const renderDiscount = ({ item }: any) => {
    return <Transaction date={item.date} tokens={item.tokens} />;
  };

  return (
    <>
      <FlatList
        data={allTransactions}
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

export default Transactions;
