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
    email: 'm',
    password: 'm',
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
  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      // const response = await apiUsuariosLogin({
      //   username: data.email,
      //   password: data.password,
      // });
      // const response = await fetch('http://192.168.0.139:3000/usuarios/1');
      const response = await getUsers(1);
      console.log('response', response);
    } catch (e) {
      console.log(e.message);
    }
  };
  // if (foundeUser.type === 'doctor') {
  //   navigation.navigate(PATHS.HOMEDOCTOR);
  // } else {
  //   navigation.navigate(PATHS.HOMEPATIENT);
  // }

  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Banner />
      <View style={styles.bodyWrapper}>
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <StyledInput
              field={field}
              name="email"
              label="Email"
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field}) => (
            <StyledInput
              field={field}
              name="password"
              secureTextEntry
              label="Contraseña"
              style={styles.input}
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
