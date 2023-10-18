import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Banner,
  StyledButton,
  StyledText,
  StyledInput,
  DynamicInput,
} from '../../../components';
import {styles} from './RegisterPat.styles';
import {PATHS} from '../../../routes/paths';
import {MedigoLogoIcon} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const RegisterPat = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.background}>
        <Banner />
        <View style={styles.bodyTop}>
          <ScrollView style={styles.inputWrapper}>
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: 'El nombre completo es obligatorio',
              }}
              render={({field}) => (
                <StyledInput
                  field={field}
                  label="Nombre completo"
                  style={styles.input}
                  name="fullName"
                  error={errors.fullName?.message}
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
              name="phone"
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
                  name="phone"
                  error={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'La dirección es obligatoria',
              }}
              render={({field}) => (
                <StyledInput
                  label="Dirección"
                  style={styles.input}
                  field={field}
                  name="address"
                  error={errors.address?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
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
                  name="email"
                  error={errors.email?.message}
                />
              )}
            />
            <StyledText>Miembros del grupo familiar</StyledText>
            <DynamicInput errors={errors} control={control} />
          </ScrollView>
        </View>
        <View style={styles.body}>
          <StyledButton
            style={styles.principalButton}
            onPress={handleSubmit(onSubmit)}>
            Siguiente
          </StyledButton>
          <TouchableOpacity onPress={handleNavigateRegister}>
            <StyledText color="blue">Volver</StyledText>
          </TouchableOpacity>
        </View>
        <MedigoLogoIcon style={styles.logo} />
      </View>
    </KeyboardAwareScrollView>
  );
};
