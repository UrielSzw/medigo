import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BigButton, StyledText} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {styles} from './Register.styles';

export const Register = ({navigation}) => {
  const handleNavigateLogin = () => {
    navigation.navigate(PATHS.LOGIN);
  };

  const handleNavigateRegisterDoc = () => {
    console.log('pepe');
    navigation.navigate(PATHS.REGISTERDOCTOR);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <StyledText bold style={styles.title}>
        Registrate
      </StyledText>
      <View style={styles.body}>
        <StyledText>Elige tipo de cuenta</StyledText>
        <View style={styles.buttonsWrapper}>
          <BigButton isDoctor onPress={handleNavigateRegisterDoc} />
          <BigButton />
        </View>
        <View style={styles.loginWrapper}>
          <StyledText color="grey">¿Ya tienes cuenta?</StyledText>
          <TouchableOpacity onPress={handleNavigateLogin}>
            <StyledText color="blue">ingresa</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
