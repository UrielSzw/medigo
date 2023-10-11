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
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentAskMedicWrapperScroll}>
      <Controller
        control={control}
        name="motive"
        render={({field}) => (
          <StyledInput label="Motivo" field={field} name="motive" />
        )}
      />
      <Controller
        control={control}
        name="symptoms"
        render={({field}) => (
          <StyledInput label="Sintomas" field={field} name="symptoms" />
        )}
      />
      <View>
        <StyledText>Especialidad</StyledText>
        <StyledButton
          variant="empty"
          onPress={() => setEspecialidadModal(true)}>
          {especialidad}
        </StyledButton>
      </View>

      <View>
        <StyledText>Miembro del grupo familiar</StyledText>
        <StyledButton
          variant="empty"
          onPress={() => setGrupoFamiliarModal(true)}>
          {grupoFamiliar}
        </StyledButton>
      </View>

      <Controller
        control={control}
        name="address"
        render={({field}) => (
          <StyledInput label="Direccion" field={field} name="address" />
        )}
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
