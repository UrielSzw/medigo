/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './WaitingModal.styles';

export const WaitingModal = ({visible, setVisible}) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (count <= 0) {
      setVisible(false);
    } else {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

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
