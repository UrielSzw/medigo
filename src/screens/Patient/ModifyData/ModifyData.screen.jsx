import React from 'react';
import {View} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './ModifyData.styles';

export const ModifyData = ({navigation}) => {
  const handleBackPersonalData = () => {
    navigation.navigate(PATHS.PERSONALDATA);
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
          <StyledInput
            style={styles.inputStyle}
            label="Email"
            placeholder="joedoe@gmail.com"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleBackPersonalData} children="Confirmar" />

          <StyledButton
            variant="secondary"
            onPress={handleBackPersonalData}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient />
    </View>
  );
};
