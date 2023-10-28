/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './ChangeAdressModal.styles';
import {setUserData} from '../../../redux/user.slice';
import {apiPatientUpdate} from '../../../utils/api/patientRoutes';

export const ChangeAdressModal = ({toggleModal}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const onSubmit = async data => {
    try {
      console.log(data);
      const response = await apiPatientUpdate(data);
      if (response) {
        dispatch(setUserData(data));
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.contentWrapper}>
      <StyledText>Direccion</StyledText>
      <Controller
        control={control}
        name="direccion"
        defaultValue=""
        rules={{
          required: 'La dirección es obligatoria',
        }}
        render={({field}) => (
          <TextInput
            placeholder={userData.direccion}
            value={field.value}
            onChangeText={field.onChange}
            style={{
              ...styles.input,
              borderColor: errors.direccion ? 'red' : 'grey',
            }}
          />
        )}
      />
      {errors?.direccion && (
        <StyledText color="red" size="sm">
          {errors?.direccion.message}
        </StyledText>
      )}
      <View>
        <StyledButton onPress={handleSubmit(onSubmit)}>Cambiar</StyledButton>

        <StyledButton variant="empty" onPress={toggleModal}>
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
