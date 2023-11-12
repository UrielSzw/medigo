import React from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {setUserData} from '../../../redux/user.slice';
import {apiPatientUpdate} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './ChangeAdressModal.styles';
import {StyledInput} from '../../Common/StyledInput/StyledInput.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      setSpinner(true);
      const response = await apiPatientUpdate(data);
      if (response.success) {
        dispatch(setUserData(data));
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentWrapper}>
      <Controller
        control={control}
        name="direccion"
        defaultValue={userData.direccion}
        rules={{
          required: 'La dirección es obligatoria',
        }}
        render={({field}) => (
          <StyledInput
            error={errors.direccion?.message}
            label="Direccion"
            field={field}
            name="direccion"
          />
        )}
      />
      {errors?.direccion && (
        <StyledText color="red" size="sm">
          {errors?.direccion.message}
        </StyledText>
      )}
      <Controller
        control={control}
        name="piso"
        defaultValue={userData.piso}
        render={({field}) => (
          <StyledInput
            error={errors.piso?.message}
            label="Piso (opcional)"
            field={field}
            name="piso"
          />
        )}
      />

      <Controller
        control={control}
        name="departamento"
        defaultValue={userData.departamento}
        render={({field}) => (
          <StyledInput
            error={errors.departamento?.message}
            label="Departamento (opcional)"
            field={field}
            name="departamento"
          />
        )}
      />

      <Controller
        control={control}
        name="ciudad"
        defaultValue={userData.ciudad}
        rules={{
          required: 'La ciudad es obligatoria',
        }}
        render={({field}) => (
          <StyledInput
            label="Ciudad"
            field={field}
            name="ciudad"
            error={errors.ciudad?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="codigoPostal"
        defaultValue={userData.codigoPostal}
        rules={{
          required: 'El codigo postal es obligatorio',
        }}
        render={({field}) => (
          <StyledInput
            label="Codigo postal"
            keyboardType="numeric"
            field={field}
            name="codigoPostal"
            error={errors.codigoPostal?.message}
          />
        )}
      />
      <View>
        <StyledButton onPress={handleSubmit(onSubmit)}>Cambiar</StyledButton>

        <StyledButton variant="empty" onPress={toggleModal}>
          Cancelar
        </StyledButton>
      </View>
    </KeyboardAwareScrollView>
  );
};
