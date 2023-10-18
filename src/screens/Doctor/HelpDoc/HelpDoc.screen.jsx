import React from 'react';
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
import {styles} from './HelpDoc.styles';

export const HelpDoc = ({navigation}) => {
  const handleNavigateProfileDoc = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <WelcomePerfilHeader
        username="Dr.Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
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
            onPress={handleNavigateProfileDoc}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
