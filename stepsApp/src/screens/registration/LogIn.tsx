import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, userLogIn } from '../../action/registrationAction';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RegistrationNavigation } from '../../constants/types';
import { logInError } from '../../selectors/registrationSelectors';
import * as yup from 'yup';
import { useFormik } from 'formik';

const logInSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const initialValues = { email: '', password: '' };

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}

const LogIn: FC<Props> = ({ navigation }) => {
  const error = useSelector(logInError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanError());
  });

  const hideKeyBoard = () => {
    Keyboard.dismiss();
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isValid, dirty } =
    useFormik<{ email: string; password: string }>({
      initialValues: initialValues,
      validationSchema: logInSchema,
      onSubmit: values => {
        dispatch(userLogIn(values));
      },
    });

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  if (error) {
    Alert.alert(error);
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyBoard}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View>
          <Input
            placeholder={'email'}
            onChangeText={handleChange('email')}
            value={values.email}
            textContentType="emailAddress"
            keyboardType="email-address"
            onBlur={handleBlur('email')}
            errors={errors.email}
            isPassword={false}
            touched={touched.email}
            isRegistration={true}
          />
          <Input
            placeholder={'password'}
            onChangeText={handleChange('password')}
            value={values.password}
            textContentType="password"
            onBlur={handleBlur('password')}
            errors={errors.password}
            isPassword={true}
            touched={touched.password}
            isRegistration={true}
          />
          <Button title={'LogIn'} onPress={handleSubmit} disabled={!(isValid && dirty)} />
          <Button title={'SignUp'} onPress={goToSignUp} isSecondary />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default LogIn;
