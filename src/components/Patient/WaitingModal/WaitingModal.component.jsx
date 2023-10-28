/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './WaitingModal.styles';

export const WaitingModal = ({visible, setVisible}) => {
  const [count, setCount] = useState(0);

  const handleDoctorRequestWait = async () => {
    try {
      //Consultar estado de request
      const requestDoctor = 'requestDoctorWait()';
      if (requestDoctor === 'exito') {
        console.log('exito');
        setVisible(false);
      } else if (requestDoctor === 'fallo') {
        console.log('fallo');
        setVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (count <= 0) {
      setVisible(false);
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      if (count % 10 === 0) {
        handleDoctorRequestWait();
      }
    }
  }, [count]);

  useEffect(() => {
    if (visible) {
      setCount(60);
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
