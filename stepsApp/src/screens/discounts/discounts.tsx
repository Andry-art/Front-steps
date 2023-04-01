import { FC } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import skyEngImg from '../../../assets/skyEng.png';
import DiscountCard from '../../components/DiscountCard';

const keyExtractor = (item: any) => item.id;

const data = [
  {
    img: skyEngImg,
    description: `Обучение в самой большой онлайн-школе английского языка в России по специальным ценам для сотрудников, их родственников и друзей.
Запись на бесплатный вводный урок:
https://corp.skyeng.ru/itechartff
При желании Skyeng может устраивать самые интересные Event- мероприятия, где вы сможете в формате "бизнес игры" прокачать свои навыки в английском языке.
По всем вопросам Вы можете смело обращаться к Александру Новожилову
tel: +7 (985) 741-13-11
mail: a.novozhilov@skyeng.ru`,
    title: 'SkyEng',
    discount: 50,
    id: '1',
  },
  {
    img: skyEngImg,
    description: `Обучение в самой большой онлайн-школе английского языка в России по специальным ценам для сотрудников, их родственников и друзей.
Запись на бесплатный вводный урок:
https://corp.skyeng.ru/itechartff
При желании Skyeng может устраивать самые интересные Event- мероприятия, где вы сможете в формате "бизнес игры" прокачать свои навыки в английском языке.
По всем вопросам Вы можете смело обращаться к Александру Новожилову
tel: +7 (985) 741-13-11
mail: a.novozhilov@skyeng.ru`,
    title: 'SkyEng',
    discount: 50,
    id: '2',
  },
  {
    img: skyEngImg,
    description: `Обучение в самой большой онлайн-школе английского языка в России по специальным ценам для сотрудников, их родственников и друзей.
Запись на бесплатный вводный урок:
https://corp.skyeng.ru/itechartff
При желании Skyeng может устраивать самые интересные Event- мероприятия, где вы сможете в формате "бизнес игры" прокачать свои навыки в английском языке.
По всем вопросам Вы можете смело обращаться к Александру Новожилову
tel: +7 (985) 741-13-11
mail: a.novozhilov@skyeng.ru`,
    title: 'SkyEng',
    discount: 50,
    id: '3',
  },
];

const Discounts: FC = () => {
  const renderDiscount = ({ item }) => {
    return (
      <DiscountCard
        img={item.img}
        title={item.title}
        description={item.description}
        discount={item.discount}
      />
    );
  };

  return (
    <>
      <FlatList
        data={data}
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
  },
});

export default Discounts;
