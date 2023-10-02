import React from 'react';
import {View} from 'react-native';
import {MedigoIcon} from '../../../assets';
import {styles} from './Banner.styles';

export const Banner = () => {
  return (
    <View>
      <View style={styles.wrapper} />
      <View style={styles.logo}>
        <MedigoIcon />
      </View>
    </View>
  );
};
