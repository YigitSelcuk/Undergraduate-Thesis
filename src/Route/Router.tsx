import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/FirstLogin/Login/Login';
import SignIn from '../pages/FirstLogin/SignIn/SignIn';
import SignUp from '../pages/FirstLogin/Signup/SignUp';

const Stack = createStackNavigator();

const Router = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sign-In"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sign-Up"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      
      </Stack.Navigator>
  );
};

export default Router;