import React from 'react';
import {View} from 'react-native';
import {styles} from './Register.styles';
import {StyledText} from '../../../components';
import {BigButton} from '../../../components/Common/BigButton/BigButton.component';

export const Register = () => {
  return (
    <View>
      <View style={styles.header} />
      <StyledText bold style={styles.title}>
        Register
      </StyledText>
      <View style={styles.body}>
        <StyledText>Elige tipo de cuenta</StyledText>
        <BigButton />
      </View>
    </View>
  );
};
