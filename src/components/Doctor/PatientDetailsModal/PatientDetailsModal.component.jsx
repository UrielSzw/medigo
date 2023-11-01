import React from 'react';
import {View} from 'react-native';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './PatientDetailsModal.styles';
import {calculateAge} from '../../../utils/commonMethods';

export const PatientDetailsModal = ({
  handlePatientRequestResponse,
  request,
}) => {
  return (
    <View>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          <DefaultProfile />
          <View>
            <StyledText bold size="md">
              {`${request.nombre} ${request.apellido}`}
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
          Sexo: {request.sexo}
        </StyledText>
        <StyledText color="grey" size="default">
          Edad: {calculateAge(request.fechaNacimiento)}
        </StyledText>
        <StyledText color="grey" size="default">
          Ubicacion de atencion: {request.direccion}
        </StyledText>
        <View>
          <StyledText color="grey" size="default">
            Motivo:
          </StyledText>
          <StyledText color="grey" size="default">
            {request.motivo}
          </StyledText>
        </View>
        <StyledText color="grey" size="default">
          Sintomas: {request.sintomas}
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
