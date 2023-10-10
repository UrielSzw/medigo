import React from 'react';

import {styles} from './FamilyMembers.styles.js';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {FamilyIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';

export const FamilyMembers = ({navigation}) => {
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
      <View style={styles.selectDocContainer}>
        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <FamilyIcon />
            <StyledText bold size="md">
              Miembros Familiares
            </StyledText>
          </View>
          <DoctorListItem
            buttonText="Ver actividad"
            name="Federico"
            category="Hijo"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleNavigateProfile} children="Confirmar" />

          <StyledButton
            variant="secondary"
            onPress={handleNavigateProfile}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
