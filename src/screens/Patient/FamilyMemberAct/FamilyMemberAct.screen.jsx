import React from 'react';

import {styles} from './FamilyMemberAct.styles.js';
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

export const FamilyMemberAct = ({navigation}) => {
  const handleNavigateFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
      <View style={styles.selectDocContainer}>
        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <ActivityIcon />
            <StyledText bold size="md">
              Actividad de Federico
            </StyledText>
          </View>
          <DoctorListItem name="Frederick James" category="Kinesiologo" />
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            variant="primary"
            onPress={handleNavigateFamilyMembers}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
