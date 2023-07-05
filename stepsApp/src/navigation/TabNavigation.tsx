import React, { FC, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/main';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import stepImageSource from '../../assets/footprint.png';
import statisticImageSource from '../../assets/statistics.png';
import StatisticsTabs from './TopTabStatisticNav';
import tagImageSource from '../../assets/tag.png';
import DiscountsStackNavigator from './DiscountsStackNavigator';
import { COLORS } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import settingsImageSource from '../../assets/settings.png';
import SettingsModal from './SettingsModal';

const Tab = createBottomTabNavigator();

const TabNavigation: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSettings = () => {
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerTitle: t('main.title'),
            headerRight: () => (
              <TouchableOpacity onPress={openSettings} style={styles.logOut}>
                <Image source={settingsImageSource} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconArea}>
                <Image
                  source={stepImageSource}
                  style={{ tintColor: focused ? COLORS.blue : COLORS.gray }}
                />
                <Text style={[styles.title, { color: focused ? COLORS.blue : COLORS.gray }]}>
                  {t('main.title')}
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Discounts"
          component={DiscountsStackNavigator}
          options={{
            headerShown: false,
            // headerRight: () => (
            //   <TouchableOpacity onPress={checkStore} style={styles.logOut}>
            //     <Image source={logOutImageSource} />
            //   </TouchableOpacity>
            // ),
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconArea}>
                <Image
                  source={tagImageSource}
                  style={{ tintColor: focused ? COLORS.blue : COLORS.gray }}
                />
                <Text style={[styles.title, { color: focused ? COLORS.blue : COLORS.gray }]}>
                  {t('discounts.title')}
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Statistic"
          component={StatisticsTabs}
          options={{
            headerTitle: t('statistic.title'),
            headerRight: () => (
              <TouchableOpacity onPress={openSettings} style={styles.logOut}>
                <Image source={settingsImageSource} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconArea}>
                <Image
                  source={statisticImageSource}
                  style={{ tintColor: focused ? COLORS.blue : COLORS.gray }}
                />
                <Text style={[styles.title, { color: focused ? COLORS.blue : COLORS.gray }]}>
                  {t('statistic.title')}
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <SettingsModal isModalOpen={isModalOpen} close={close} />
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingBottom: 20,
    paddingVertical: 10,
    width: '100%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '500',
    color: COLORS.black,
    fontSize: 14,
    width: 80,
  },

  iconArea: {
    alignItems: 'center',
  },
  logOut: {
    paddingRight: 10,
  },
});

export default TabNavigation;
