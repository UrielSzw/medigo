/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {getStyles} from './Switch.styles';

export const StyledSwitch = ({isChecked, setIsChecked}) => {
  const styles = getStyles();

  const toggleSwitch = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
  };

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <View style={isChecked ? styles.wrapperOn : styles.wrapperOff}>
        {isChecked && (
          <StyledText bold color="white" style={{fontSize: 10}}>
            Exitosa
          </StyledText>
        )}
        <View style={styles.circle} />
        {!isChecked && (
          <StyledText bold color="white" style={{fontSize: 10}}>
            Cancelada
          </StyledText>
        )}
      </View>
    </TouchableOpacity>
  );
};
