/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
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
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentAskMedicWrapperScroll}>
      <Controller
        control={control}
        name="motive"
        render={({field}) => (
          <StyledInput
            error={errors.motive?.message}
            label="Motivo"
            field={field}
            name="motive"
          />
        )}
        rules={{required: 'El motivo es obligatorio'}}
      />
      <Controller
        control={control}
        name="symptoms"
        render={({field}) => (
          <StyledInput
            error={errors.symptoms?.message}
            label="Sintomas"
            field={field}
            name="symptoms"
          />
        )}
        rules={{required: 'Los sintomas son obligatorios'}}
      />
      <View>
        <StyledText>Especialidad</StyledText>
        <StyledButton
          style={errors?.familyGroup && {borderColor: 'red'}}
          variant="empty"
          onPress={() => setEspecialidadModal(true)}>
          {especialidad}
        </StyledButton>
        {errors?.specialty && (
          <StyledText size="sm" color="red">
            {errors?.specialty.message}
          </StyledText>
        )}
      </View>

      <View>
        <StyledText>Miembro del grupo familiar</StyledText>
        <StyledButton
          style={errors?.familyGroup && {borderColor: 'red'}}
          variant="empty"
          onPress={() => setGrupoFamiliarModal(true)}>
          {grupoFamiliar}
        </StyledButton>
        {errors?.familyGroup && (
          <StyledText size="sm" color="red">
            {errors?.familyGroup.message}
          </StyledText>
        )}
      </View>

      <Controller
        control={control}
        name="address"
        render={({field}) => (
          <StyledInput
            error={errors.address?.message}
            label="Direccion"
            field={field}
            name="address"
          />
        )}
        rules={{required: 'La dirección es obligatoria'}}
      />
      <View style={styles.buttonsWrapper}>
        <StyledButton onPress={handleSubmit(onSubmit)}>
          Ver medicos disponibles
        </StyledButton>

        <StyledButton variant="empty" onPress={() => setOpenMedicModal(false)}>
          Cancelar
        </StyledButton>
      </View>
    </KeyboardAwareScrollView>
  );
};
