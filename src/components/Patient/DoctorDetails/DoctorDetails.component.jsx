import React from 'react';
import {View} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {MoneyIcon, StarIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './DoctorDetails.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const DoctorDetails = ({
  setDoctorDetailsModal,
  setOpenWaiting,
  doctor,
}) => {
  return (
    <View>
      <UserDataItem
        showTime
        time={doctor.time}
        name={doctor.name}
        category={doctor.category}
      />
      <View style={styles.info}>
        <View style={styles.infoReviews}>
          <StarIcon />
          <StyledText color="orange">{doctor.rating}</StyledText>
          <StyledText color="orange"> {doctor.reviews}</StyledText>
        </View>
        <View style={styles.infoPrice}>
          <MoneyIcon />
          <StyledText color="blue">{doctor.price}</StyledText>
        </View>
      </View>
      <View style={styles.details}>
        <StyledText color="grey">DNI: {doctor.dni}</StyledText>
        <StyledText color="grey">Especialidad: {doctor.category}</StyledText>
      </View>
      <View style={styles.actions}>
        <StyledButton onPress={() => setOpenWaiting(true)}>
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
