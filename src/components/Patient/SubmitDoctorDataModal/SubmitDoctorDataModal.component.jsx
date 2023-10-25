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
        name="direccion"
        render={({field}) => (
          <StyledInput
            error={errors.direccion?.message}
            label="Direccion"
            field={field}
            name="direccion"
          />
        )}
        rules={{
          required: 'La dirección es obligatoria',
          validate: value => {
            const words = value.split(' ');
            if (words.length < 4) {
              return 'El formato de la dirección debe verse así: "Calle altura barrio ciudad" (ejemplo: "Av Rivadavia 5500 Caballito CABA")';
            }
            return true;
          },
        }}
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
