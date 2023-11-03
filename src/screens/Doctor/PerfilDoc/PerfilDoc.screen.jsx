/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  FooterDoc,
  ProfileOption,
  StyledButton,
  WelcomePerfilHeader,
} from '../../../components';
import {HelpIcon, PersonalDataIcon, ActivityIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {clearAllDoctor} from '../../../redux/doctor.slice';
import {styles} from './PerfilDoc.styles';

export const PerfilDoc = ({navigation}) => {
  const dispatch = useDispatch();
  const handleActividadPress = () => {
    navigation.navigate(PATHS.ACTIVITYDOC);
  };

  const handleDatosPersonalesPress = () => {
    navigation.navigate(PATHS.PERSONALDATADOC);
  };

  const handleAyudaPress = () => {
    navigation.navigate(PATHS.HELPDOC);
  };

  const handleLogout = async () => {
    dispatch(clearAllDoctor());
  };

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
        <StyledButton
          variant="warning"
          style={styles.logout}
          onPress={handleLogout}>
          Logout
        </StyledButton>
      </View>
      <FooterDoc current="profile" />
    </View>
  );
};
