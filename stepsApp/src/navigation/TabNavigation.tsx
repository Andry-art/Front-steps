import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/main'

const Tab = createBottomTabNavigator();


const TabNavigation:FC = () => {

    return <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      name="MainScreen"
      component={MainScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
}

export default TabNavigation;

