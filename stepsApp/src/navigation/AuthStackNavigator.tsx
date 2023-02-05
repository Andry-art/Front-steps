import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../screens/registration/LogIn';
import SignUp from '../screens/registration/SignUp';


const Stack = createNativeStackNavigator();

const AuthStackNavigator:FC = () => {
   return  <Stack.Navigator>
    <Stack.Screen
      name="LogIn"
      component={LogIn}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
}

export default AuthStackNavigator ;