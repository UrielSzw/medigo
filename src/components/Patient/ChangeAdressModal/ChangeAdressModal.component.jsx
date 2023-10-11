import React from 'react';
import {TextInput, View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './ChangeAdressModal.styles';

export const ChangeAdressModal = ({
  userData,
  addressPreview,
  setAddressPreview,
  onSubmitAdress,
  setOpenModal,
}) => {
  return (
    <View style={styles.contentWrapper}>
      <StyledText>Direccion</StyledText>
      <TextInput
        placeholder={userData.address}
        value={addressPreview}
        onChangeText={text => setAddressPreview(text)}
        style={styles.input}
      />
      <View>
        <StyledButton onPress={onSubmitAdress}>Cambiar</StyledButton>

        <StyledButton variant="empty" onPress={() => setOpenModal(false)}>
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
