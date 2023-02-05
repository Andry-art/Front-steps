import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '../../action/registrationAction';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoadingScreen from '../../components/loadingScreen';
import { RegistrationNavigation } from '../../constants/types';
import { IsLoadingUser } from '../../selectors/registrationSelectors';

interface Props {
    navigation: NativeStackNavigationProp<RegistrationNavigation>;
  }

const LogIn:FC<Props> = ({navigation}) => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

    const goToLogIn = () => {
        navigation.navigate('LogIn')
      }
      
      const onChangeEmail = (event: React.SetStateAction<string>) => {
        setEmail(event)
      }
      const onChangePassword = (event: React.SetStateAction<string>) => {
        setPassword(event)
      }

      const onChangePasswordSecond = (event: React.SetStateAction<string>) => {
        setRepeatPassword(event)
      }

      const signUp = () => {
        if(password === repeatPassword){
          dispatch(userSignUp({email, password}));
        }
      }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View>
        <Input placeholder={'email'} onChange={onChangeEmail}/>
        <Input placeholder={'password'} onChange={onChangePassword}/>
        <Input placeholder={'repeat password'} onChange={onChangePasswordSecond}/>
        <Button title={'SignUp'} onPress={signUp}/>
        <Button title={'LogIn'} onPress={goToLogIn} isSecondary/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  marginHorizontal: 40,
  justifyContent: 'center',
  },
  title:{
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default LogIn;