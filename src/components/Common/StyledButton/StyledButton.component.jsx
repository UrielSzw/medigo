import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './StyledButton.styles';
import {StyledText} from '../StyledText/StyledText.component';

export const StyledButton = ({
  variant = 'primary',
  style,
  children = 'Click',
  onPress,
}) => {
  const buttonStyles = {...styles[variant], ...styles.button, ...style};
  const buttonColor =
    variant === 'secondary' ? 'blue' : variant === 'empty' ? 'grey' : 'white';

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <StyledText color={buttonColor}>{children}</StyledText>
    </TouchableOpacity>
  );
};
