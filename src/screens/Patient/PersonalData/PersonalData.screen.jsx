import React from 'react';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  UserDataItem,
  WelcomePerfilHeader,
} from '../../../components';
import {View} from 'react-native';

import {styles} from './PersonalData.styles';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';

export const PersonalData = ({navigation}) => {
  const handleBackActivity = () => {
    navigation.navigate(PATHS.ACTIVITYPAT);
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
      <View style={styles.infoDocContainer}>
        <View style={styles.textsContainer}>
          <View style={styles.detailsContainer}>
            <PersonalDataIcon />
            <StyledText bold>Datos personales</StyledText>
          </View>
          <StyledText color="grey" size="default">
            DNI: 22222222
          </StyledText>
          <StyledText color="grey" size="default">
            Telefono: 11 3333 3333
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            onPress={handleBackActivity}
            children="Modificar datos"
          />

          <StyledButton
            variant="secondary"
            onPress={handleBackActivity}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient />
    </View>
  );
};