import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {MoneyIcon, StarIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './DoctorDetails.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const DoctorDetails = ({setDoctorDetailsModal, handleRequestDoctor}) => {
  const {doctorDetails} = useSelector(state => state.userReducer);
  return (
    <View>
      <UserDataItem
        showTime
        time={doctorDetails?.tiempo}
        name={`${doctorDetails?.nombre} ${doctorDetails?.apellido}`}
        category={doctorDetails?.especialidad}
      />
      <View style={styles.info}>
        <View style={styles.infoReviews}>
          <StarIcon />
          <StyledText color="orange">{doctorDetails?.valoracion}</StyledText>
          <StyledText color="orange"> {doctorDetails?.resenas}</StyledText>
        </View>
        <View style={styles.infoPrice}>
          <MoneyIcon />
          <StyledText color="blue">{doctorDetails?.precio}</StyledText>
        </View>
      </View>
      <View style={styles.details}>
        <StyledText color="grey">
          Matricula: {doctorDetails?.nroMatricula}
        </StyledText>
        <StyledText color="grey">
          Especialidad: {doctorDetails?.especialidad}
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
