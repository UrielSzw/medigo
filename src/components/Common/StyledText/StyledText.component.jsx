import React from 'react';
import {Text} from 'react-native';
import {styles} from './StyledText.styles';

export const StyledText = ({
  color = 'black',
  size = 'default',
  bold,
  children,
  style,
}) => {
  const boldStyle = bold && {...styles.bold};
  const textStyles = {
    ...styles[color],
    ...styles[size],
    ...styles.text,
    ...boldStyle,
    ...style,
  };
  return <Text style={textStyles}>{children}</Text>;
};
