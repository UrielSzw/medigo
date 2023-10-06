import React from 'react';
import {View} from 'react-native';
import {
  FooterDoc,
  WelcomePerfilHeader,
  ModifyPersonalData
} from '../../../components';
import {styles} from './ModifyPersonalData.styles';

export const ModifyPersonalDataDoc = ({}) => {

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username="Dr.Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
      <ModifyPersonalData/>
      <FooterDoc current="profile" />
    </View>
  );
};
