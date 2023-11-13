/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {
  apiLastRequestState,
  apiListOfDoctors,
  apiRemoveRequest,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {
  addDoctorLicense,
  setListOfDoctorsData,
  setUserState,
  setWaitingCount,
  setWaitingModal,
} from '../../../redux/user.slice';
import {styles} from './WaitingModal.styles';
import {setModal} from '../../../utils/setModal';
import {calculateTimeDifference} from '../../../utils/commonMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WaitingModal = () => {
  const {doctorDetails, requestDetails, waitingCount, waitingModal} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [endCount, setEndCount] = useState(false);
  const [count, setCount] = useState(-1);

  const handleDoctorRequestWait = async () => {
    try {
      const requestDoctor = await apiLastRequestState();
      if (requestDoctor.result === 'en curso') {
        setSpinner(true);
        dispatch(setWaitingModal(false));
        dispatch(
          setUserState({appointmentState: true, listOfDoctorsState: false}),
        );
        setEndCount(true);
      } else if (requestDoctor.result === 'rechazada') {
        setSpinner(true);
        dispatch(addDoctorLicense(doctorDetails.nroMatricula));

        const responseNewDoctors = await apiListOfDoctors(requestDetails);

        if (responseNewDoctors.result) {
          dispatch(setListOfDoctorsData(responseNewDoctors.result));
          dispatch(setWaitingModal(false));
          setEndCount(true);
          setModal({
            show: true,
            title: 'Consulta rechazada',
            message:
              'El medico rechazo la consulta. Puedes seleccionar otro medico',
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const handleRequestTimeOver = async () => {
    try {
      setSpinner(true);
      dispatch(addDoctorLicense(doctorDetails.nroMatricula));

      const result = await apiRemoveRequest();

      if (result.state === 'cancelada') {
        const responseNewDoctors = await apiListOfDoctors(requestDetails);

        if (responseNewDoctors.result) {
          dispatch(setListOfDoctorsData(responseNewDoctors.result));
          dispatch(setWaitingCount('0'));
          dispatch(setWaitingModal(false));
          setModal({
            show: true,
            title: 'Medico no respondio',
            message:
              'El medico no respondio a la consulta. Puedes seleccionar otro medico',
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (waitingModal) {
        if (count > 0) {
          setTimeout(() => {
            setCount(count - 1);
          }, 1000);
        }

        if (count === 0 || count < -1) {
          await handleRequestTimeOver();
        } else if (endCount) {
          setCount(-1);
          setEndCount(false);
        } else if (count % 4 === 0) {
          await handleDoctorRequestWait();
        }
      }
    };
    fetchData();
  }, [count]);

  const handleDoctorRequestWaitWithToken = async () => {
    try {
      const tokenUsuarioSaved = await AsyncStorage.getItem('tokenUsuario');
      if (tokenUsuarioSaved) {
        await handleDoctorRequestWait();
      }
    } catch (error) {
      console.error('Error fetching token or making API call:', error);
    }
  };

  useEffect(() => {
    const firstLoad = async () => {
      if (waitingModal && waitingCount.length > 4) {
        const time = new Date(waitingCount);
        const timeLeft = calculateTimeDifference(time, 70);

        if (timeLeft < 0) {
          setSpinner(true);
          await handleDoctorRequestWaitWithToken();
        }

        setCount(timeLeft);
      }
    };
    firstLoad();
  }, [waitingModal, waitingCount]);

  if (!waitingModal) {
    return null;
  }

  return (
    <Modal visible={waitingModal} transparent>
      <View style={styles.background}>
        <StyledText style={styles.text} color="white">
          {count}
        </StyledText>
      </View>
    </Modal>
  );
};
