import React, { FC, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscountsTopTabs from './TopTabDiscounts';
import { TouchableOpacity, Image } from 'react-native';
import discountInfo from '../screens/discounts/discountInfo';
import { useTranslation } from 'react-i18next';
import settingsImageSource from '../../assets/settings.png';
import SettingsModal from './SettingsModal';

const Stack = createNativeStackNavigator();

const DiscountsStackNavigator: FC = () => {
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
      <Stack.Navigator>
        <Stack.Screen
          name="root"
          component={DiscountsTopTabs}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={openSettings}>
                <Image source={settingsImageSource} />
              </TouchableOpacity>
            ),
            title: t('discounts.title'),
          }}
        />
        <Stack.Screen
          name="DiscountInfo"
          component={discountInfo}
          options={({ route }) => ({ title: route?.params?.title })}
        />
        {/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
      <SettingsModal isModalOpen={isModalOpen} close={close} />
    </>
  );
};

export default DiscountsStackNavigator;
