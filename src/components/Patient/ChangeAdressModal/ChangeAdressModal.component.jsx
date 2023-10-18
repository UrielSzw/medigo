/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './ChangeAdressModal.styles';

export const ChangeAdressModal = ({userData, setOpenModal}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    setOpenModal(false);
  };

  return (
    <View style={styles.contentWrapper}>
      <StyledText>Direccion</StyledText>
      <Controller
        control={control}
        name="addressPreview"
        defaultValue=""
        rules={{
          required: 'La dirección es obligatoria',
        }}
        render={({field}) => (
          <TextInput
            placeholder={userData.address}
            value={field.value}
            onChangeText={field.onChange}
            style={{
              ...styles.input,
              borderColor: errors.addressPreview ? 'red' : 'grey',
            }}
          />
        )}
      />
      {errors?.addressPreview && (
        <StyledText color="red" size="sm">
          {errors?.addressPreview.message}
        </StyledText>
      )}
      <View>
        <StyledButton onPress={handleSubmit(onSubmit)}>Cambiar</StyledButton>

        <StyledButton variant="empty" onPress={() => setOpenModal(false)}>
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
