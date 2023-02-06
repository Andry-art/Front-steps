import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../../action/registrationAction';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RegistrationNavigation } from '../../constants/types';
import * as yup from 'yup';
import { useFormik } from 'formik';

const signUpSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password is not the same'),
});

const initialValues = { email: '', password: '', repeatPassword: '' };

interface Props {
  navigation: NativeStackNavigationProp<RegistrationNavigation>;
}

const SignUp: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const hideKeyBoard = () => {
    Keyboard.dismiss();
  };

  const goToLogIn = () => {
    navigation.navigate('LogIn');
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isValid, dirty } =
    useFormik<{ email: string; password: string; repeatPassword: string }>({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: values => {
        const email = values.email;
        const password = values.password;
        dispatch(userSignUp({ email, password }));
      },
    });

  return (
    <TouchableWithoutFeedback onPress={hideKeyBoard}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        <Input
          placeholder={'repeat password'}
          onChangeText={handleChange('repeatPassword')}
          value={values.repeatPassword}
          textContentType="password"
          onBlur={handleBlur('repeatPassword')}
          errors={errors.repeatPassword}
          isPassword={true}
          touched={touched.repeatPassword}
          isRegistration={true}
        />
        <Button title={'SignUp'} onPress={handleSubmit} disabled={!(isValid && dirty)} />
        <Button title={'LogIn'} onPress={goToLogIn} isSecondary />
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

export default SignUp;
