import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, TouchableOpacity} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {
  Banner,
  StyledButton,
  StyledInput,
  StyledText,
} from '../../../components';
import {MedigoLogoIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './Login.styles';
import {setUserData} from '../../../redux/user.slice';
import {apiUsuariosLogin, getUsers} from '../../../utils/api/userRoutes';

const USERS = [
  {
    email: 'medico@gmail.com',
    password: 'medico',
    type: 'doctor',
  },
  {
    email: 'user@gmail.com',
    password: 'user',
    type: 'patient',
    address: 'Av. Corrientes 3235',
  },
];

export const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    if (data) {
      try {
        const foundUser = USERS.find(user => user.email === data.username);

        if (!foundUser) {
          setError('username', {
            type: 'manual',
            message: 'El correo electrónico no está registrado',
          });
          return;
        }

        if (foundUser.password !== data.password) {
          setError('password', {
            type: 'manual',
            message: 'La contraseña es incorrecta',
          });
          return;
        }

        dispatch(setUserData(foundUser));

        if (foundUser.type === 'doctor') {
          navigation.navigate(PATHS.HOMEDOCTOR);
        } else {
          navigation.navigate(PATHS.HOMEPATIENT);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Banner />
      <View style={styles.bodyWrapper}>
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
              field={field}
              name="username"
              label="Email"
              style={styles.input}
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{required: 'La contraseña es obligatoria'}}
          render={({field}) => (
            <StyledInput
              field={field}
              name="password"
              secureTextEntry
              label="Contraseña"
              style={styles.input}
              error={errors.password?.message}
            />
          )}
        />
        <StyledButton onPress={handleSubmit(onSubmit)}>Ingresar</StyledButton>
        <View style={styles.footerWrapper}>
          <StyledText color="grey">¿No tienes cuenta?</StyledText>
          <TouchableOpacity onPress={handleNavigateRegister}>
            <StyledText color="blue">registrate</StyledText>
          </TouchableOpacity>
        </View>
      </View>
      <MedigoLogoIcon style={styles.logo} />
    </KeyboardAwareScrollView>
  );
};
