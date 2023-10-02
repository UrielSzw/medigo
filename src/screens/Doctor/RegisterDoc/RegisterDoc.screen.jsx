import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Banner,
  StyledButton,
  StyledInput,
  StyledText,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './RegisterDoc.styles';
import {MedigoLogoIcon} from '../../../assets';

export const RegisterDoc = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Banner />
      <ScrollView style={styles.bodyWrapper}>
        <Controller
          control={control}
          name="fullName"
          render={({field}) => (
            <StyledInput
              label="Nombre Completo"
              style={styles.input}
              field={field}
              name="fullName"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field}) => (
            <StyledInput
              label="Contraseña"
              style={styles.input}
              field={field}
              name="password"
            />
          )}
        />
        <Controller
          control={control}
          name="dni"
          render={({field}) => (
            <StyledInput
              label="DNI"
              style={styles.input}
              field={field}
              name="dni"
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({field}) => (
            <StyledInput
              label="Telefono"
              style={styles.input}
              field={field}
              name="phone"
            />
          )}
        />
        <Controller
          control={control}
          name="specialty"
          render={({field}) => (
            <StyledInput
              label="Especialidad"
              style={styles.input}
              field={field}
              name="specialty"
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({field}) => (
            <StyledInput
              label="Precio"
              style={styles.input}
              field={field}
              name="price"
            />
          )}
        />
        <Controller
          control={control}
          name="licenseNumber"
          render={({field}) => (
            <StyledInput
              label="Numero de Matricula"
              style={styles.input}
              field={field}
              name="licenseNumber"
            />
          )}
        />
        <Controller
          control={control}
          name="radius"
          render={({field}) => (
            <StyledInput
              label="Radio de Accion(km)"
              style={styles.input}
              field={field}
              name="radius"
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({field}) => (
            <StyledInput
              label="Direccion"
              style={styles.input}
              field={field}
              name="address"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <StyledInput
              label="Email"
              style={styles.input}
              field={field}
              name="email"
            />
          )}
        />
        <StyledButton onPress={handleSubmit(onSubmit)}>Siguiente</StyledButton>
        <View style={styles.footerWrapper}>
          <TouchableOpacity onPress={handleNavigateRegister}>
            <StyledText color="blue">Volver</StyledText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MedigoLogoIcon style={styles.logo} />
    </KeyboardAwareScrollView>
  );
};
