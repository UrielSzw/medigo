import React from 'react';
import {Text} from 'react-native';
import {styles} from './StyledText.styles';

export const StyledText = ({color, size, bold, children}) => {
  const textStyles = {...styles[color], ...styles[size]};
  return <Text style={textStyles}>{children}</Text>;
};
