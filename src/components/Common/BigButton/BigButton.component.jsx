import React from 'react';
import {Text, View} from 'react-native';
import {CaduceusIcon, UserIcon} from '../../../assets';

export const BigButton = ({}) => {
  return (
    <View>
      <CaduceusIcon />
      <UserIcon />
      <Text>Medico</Text>
    </View>
  );
};
