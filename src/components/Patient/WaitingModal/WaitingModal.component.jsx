/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {
  apiLastRequestState,
  apiListOfDoctors,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {
  addDoctorLicense,
  setListOfDoctorsData,
  setUserState,
} from '../../../redux/user.slice';
import {styles} from './WaitingModal.styles';
import {setModal} from '../../../utils/setModal';

export const WaitingModal = ({visible, setVisible, countNumber}) => {
  const {doctorDetails, requestDetails} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleDoctorRequestWait = async () => {
    try {
      console.log('count2');
      const requestDoctor = await apiLastRequestState();
      console.log('count3', requestDoctor);
      if (requestDoctor.result === 'en curso') {
        setSpinner(true);
        console.log('en curso');
        setVisible(false);
        dispatch(
          setUserState({appointmentState: true, listOfDoctorsState: false}),
        );
      } else if (requestDoctor.result === 'seleccionando medico') {
        setSpinner(true);
        console.log('seleccionando medico');
        dispatch(addDoctorLicense(doctorDetails.nroMatricula));

        const responseNewDoctors = await apiListOfDoctors(requestDetails);

        if (responseNewDoctors.result) {
          console.log('responseDoctors.result', responseNewDoctors.result);
          dispatch(setListOfDoctorsData(responseNewDoctors.result));
          setVisible(false);
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

  useEffect(() => {
    if (count <= 0) {
      setVisible(false);
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      if (count % 30 === 0) {
        console.log('count1', count);
        handleDoctorRequestWait();
      }
    }
  }, [count]);

  useEffect(() => {
    if (visible) {
      console.log('countNumber', countNumber);
      setCount(countNumber || 60);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent>
      <View style={styles.background}>
        <StyledText style={styles.text} color="white">
          {count}
        </StyledText>
      </View>
    </Modal>
  );
};
