import React from 'react';
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
import {styles} from './ModifyData.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';

export const ModifyData = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleBackPersonalData = () => {
    navigation.navigate(PATHS.PERSONALDATA);
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.docInfoPatWrapper}>
        <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
        <View style={styles.infoDocContainer}>
          <View style={styles.textsContainer}>
            <View style={styles.detailsContainer}>
              <PersonalDataIcon />
              <StyledText bold>Datos personales</StyledText>
            </View>
            <ScrollView>
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
            </ScrollView>
          </View>

          <View style={styles.buttonsContainer}>
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              children="Confirmar"
            />

            <StyledButton
              variant="secondary"
              onPress={handleBackPersonalData}
              children="Volver"
            />
          </View>
        </View>
        <FooterPatient current="profile" />
      </View>
    </KeyboardAwareScrollView>
  );
};
