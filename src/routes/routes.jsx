import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Register} from '../screens';
import {PATHS} from './paths';

export const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={PATHS.REGISTER}>
        <Stack.Screen name={PATHS.REGISTER} component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
