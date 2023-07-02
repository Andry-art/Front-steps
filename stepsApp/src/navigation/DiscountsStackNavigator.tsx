import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscountsTopTabs from './TopTabDiscounts';
import { TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../action/registrationAction';
import logOutImageSource from '../../assets/logout.png';
import discountInfo from '../screens/discounts/discountInfo';

const Stack = createNativeStackNavigator();

const DiscountsStackNavigator: FC = () => {
  const dispatch = useDispatch();
  const checkStore = () => {
    dispatch(logOutAction);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="root"
        component={DiscountsTopTabs}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={checkStore}>
              <Image source={logOutImageSource} />
            </TouchableOpacity>
          ),
          title: 'Discounts',
        }}
      />
      <Stack.Screen
        name="DiscountInfo"
        component={discountInfo}
        options={({ route }) => ({ title: route?.params?.title })}
      />
      {/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default DiscountsStackNavigator;
