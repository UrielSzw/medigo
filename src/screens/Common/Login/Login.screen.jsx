import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, TouchableOpacity} from 'react-native';
import {
  Banner,
  StyledButton,
  StyledInput,
  StyledText,
} from '../../../components';
import {MedigoLogoIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './Login.styles';

export const Login = ({navigation}) => {
  const handleNavigateRegister = () => {
    navigation.navigate(PATHS.REGISTER);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Banner />
      <View style={styles.bodyWrapper}>
        <StyledInput label="Email" style={styles.input} />
        <StyledInput secureTextEntry label="Contraseña" style={styles.input} />
        <StyledButton>Ingresar</StyledButton>
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
