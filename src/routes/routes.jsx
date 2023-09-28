import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomePat,
  Login,
  Register,
  RegisterDoc,
  HomeDoc,
  RegisterPat,
} from '../screens';
import {PATHS} from './paths';

export const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={PATHS.HOMEPATIENT}>
        <Stack.Screen name={PATHS.REGISTER} component={Register} />
        <Stack.Screen name={PATHS.REGISTER_PAT} component={RegisterPat} />
        <Stack.Screen name={PATHS.LOGIN} component={Login} />
        <Stack.Screen name={PATHS.HOMEDOCTOR} component={HomeDoc} />
        <Stack.Screen name={PATHS.REGISTERDOCTOR} component={RegisterDoc} />
        <Stack.Screen name={PATHS.HOMEPATIENT} component={HomePat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
