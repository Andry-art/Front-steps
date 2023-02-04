import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RegistrationNavigation } from '../../constants/types';

interface Props {
    navigation: NativeStackNavigationProp<RegistrationNavigation>;
  }

const LogIn:FC<Props> = ({navigation}) => {
    const goToLogIn = () => {
        navigation.navigate('LogIn')
      }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View>
        <Input placeholder={'email'}/>
        <Input placeholder={'password'}/>
        <Input placeholder={'repeat password'}/>
        <Button title={'SignUp'} onPress={()=>{}}/>
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