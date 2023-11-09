/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledInput,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {formatDate, formatToDate} from '../../../utils/commonMethods';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {apiPatientUpdate} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {setUserData} from '../../../redux/user.slice';
import {styles} from './ModifyData.styles';

export const ModifyData = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleBackPersonalData = () => {
    navigation.navigate(PATHS.PERSONALDATA);
  };

  const onSubmit = async data => {
    try {
      setSpinner(true);
      const fechaNacimiento = formatToDate(data.fechaNacimiento);

      const response = await apiPatientUpdate({
        ...data,
        fechaNacimiento,
      });

      if (response) {
        dispatch(
          setUserData({
            ...data,
            fechaNacimiento,
          }),
        );
        handleBackPersonalData();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const Form = () => {
    return (
      <ScrollView
        style={styles.wrapperForm}
        contentContainerStyle={styles.wrapperFormContent}>
        <Controller
          control={control}
          name="nombre"
          rules={{
            required: 'El nombre es obligatorio',
          }}
          defaultValue={userData.nombre}
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
          defaultValue={userData.apellido}
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
          defaultValue={userData.sexo[0]}
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
          defaultValue={formatDate(userData.fechaNacimiento)}
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
          name="username"
          defaultValue={userData.username}
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
          defaultValue={userData.password}
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
              name="password"
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="telefono"
          defaultValue={userData.telefono}
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
      </ScrollView>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingTop: 5}}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <PersonalDataIcon />
          <StyledText bold>Datos personales</StyledText>
        </View>
        <Form />
        <View style={styles.wrapperButtons}>
          <StyledButton onPress={handleSubmit(onSubmit)} children="Confirmar" />

          <StyledButton
            variant="secondary"
            onPress={handleBackPersonalData}
            children="Volver"
          />
        </View>
        <FooterPatient current="profile" />
      </View>
    </KeyboardAwareScrollView>
  );
};
