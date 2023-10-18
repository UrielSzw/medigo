import React, {useState} from 'react';
import {View} from 'react-native';
import {
  FooterDoc,
  WelcomePerfilHeader,
  ModifyPersonalData,
} from '../../../components';
import {styles} from './ModifyPersonalData.styles';

export const ModifyPersonalDataDoc = () => {
  const [hideFooter, setHideFooter] = useState(false);

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username="Dr.Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
      <ModifyPersonalData setHideFooter={setHideFooter} />
      {!hideFooter && <FooterDoc current="profile" />}
    </View>
  );
};
