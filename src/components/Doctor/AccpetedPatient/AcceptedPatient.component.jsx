import React from 'react';
import {View} from 'react-native';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './AcceptedPatient.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const AcceptedPatient = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          <DefaultProfile />
          <StyledText bold size="md" color="white">
            User
          </StyledText>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon style={styles.icon} />
          <StyledText color="white">15 m</StyledText>
        </View>
      </View>
      <StyledButton onPress={onPress} variant="secondary">
        Abrir ubicación
      </StyledButton>
    </View>
  );
};
