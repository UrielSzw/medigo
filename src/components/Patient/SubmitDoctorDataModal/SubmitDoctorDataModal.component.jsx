/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyledInput} from '../../Common/StyledInput/StyledInput.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './SubmitDoctorDataModal.styles';

export const SubmitDoctorDataModal = ({
  control,
  especialidad,
  grupoFamiliar,
  setEspecialidadModal,
  setGrupoFamiliarModal,
  handleSubmit,
  onSubmit,
  setOpenMedicModal,
  errors,
  familyMembersOptions,
  setValue,
}) => {
  const {userData, requestData} = useSelector(state => state.userReducer);

  useEffect(() => {
    setValue('direccion', userData.direccion);
  }, [userData.direccion, setValue]);

  useEffect(() => {
    setValue('piso', userData.piso);
  }, [userData.piso, setValue]);

  useEffect(() => {
    setValue('departamento', userData.departamento);
  }, [userData.departamento, setValue]);

  return (
    <View style={styles.contentAskMedicWrapperScroll}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
        <Controller
          control={control}
          defaultValue={requestData?.motivo}
          name="motivo"
          render={({field}) => (
            <StyledInput
              error={errors.motivo?.message}
              label="Motivo"
              field={field}
              name="motivo"
            />
          )}
          rules={{required: 'El motivo es obligatorio'}}
        />
        <Controller
          control={control}
          defaultValue={requestData?.sintomas}
          name="sintomas"
          render={({field}) => (
            <StyledInput
              error={errors.sintomas?.message}
              label="Sintomas"
              field={field}
              name="sintomas"
            />
          )}
          rules={{required: 'Los sintomas son obligatorios'}}
        />
        <View>
          <StyledText>Especialidad</StyledText>
          <StyledButton
            style={errors?.especialidad && {borderColor: 'red'}}
            variant="empty"
            onPress={() => setEspecialidadModal(true)}>
            {especialidad}
          </StyledButton>
          {errors?.especialidad && (
            <StyledText size="sm" color="red">
              {errors?.especialidad.message}
            </StyledText>
          )}
        </View>

        <View>
          <StyledText>Miembro del grupo familiar</StyledText>
          <StyledButton
            style={errors?.familyGroup && {borderColor: 'red'}}
            variant="empty"
            disabled={familyMembersOptions.length === 1}
            onPress={() => setGrupoFamiliarModal(true)}>
            {familyMembersOptions.length === 1
              ? familyMembersOptions
              : grupoFamiliar}
          </StyledButton>
          {errors?.familyGroup && (
            <StyledText size="sm" color="red">
              {errors?.familyGroup.message}
            </StyledText>
          )}
        </View>

        <Controller
          control={control}
          name="direccion"
          defaultValue={userData.direccion}
          render={({field}) => (
            <StyledInput
              error={errors.direccion?.message}
              label="Direccion completa"
              field={field}
              name="direccion"
            />
          )}
          rules={{
            required: 'La dirección es obligatoria',
          }}
        />

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
          render={({field}) => (
            <StyledInput
              error={errors.ciudad?.message}
              label="Ciudad"
              field={field}
              name="ciudad"
            />
          )}
          rules={{
            required: 'La ciudad es obligatoria',
          }}
        />

        <Controller
          control={control}
          name="codigoPostal"
          defaultValue={userData.codigoPostal}
          render={({field}) => (
            <StyledInput
              error={errors.codigoPostal?.message}
              label="Codigo Postal"
              keyboardType="numeric"
              field={field}
              name="codigoPostal"
            />
          )}
          rules={{
            required: 'El codigo postal es obligatorio',
          }}
        />
        <View style={styles.buttonsWrapper}>
          <StyledButton onPress={handleSubmit(onSubmit)}>
            Ver medicos disponibles
          </StyledButton>

          <StyledButton
            variant="empty"
            onPress={() => setOpenMedicModal(false)}>
            Cancelar
          </StyledButton>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
