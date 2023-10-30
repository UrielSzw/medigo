import React from 'react';
import {View} from 'react-native';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './PatientDetailsModal.styles';

export const PatientDetailsModal = ({handlePatientRequestResponse}) => {
  return (
    <View>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          <DefaultProfile />
          <View>
            <StyledText bold size="md">
              User
            </StyledText>
            <StyledText color="grey">Pacietne</StyledText>
          </View>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon fill="#8696BB" style={styles.icon} />
          <StyledText color="grey">15 m</StyledText>
        </View>
      </View>
      <View style={styles.detailsWrapper}>
        <Rating rating={4} readOnly />
        <StyledText color="grey" size="default">
          DNI: 22222222
        </StyledText>
        <StyledText color="grey" size="default">
          Miembro familiar: Joe Doe
        </StyledText>
        <StyledText color="grey" size="default">
          Ubicacion de atencion: Av Corrientes 4251
        </StyledText>
        <View>
          <StyledText color="grey" size="default">
            Motivo:
          </StyledText>
          <StyledText color="grey" size="default">
            - Siento mucho dolor en el codo cuando me toco o hago algun
            movimiento leve
          </StyledText>
        </View>
        <StyledText color="grey" size="default">
          Sintomas: molestia en el codo
        </StyledText>
      </View>
      <StyledButton onPress={() => handlePatientRequestResponse(true)}>
        Acceptar
      </StyledButton>
      <StyledButton
        style={styles.button}
        variant="secondary"
        onPress={() => handlePatientRequestResponse(false)}>
        Rechazar
      </StyledButton>
    </View>
  );
};
