import React from 'react';
import {View} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {MoneyIcon, StarIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './DoctorDetails.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const DoctorDetails = ({
  setDoctorDetailsModal,
  handleRequestDoctor,
  doctor,
}) => {
  return (
    <View>
      <UserDataItem
        showTime
        time={doctor.tiempo}
        name={`${doctor.nombre} ${doctor.apellido}`}
        category={doctor.especialidad}
      />
      <View style={styles.info}>
        <View style={styles.infoReviews}>
          <StarIcon />
          <StyledText color="orange">{doctor.valoracion}</StyledText>
          <StyledText color="orange"> {doctor.resenas}</StyledText>
        </View>
        <View style={styles.infoPrice}>
          <MoneyIcon />
          <StyledText color="blue">{doctor.precio}</StyledText>
        </View>
      </View>
      <View style={styles.details}>
        <StyledText color="grey">Matricula: {doctor.nroMatricula}</StyledText>
        <StyledText color="grey">
          Especialidad: {doctor.especialidad}
        </StyledText>
      </View>
      <View style={styles.actions}>
        <StyledButton onPress={handleRequestDoctor}>
          Solicitar medico
        </StyledButton>
        <StyledButton
          variant="empty"
          onPress={() => setDoctorDetailsModal(false)}>
          Volver al listado
        </StyledButton>
      </View>
    </View>
  );
};
