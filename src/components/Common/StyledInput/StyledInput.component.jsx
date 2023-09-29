import React from 'react';
import {TextInput, View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './StyledInput.styles';

export const StyledInput = ({
  field,
  label,
  placeholder,
  secureTextEntry,
  style,
}) => {
  return (
    <View style={style}>
      <StyledText size="default" color="black">
        {label}
      </StyledText>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={{...styles.input, ...style}}
        placeholder={placeholder}
        value={field?.value}
        onChangeText={field?.onChange}
      />
    </View>
  );
};
