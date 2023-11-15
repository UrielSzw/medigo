import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  FooterDoc,
  WelcomePerfilHeader,
  PersonalData,
} from '../../../components';
import {styles} from './PersonalDataDoc.styles';

export const PersonalDataDoc = () => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username={`${doctorData.nombre} ${doctorData.apellido}`}
        email={doctorData.username}
      />
      <PersonalData />
      <FooterDoc current="profile" />
    </View>
  );
};
