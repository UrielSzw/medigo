import React from 'react';
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
import {styles} from './ActivityDoc.style';

export const ActivityDoc = ({navigation}) => {
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
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
          <DoctorListItem name="Joe Doe" category="Paciente" />
          <DoctorListItem name="Jane Doe" category="Paciente" />
          <StyledButton onPress={handleNavigateProfile} children="Volver" />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
