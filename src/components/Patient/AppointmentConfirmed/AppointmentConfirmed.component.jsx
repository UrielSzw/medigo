/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {removeDoctorDetails, setUserState} from '../../../redux/user.slice';
import {
  apiCancelDoctor,
  apiLastRequestState,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './AppointmentConfirmed.styles';
import {setModal} from '../../../utils/setModal';

const TOTAL_TIME = 1200;

export const AppointmentConfirmed = ({logo, setDoctorReviewModal}) => {
  const {doctorDetails} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleCancelAppoinment = async () => {
    try {
      setSpinner(true);
      const cancelRequest = await apiCancelDoctor();

      if (cancelRequest.state === 'cancelada') {
        dispatch(setUserState({appointmentState: false}));
        dispatch(removeDoctorDetails());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const checkIfAppointmentEnded = async () => {
    try {
      setSpinner(true);
      const response = await apiLastRequestState();

      if (response.result === 'cancelada') {
        dispatch(setUserState({appointmentState: false}));
        setModal({
          show: true,
          title: 'Consulta cancelada',
          message:
            'El medico cancelo la consulta. Puedes realizar una consulta nueva',
        });
      } else if (response.result === 'calificando') {
        dispatch(setUserState({appointmentState: false}));
        setDoctorReviewModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (count === TOTAL_TIME - 120) {
      setDisabled(true);
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count % 60 === 0) {
      checkIfAppointmentEnded();
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  useEffect(() => {
    setCount(TOTAL_TIME);
  }, []);

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
                {doctorDetails.name}
              </StyledText>
              <StyledText color="white">{doctorDetails.category}</StyledText>
            </View>
          </View>
          <View style={styles.time}>
            <ClockIcon fill="#FFF" style={styles.icon} />
            <StyledText color="white">{doctorDetails.time} m</StyledText>
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
