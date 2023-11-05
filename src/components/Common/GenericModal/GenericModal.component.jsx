/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {StyledModal} from '../StyledModal/StyledModal.component';
import {StyledText} from '../StyledText/StyledText.component';
import {StyledButton} from '../StyledButton/StyledButton.component';
import {setModal} from '../../../utils/setModal';

export const GenericModal = () => {
  const {genericModal} = useSelector(state => state.commonReducer);
  return (
    <StyledModal
      open={genericModal.show}
      title={genericModal.title}
      content={
        <View style={{gap: 40}}>
          <StyledText style={{textAlign: 'center'}}>
            {genericModal.message}
          </StyledText>
          <StyledButton
            variant="warning"
            onPress={() => setModal({title: '', message: '', show: false})}>
            Cerrar
          </StyledButton>
        </View>
      }
    />
  );
};
