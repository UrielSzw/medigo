/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {styles} from './AppointmentConfirmed.styles';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';

const DOCTOR = {
  time: '15',
  price: '1700',
  reviews: '(120 reseñas)',
  rating: '4,8',
  name: 'Jorge',
  category: 'Clinico',
  dni: '36985214',
};

export const AppointmentConfirmed = ({
  logo,
  doctor = DOCTOR,
  setAppointmentState,
  setDoctorDetails,
}) => {
  const [count, setCount] = useState(120);
  const [disabled, setDisabled] = useState(false);

  const handleCancelAppoinment = async () => {
    try {
      const cancelRequest = 'cancelRequestEndpoint()';

      if (cancelRequest) {
        setAppointmentState(false);
        setDoctorDetails(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (count <= 0) {
      setDisabled(true);
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <View>
        <StyledText size="md" bold>
          Doctor en camino
        </StyledText>

        <View style={styles.wrapper}>
          <View style={styles.dataWrapper}>
            {logo ? logo : <DefaultProfile />}
            <View>
              <StyledText color="white" bold size="md">
                {doctor.name}
              </StyledText>
              <StyledText color="white">{doctor.category}</StyledText>
            </View>
          </View>
          <View style={styles.time}>
            <ClockIcon fill="#FFF" style={styles.icon} />
            <StyledText color="white">{doctor.time} m</StyledText>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <StyledText color="grey">
          Tiempo restante para cancelar: 2 minutos
        </StyledText>
        <StyledButton
          style={{opacity: disabled ? 0.3 : 1}}
          disabled={disabled}
          variant="warning"
          onPress={handleCancelAppoinment}>
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
