import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {MoneyIcon, StarIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {formatTime} from '../../../utils/commonMethods';
import {styles} from './DoctorDetails.styles';

export const DoctorDetails = ({setDoctorDetailsModal, handleRequestDoctor}) => {
  const {doctorDetails} = useSelector(state => state.userReducer);
  return (
    <View>
      <UserDataItem
        showTime
        time={formatTime(doctorDetails?.tiempo)}
        name={`${doctorDetails?.nombre} ${doctorDetails?.apellido}`}
        category={doctorDetails?.especialidad}
      />
      <View style={styles.info}>
        <View style={styles.infoReviews}>
          <StarIcon />
          <StyledText color="orange">{doctorDetails?.valoracion} </StyledText>
          <StyledText color="orange">
            ({doctorDetails?.resenas} reseñas)
          </StyledText>
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
