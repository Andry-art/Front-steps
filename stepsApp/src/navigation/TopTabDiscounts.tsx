import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Discounts from '../screens/discounts/discounts';
import Transactions from '../screens/discounts/transactions';

const TopTabDiscounts = createMaterialTopTabNavigator();

function DiscountsTopTabs() {
  return (
    <TopTabDiscounts.Navigator>
      <TopTabDiscounts.Screen
        name="discounts"
        component={Discounts}
        options={{
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabDiscounts.Screen
        name="transactions"
        component={Transactions}
        options={{
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
    </TopTabDiscounts.Navigator>
  );
}

export default DiscountsTopTabs;
