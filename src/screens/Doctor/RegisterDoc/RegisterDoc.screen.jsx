/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, ScrollView, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {
  Banner,
  DropdownSelect,
  StyledButton,
  StyledInput,
  StyledText,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {MedigoLogoIcon} from '../../../assets';
import {apiDoctorsRegister} from '../../../utils/api/doctorRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './RegisterDoc.styles';
import {setModal} from '../../../utils/setModal';

export const RegisterDoc = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm();
  const {especialidades} = useSelector(state => state.commonReducer);
  const [especialidad, setEspecialidad] = useState('Seleccione especialidad');
  const [especialidadModal, setEspecialidadModal] = useState(false);

  const onSubmit = async data => {
    if (data) {
      if (especialidad === 'Seleccione especialidad') {
        setError('especialidad', {
          type: 'manual',
          message: 'La especialidad es obligatoria',
        });
        return;
      }
      try {
        setSpinner(true);
        const response = await apiDoctorsRegister(data);

        if (!response.success) {
          setModal({
            title: 'El email escrito ya existe',
            message: 'El email ya esta en uso, intente ingresar otro email',
            show: true,
          });
        } else if (response.success) {
          navigation.navigate(PATHS.LOGIN);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSpinner(false);
      }
    }
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  useEffect(() => {
    if (especialidad !== 'Seleccione especialidad') {
      clearErrors('especialidad');
    }
  }, [especialidad]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Banner />
      <View style={styles.body}>
        <ScrollView style={styles.bodyWrapper}>
          <Controller
            control={control}
            name="nombre"
            rules={{
              required: 'El nombre es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                field={field}
                label="Nombre"
                style={styles.input}
                name="nombre"
                error={errors.nombre?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="apellido"
            rules={{
              required: 'El apellido es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                field={field}
                label="Apellido"
                style={styles.input}
                name="apellido"
                error={errors.apellido?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="sexo"
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
            name="fechaNacimiento"
            rules={{
              required: 'La fecha de nacimiento es obligatoria',
              validate: {
                validDate: value => {
                  if (!value) {
                    return 'La fecha de nacimiento es obligatoria';
                  }
                  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                  if (!datePattern.test(value)) {
                    return 'El formato de fecha no es válido (YYYY-MM-DD)';
                  }

                  const parts = value.split('-');
                  const year = parseInt(parts[0], 10);
                  const month = parseInt(parts[1], 10);
                  const day = parseInt(parts[2], 10);

                  if (
                    isNaN(year) ||
                    isNaN(month) ||
                    isNaN(day) ||
                    month < 1 ||
                    month > 12 ||
                    day < 1 ||
                    day > 31
                  ) {
                    return 'La fecha no es válida';
                  }

                  const currentDate = new Date();

                  const eighteenYearsAgo =
                    currentDate.getFullYear() - 18 < year;

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
                label="Fecha de nacimiento (YYYY-MM-DD)"
                style={styles.input}
                name="fechaNacimiento"
                error={errors.fechaNacimiento?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
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
                style={styles.input}
                field={field}
                name="username"
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            }}
            render={({field}) => (
              <StyledInput
                label="Contraseña"
                style={styles.input}
                field={field}
                secureTextEntry
                name="password"
                error={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="telefono"
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
            name="dni"
            rules={{
              required: 'El DNI es obligatorio',
              pattern: {
                value: /^\d{8}$/,
                message: 'DNI inválido (debe contener 8 dígitos)',
              },
            }}
            render={({field}) => (
              <StyledInput
                keyboardType="numeric"
                label="DNI"
                style={styles.input}
                field={field}
                name="dni"
                error={errors.dni?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="direccion"
            rules={{
              required: 'La dirección es obligatoria',
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
            rules={{
              required: 'El precio es obligatorio',
              validate: {
                isNumber: value =>
                  !isNaN(parseFloat(value)) || 'El precio debe ser un número',
                greaterThan1000: value =>
                  parseFloat(value) >= 1000 ||
                  'El precio debe ser mayor a 1000',
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
            rules={{
              required: 'El número de matrícula es obligatorio',
              validate: {
                isNumber: value =>
                  !isNaN(parseFloat(value)) ||
                  'El número de matrícula debe ser un número',
              },
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
        </ScrollView>
        <View style={styles.footerWrapper}>
          <StyledButton onPress={handleSubmit(onSubmit)}>
            Siguiente
          </StyledButton>
          <StyledButton variant="empty" onPress={handleNavigateRegister}>
            <Text style={styles.secondaryButtonText}>Volver</Text>
          </StyledButton>
        </View>
      </View>
      <MedigoLogoIcon style={styles.logo} />
      <DropdownSelect
        dropdownValue={especialidad}
        setDropdownValue={setEspecialidad}
        title="Seleciona una especialidad"
        options={especialidades}
        visible={especialidadModal}
        setVisible={() => setEspecialidadModal(false)}
      />
    </KeyboardAwareScrollView>
  );
};
