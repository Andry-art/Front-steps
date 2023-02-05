import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, userLogIn } from '../../action/registrationAction';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RegistrationNavigation } from '../../constants/types';
import { logInError } from '../../selectors/registrationSelectors';

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}


const LogIn:FC<Props> = ({navigation}) => {
  const error = useSelector(logInError);
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()

  const onChangeEmail = (event: React.SetStateAction<string>) => {
    setEmail(event)
  }
  const onChangePassword = (event: React.SetStateAction<string>) => {
    setPassword(event)
  }

  const logIn = () => {
    dispatch(userLogIn({email, password}));
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp')
  }

  if(error){
    Alert.alert(error), [{text: 'ok', onPress: dispatch(cleanError())}];
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View>
        <Input placeholder={'email'} onChange = {onChangeEmail}/>
        <Input placeholder={'password'} onChange = {onChangePassword}/>
        <Button title={'LogIn'} onPress={logIn} />
        <Button title={'SignUp'} onPress={goToSignUp} isSecondary/>
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