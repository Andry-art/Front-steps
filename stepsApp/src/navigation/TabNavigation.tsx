import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/main';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../action/registrationAction';
import Statistic from '../screens/statistics';

const Tab = createBottomTabNavigator();

const TabNavigation: FC = () => {
  const dispatch = useDispatch();
  const checkStore = async () => {
    dispatch(logOutAction());
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={checkStore}>
              <Text>LogOut</Text>
            </TouchableOpacity>
          ),
        }}
      />
         <Tab.Screen
        name="Statistic"
        component={Statistic}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={checkStore}>
              <Text>LogOut</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
