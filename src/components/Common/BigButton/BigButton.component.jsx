import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CaduceusIcon, UserIcon} from '../../../assets';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './BigButton.styles';

export const BigButton = ({isDoctor, onPress}) => {
  const wrapperStyles = {
    ...styles.wrapper,
    ...styles[isDoctor ? 'doctor' : 'patient'],
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={wrapperStyles}>
        {isDoctor ? <CaduceusIcon /> : <UserIcon />}
        <StyledText color={isDoctor ? 'blue' : 'white'}>
          {isDoctor ? 'Medico' : 'Paciente'}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};
