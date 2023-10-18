import React from 'react';
import {View} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {MoneyIcon, StarIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './DoctorDetails.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

export const DoctorDetails = ({setDoctorDetailsModal, setOpenWaiting}) => {
  return (
    <View>
      <UserDataItem showTime time={'15'} name={'Nombre'} category={'Clinico'} />
      <View style={styles.info}>
        <View style={styles.infoReviews}>
          <StarIcon />
          <StyledText color="orange">4,5</StyledText>
          <StyledText color="orange"> (12 reseñas)</StyledText>
        </View>
        <View style={styles.infoPrice}>
          <MoneyIcon />
          <StyledText color="blue">2500</StyledText>
        </View>
      </View>
      <View style={styles.details}>
        <StyledText color="grey">DNI: 33333333</StyledText>
        <StyledText color="grey">Especialidad: Clinico</StyledText>
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
