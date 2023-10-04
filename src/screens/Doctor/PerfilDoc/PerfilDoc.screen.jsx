/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {
  FooterDoc,
  ProfileOption,
  WelcomePerfilHeader,
} from '../../../components';
import {HelpIcon, PersonalDataIcon, ActivityIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PerfilDoc.styles';

export const PerfilDoc = ({navigation}) => {
  const handleActividadPress = () => {
    navigation.navigate(PATHS.ACTIVITYDOC);
  };

  const handleDatosPersonalesPress = () => {};

  const handleAyudaPress = () => {};

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username="Dr.Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
      <View style={styles.container}>
        <ProfileOption
          iconComponent={
            <ActivityIcon
              style={{
                marginTop: 4,
                marginLeft: 10,
              }}
            />
          }
          text="Actividad"
          onPress={handleActividadPress}
        />
        <ProfileOption
          iconComponent={
            <PersonalDataIcon
              style={{
                marginTop: 3,
                marginLeft: 10,
              }}
            />
          }
          text="Datos Personales"
          onPress={handleDatosPersonalesPress}
        />
        <ProfileOption
          iconComponent={
            <HelpIcon
              style={{
                marginTop: 4,
                marginLeft: 10,
              }}
            />
          }
          text="Ayuda"
          onPress={handleAyudaPress}
        />
      </View>
      <FooterDoc current="profile" />
    </View>
  );
};
