/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FooterDoc,
  WelcomePerfilHeader,
  StyledText,
  StyledInput,
  StyledButton,
  DropdownSelect,
} from '../../../components';
import {styles} from './ModifyPersonalData.styles';
import {PersonalDataIcon} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {setSpinner} from '../../../utils/setSpinner';
import {apiDoctorsUpdate} from '../../../utils/api/doctorRoutes';
import {setDoctorData} from '../../../redux/doctor.slice';
import {PATHS} from '../../../routes/paths';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../../utils/commonMethods';

export const ModifyPersonalDataDoc = () => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {especialidades} = useSelector(state => state.commonReducer);
  const [especialidad, setEspecialidad] = useState(doctorData.especialidad);
  const [especialidadModal, setEspecialidadModal] = useState(false);

  const onSubmit = async data => {
    if (data) {
      try {
        setSpinner(true);
        const response = await apiDoctorsUpdate({...data, especialidad});

        if (response.success) {
          dispatch(setDoctorData({...data, especialidad}));
          navigation.navigate(PATHS.PERSONALDATADOC);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSpinner(false);
      }
    }
  };

  const handleBackActivity = () => {
    navigation.navigate(PATHS.PERSONALDATADOC);
  };

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username={`${doctorData.nombre} ${doctorData.apellido}`}
        email={doctorData.username}
      />

      <View style={styles.detailsContainer}>
        <PersonalDataIcon />
        <StyledText bold>Datos personales</StyledText>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.inputContent}
        style={styles.inputWrapper}>
        <Controller
          control={control}
          name="sexo"
          defaultValue={doctorData.sexo[0]}
          rules={{
            required: 'El sexo es obligatorio',
            validate: {
              validSex: value =>
                ['M', 'F', 'O'].includes(value) || 'Ingresa M, F o O',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Sexo (M / F / O)"
              style={styles.input}
              name="sexo"
              error={errors.sexo?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          defaultValue={doctorData.username}
          rules={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Email"
              keyboardType="email-address"
              defaultValue={doctorData.username}
              autoCapitalize="none"
              style={styles.input}
              field={field}
              name="username"
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="fechaNacimiento"
          defaultValue={formatDate(doctorData.fechaNacimiento)}
          rules={{
            required: 'La fecha de nacimiento es obligatoria',
            validate: {
              validDate: value => {
                if (!value) {
                  return 'La fecha de nacimiento es obligatoria';
                }
                const datePattern = /^\d{2}-\d{2}-\d{4}$/;
                if (!datePattern.test(value)) {
                  return 'El formato de fecha no es válido (DD-MM-YYYY)';
                }

                const parts = value.split('-');
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);

                if (
                  isNaN(day) ||
                  isNaN(month) ||
                  isNaN(year) ||
                  month < 1 ||
                  month > 12 ||
                  day < 1 ||
                  day > 31
                ) {
                  return 'La fecha no es válida (DD-MM-YYYY)';
                }

                const currentDate = new Date();

                const eighteenYearsAgo = currentDate.getFullYear() - 18 < year;

                const oneHundredTwentyYearsAgo =
                  year >= currentDate.getFullYear() - 120;

                if (eighteenYearsAgo) {
                  return 'Debe ser mayor de 18 años';
                }

                if (!oneHundredTwentyYearsAgo) {
                  return 'Debe ser menor de 120 años';
                }

                return true;
              },
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Fecha de nacimiento (DD-MM-YYYY)"
              style={styles.input}
              name="fechaNacimiento"
              error={errors.fechaNacimiento?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="telefono"
          defaultValue={doctorData.telefono}
          rules={{
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^[0-9]{9,10}$/,
              message: 'Número de teléfono inválido',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Teléfono"
              keyboardType="numeric"
              style={styles.input}
              field={field}
              name="telefono"
              error={errors.telefono?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="direccion"
          defaultValue={doctorData.direccion}
          rules={{
            required: 'La dirección es obligatoria',
            validate: address => {
              const regex = /^(?=.*[a-zA-Z])(?=.*\d).+/;
              const isValid = regex.test(address);
              const hasRightAv = /avda|avenida/i.test(address);

              if (!isValid) {
                return 'La dirección debe contener calle y altura';
              }

              if (hasRightAv) {
                return 'La avenida debe escribirse como "Av" o "Av."';
              }

              return true;
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Dirección"
              style={styles.input}
              field={field}
              name="direccion"
              error={errors.direccion?.message}
            />
          )}
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
        <Controller
          control={control}
          name="precio"
          defaultValue={doctorData.precio}
          rules={{
            required: 'El precio es obligatorio',
            validate: {
              isNumber: value =>
                !isNaN(parseFloat(value)) || 'El precio debe ser un número',
              greaterThan1000: value =>
                parseFloat(value) >= 1000 || 'El precio debe ser mayor a 1000',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Precio"
              style={styles.input}
              keyboardType="numeric"
              field={field}
              name="precio"
              error={errors.precio?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="radioAccion"
          defaultValue={doctorData.radioAccion}
          rules={{
            required: 'El radio de acción es obligatorio',
            validate: {
              isNumber: value =>
                !isNaN(parseFloat(value)) ||
                'El radio de acción debe ser un número',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Radio de acción (KM)"
              style={styles.input}
              keyboardType="numeric"
              field={field}
              name="radioAccion"
              error={errors.radioAccion?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="nroMatricula"
          defaultValue={doctorData.nroMatricula}
          rules={{
            required: 'El número de matrícula es obligatorio',
          }}
          render={({field}) => (
            <StyledInput
              label="Número de matrícula"
              style={styles.input}
              keyboardType="numeric"
              field={field}
              name="nroMatricula"
              error={errors.nroMatricula?.message}
            />
          )}
        />
        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleSubmit(onSubmit)}>
            Confirmar
          </StyledButton>

          <StyledButton variant="secondary" onPress={handleBackActivity}>
            Volver
          </StyledButton>
        </View>
      </KeyboardAwareScrollView>

      <FooterDoc current="profile" />

      <DropdownSelect
        dropdownValue={especialidad}
        setDropdownValue={setEspecialidad}
        title="Seleciona una especialidad"
        options={especialidades}
        visible={especialidadModal}
        setVisible={() => setEspecialidadModal(false)}
      />
    </View>
  );
};
