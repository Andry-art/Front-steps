import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../screens/registration/LogIn';
import SignUp from '../screens/registration/SignUp';
import DiscountsTopTabs from './TopTabDiscounts';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../action/registrationAction';
import logOutImageSource from '../../assets/logout.png';
import discountInfo from '../screens/discounts/discountInfo';

const Stack = createNativeStackNavigator();

const DiscountsStackNavigator: FC = () => {
  const dispatch = useDispatch();
  const checkStore = async () => {
    dispatch(logOutAction());
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
      <Stack.Screen name="DiscountInfo" component={discountInfo} />
      {/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingBottom: 20,
    paddingVertical: 10,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    width: 70,
  },

  iconArea: {
    alignItems: 'center',
  },
});

export default DiscountsStackNavigator;
