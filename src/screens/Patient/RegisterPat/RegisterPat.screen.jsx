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

export const RegisterPat = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <View style={styles.background}>
      <Banner />
      <View style={styles.body}>
        <ScrollView style={styles.inputWrapper}>
          <Controller
            control={control}
            name="fullName"
            render={({field}) => (
              <StyledInput
                field={field}
                label="Nombre completo"
                style={styles.input}
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
          <StyledText>Miembros del grupo familiar</StyledText>
          <DynamicInput control={control} />
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
    </View>
  );
};
