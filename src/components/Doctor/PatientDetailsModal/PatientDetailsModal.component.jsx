import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {calculateAge, formatTime} from '../../../utils/commonMethods';
import {styles} from './PatientDetailsModal.styles';

export const PatientDetailsModal = ({handlePatientRequestResponse}) => {
  const {requestData} = useSelector(state => state.doctorReducer);
  return (
    <View>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          <DefaultProfile />
          <View>
            <StyledText bold size="md">
              {`${requestData.nombre} ${requestData.apellido}`}
            </StyledText>
            <StyledText color="grey">Paciente</StyledText>
          </View>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon fill="#8696BB" style={styles.icon} />
          <StyledText color="grey">
            {formatTime(Number(requestData.tiempoLlegada))} m
          </StyledText>
        </View>
      </View>
      <View style={styles.detailsWrapper}>
        <Rating rating={4} readOnly />
        <StyledText color="grey" size="default">
          Sexo: {requestData.sexo}
        </StyledText>
        <StyledText color="grey" size="default">
          Edad: {calculateAge(requestData.fechaNacimiento)}
        </StyledText>
        <StyledText color="grey" size="default">
          Ubicacion de atencion: {requestData.direccion}
        </StyledText>
        <StyledText color="grey" size="default">
          Piso: {requestData.piso || 'No especifica'}
        </StyledText>
        <StyledText color="grey" size="default">
          Departamento: {requestData.departamento || 'No especifica'}
        </StyledText>
        <View>
          <StyledText color="grey" size="default">
            Motivo:
          </StyledText>
          <StyledText color="grey" size="default">
            {requestData.motivo}
          </StyledText>
        </View>
        <StyledText color="grey" size="default">
          Sintomas: {requestData.sintomas}
        </StyledText>
      </View>
      <StyledButton onPress={() => handlePatientRequestResponse(true)}>
        Aceptar
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
