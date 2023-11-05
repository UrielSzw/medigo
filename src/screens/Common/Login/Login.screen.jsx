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
import {setUserData} from '../../../redux/user.slice';
import {apiUsuariosLogin} from '../../../utils/api/userRoutes';
import {setDoctorData} from '../../../redux/doctor.slice';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './Login.styles';
import {setModal} from '../../../utils/setModal';

export const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    if (data) {
      try {
        setSpinner(true);
        const response = await apiUsuariosLogin(data);

        if (response) {
          if (response === 'Credenciales incorrectas') {
            setModal({
              title: 'Credenciales invalidas',
              message: 'El email y/o contraseña no son correctos',
              show: true,
            });
          } else if (response.nroMatricula) {
            dispatch(setDoctorData(response));
            navigation.navigate(PATHS.HOMEDOCTOR);
          } else {
            dispatch(setUserData(response));
            navigation.navigate(PATHS.HOMEPATIENT);
          }
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
