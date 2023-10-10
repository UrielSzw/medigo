import React from 'react';

import {styles} from './HelpPat.styles.js';
import {View, ScrollView} from 'react-native';
import {
  DropdownInfo,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {HelpIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';

export const HelpPat = ({navigation}) => {
  const handleNavigateProfilePat = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
      <View style={styles.selectDocContainer}>
        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <HelpIcon />
            <StyledText bold size="md">
              Ayuda
            </StyledText>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.dropDownContentContainer}
          style={styles.dropDownWrapper}>
          <DropdownInfo />
          <DropdownInfo />
          <DropdownInfo />
          <DropdownInfo />
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <StyledButton
            variant="primary"
            onPress={handleNavigateProfilePat}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
