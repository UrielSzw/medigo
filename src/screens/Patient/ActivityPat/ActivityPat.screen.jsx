import React from 'react';

import {styles} from './ActivityPat.styles.js';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {ActivityIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';

export const ActivityPat = ({navigation}) => {
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <View style={styles.selectDocContainer}>
        <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />

        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <ActivityIcon />
            <StyledText bold size="md">
              Actividad
            </StyledText>
          </View>
          <DoctorListItem name="Dr. Joseph Brostito" category="Kinesiologo" />
          <DoctorListItem name="Dr. Frederick James" category="Kinesiologo" />
          <StyledButton onPress={handleNavigateProfile} children="Volver" />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
