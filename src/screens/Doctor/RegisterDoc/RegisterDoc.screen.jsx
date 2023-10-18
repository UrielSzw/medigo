import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
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
      <Banner />
      <View style={styles.body}>
        <ScrollView style={styles.bodyWrapper}>
          <Controller
            control={control}
            name="fullName"
            rules={{
              required: 'El nombre completo es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                label="Nombre Completo"
                style={styles.input}
                field={field}
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
                secureTextEntry
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
                label="DNI"
                keyboardType="numeric"
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
            name="specialty"
            rules={{
              required: 'La especialidad es obligatoria',
            }}
            render={({field}) => (
              <StyledInput
                label="Especialidad"
                style={styles.input}
                field={field}
                name="specialty"
                error={errors.specialty?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            rules={{
              required: 'El precio es obligatorio',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Precio inválido',
              },
            }}
            render={({field}) => (
              <StyledInput
                label="Precio"
                keyboardType="numeric"
                style={styles.input}
                field={field}
                name="price"
                error={errors.price?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="licenseNumber"
            rules={{
              required: 'El número de matrícula es obligatorio',
            }}
            render={({field}) => (
              <StyledInput
                label="Número de Matrícula"
                keyboardType="numeric"
                style={styles.input}
                field={field}
                name="licenseNumber"
                error={errors.licenseNumber?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="radius"
            rules={{
              required: 'El radio de acción es obligatorio',
              pattern: {
                value: /^\d+$/,
                message: 'Valor inválido para el radio de acción',
              },
            }}
            render={({field}) => (
              <StyledInput
                label="Radio de Acción (km)"
                style={styles.input}
                field={field}
                keyboardType="numeric"
                name="radius"
                error={errors.radius?.message}
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
    </KeyboardAwareScrollView>
  );
};
