import React, { FC, memo, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAction } from '../action/registrationAction';
import LoadingScreen from '../components/loadingScreen';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import TabNavigation from '../navigation/TabNavigation';
import { IsLoadingUser, userIsLogIn } from '../selectors/registrationSelectors';

const Main: FC = memo(() => {
  const isLoading = useSelector(IsLoadingUser);
  const isLogIn = useSelector(userIsLogIn);
  const dispatch = useDispatch();

  const doCheckLogIn = async () => {
    try {
      const value = await EncryptedStorage.getItem('user_session');
      console.log(value === undefined);
      if (!value) {
        dispatch(logOutAction());
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finely');
    }
  };

  useEffect(() => {
    doCheckLogIn();
  }, []);

  if (isLoading) {
   return <LoadingScreen />;
  }

  return <>{!isLogIn ? <AuthStackNavigator /> : <TabNavigation />}</>;
});

export default Main;
