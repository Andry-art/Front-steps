import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/main';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../action/registrationAction';
import Statistic from '../screens/statistics';
import stepImageSource from '../../assets/footprint.png'
import logOutImageSource from '../../assets/logout.png'
import statisticImageSource from '../../assets/statistics.png'

const Tab = createBottomTabNavigator();

const TabNavigation: FC = () => {
  const dispatch = useDispatch();
  const checkStore = async () => {
    dispatch(logOutAction());
  };

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBarStyle,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerTitle: 'Main',
          headerRight: () => (
            <TouchableOpacity onPress={checkStore} style={styles.logOut}>
              <Image
                source={logOutImageSource}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.iconArea}>
              <Image
                source={stepImageSource}
                style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? '#404CB2' : '#C0C0C0'},
                ]}>
                Main
              </Text>
            </View>
          ),
        }}
      />
         <Tab.Screen
        name="Statistic"
        component={Statistic}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={checkStore} style={styles.logOut}>
            <Image
              source={logOutImageSource}
            />
          </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.iconArea}>
              <Image
                source={statisticImageSource}
                style={{tintColor: focused ? '#404CB2' : '#C0C0C0'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? '#404CB2' : '#C0C0C0'},
                ]}>
                Statistic
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
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
  logOut: {
    paddingRight: 10,
  },
});

export default TabNavigation;
