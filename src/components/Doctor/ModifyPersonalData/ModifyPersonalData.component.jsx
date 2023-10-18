/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView, Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {StyledButton, StyledText, StyledInput} from '../..';
import {PersonalDataIcon} from '../../../assets';
import {styles} from './ModifyPersonalData.styles';
import {PATHS} from '../../../routes/paths';

export const ModifyPersonalData = ({setHideFooter}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        setHideFooter(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setHideFooter(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const navigation = useNavigation();
  const telefono = '121312313213',
    especialidades = 'Cardiología, Dermatología, ...',
    precio = '2500',
    nroMatricula = '177777777',
    radioDeAccion = '2';

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleBackActivity = () => {
    navigation.navigate(PATHS.PERSONALDATADOC);
  };

  return (
    <View style={styles.infoDocContainer}>
      <View style={styles.detailsContainer}>
        <PersonalDataIcon />
        <StyledText bold>Datos personales</StyledText>
      </View>
      <ScrollView
        contentContainerStyle={styles.inputContent}
        style={styles.inputWrapper}>
        <Controller
          control={control}
          name="telefono"
          defaultValue={telefono}
          rules={{
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^[0-9]{9,10}$/,
              message: 'Número de teléfono inválido',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Telefono"
              style={styles.input}
              name="telefono"
              error={errors.telefono?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="especialidades"
          defaultValue={especialidades}
          rules={{
            required: 'Las especialidades son obligatorias',
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Especialidades"
              style={styles.input}
              name="especialidades"
              error={errors.especialidades?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="dni"
          defaultValue={''}
          rules={{
            required: 'El DNI es obligatorio',
            pattern: {
              value: /^\d{8}$/,
              message: 'DNI inválido (debe contener 8 dígitos)',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="DNI"
              style={styles.input}
              name="dni"
              error={errors.dni?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="precio"
          defaultValue={precio}
          rules={{
            required: 'El precio es obligatorio',
            pattern: {
              value: /^\d+$/,
              message: 'Precio inválido (debe ser un número entero)',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Precio"
              style={styles.input}
              name="precio"
              error={errors.precio?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="nroMatricula"
          defaultValue={nroMatricula}
          rules={{
            required: 'El número de matrícula es obligatorio',
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Numero de Matricula"
              style={styles.input}
              name="nroMatricula"
              error={errors.nroMatricula?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="radioDeAccion"
          defaultValue={radioDeAccion}
          rules={{
            required: 'El radio de acción es obligatorio',
            pattern: {
              value: /^\d+$/,
              message: 'Radio de acción inválido (debe ser un número entero)',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Radio de Accion (km)"
              style={styles.input}
              name="radioDeAccion"
              error={errors.radioDeAccion?.message}
            />
          )}
        />
      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleSubmit(onSubmit)}>
            Confirmar
          </StyledButton>

          <StyledButton variant="secondary" onPress={handleBackActivity}>
            Volver
          </StyledButton>
        </View>
      )}
    </View>
  );
};
