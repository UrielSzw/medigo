import React from 'react';
import {TextInput, View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './StyledInput.styles';

export const StyledInput = ({label, placeholder, secureTextEntry}) => {
  return (
    <View>
      <StyledText size="default" color="black">
        {label}
      </StyledText>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
};
