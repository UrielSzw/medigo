/* eslint-disable react-native/no-inline-styles */
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
  error,
  keyboardType = 'default',
}) => {
  return (
    <View style={style}>
      <StyledText size="default" color="black">
        {label}
      </StyledText>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          ...styles.input,
          ...style,
          borderColor: error ? 'red' : '#8696BB',
        }}
        placeholder={placeholder}
        value={field?.value}
        onChangeText={field?.onChange}
      />
      {error && (
        <StyledText size="sm" color="red">
          {error}
        </StyledText>
      )}
    </View>
  );
};
