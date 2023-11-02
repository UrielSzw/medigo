import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledSwitch} from '../../Common/Switch/Switch.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './EndAppointmentModal.styles';

export const EndAppointmentModal = ({
  setIsSuccessful,
  isSuccessful,
  handleEndAppointment,
}) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <StyledText>Consulta exitosa: </StyledText>
        <StyledSwitch setIsChecked={setIsSuccessful} isChecked={isSuccessful} />
      </View>
      <StyledButton onPress={handleEndAppointment}>Confirmar</StyledButton>
    </View>
  );
};
