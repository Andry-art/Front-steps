import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Discounts from '../screens/discounts/discounts';
import Transactions from '../screens/discounts/transactions';
import { useTranslation } from 'react-i18next';

const TopTabDiscounts = createMaterialTopTabNavigator();

function DiscountsTopTabs() {
  const { t } = useTranslation();

  return (
    <TopTabDiscounts.Navigator>
      <TopTabDiscounts.Screen
        name="discounts"
        component={Discounts}
        options={{
          title: t('discounts.title'),
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
      <TopTabDiscounts.Screen
        name="transactions"
        component={Transactions}
        options={{
          title: t('discounts.transaction'),
          tabBarActiveTintColor: '#40B4BB',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarIndicatorStyle: { backgroundColor: '#40B4BB' },
        }}
      />
    </TopTabDiscounts.Navigator>
  );
}

export default DiscountsTopTabs;
