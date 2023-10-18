import React from 'react';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterDoc,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {ActivityIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';
import {styles} from './ActivityDoc.style';

export const ActivityDoc = ({navigation}) => {
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  const handlePatDetails = () => {
    navigation.navigate(PATHS.PATINFOINDOC);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <View style={styles.selectDocContainer}>
        <WelcomePerfilHeader
          username="Dr Joseph Brostito"
          email="fedepr2345@gmail.com"
        />

        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <ActivityIcon />
            <StyledText bold size="md">
              Actividad
            </StyledText>
          </View>
          <DoctorListItem
            onPress={handlePatDetails}
            name="Joe Doe"
            category="Paciente"
          />
          <DoctorListItem
            onPress={handlePatDetails}
            name="Jane Doe"
            category="Paciente"
          />
          <StyledButton onPress={handleNavigateProfile} children="Volver" />
        </View>
      </View>
      <FooterDoc current="profile" />
    </View>
  );
};
