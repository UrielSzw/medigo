import React from 'react';
import {TextInput, View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './StyledInput.styles';

export const StyledInput = ({label, placeholder, secureTextEntry, style}) => {
  return (
    <View>
      <StyledText color="black">{label}</StyledText>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={{...styles.input, ...style}}
        placeholder={placeholder}
      />
    </View>
  );
};
