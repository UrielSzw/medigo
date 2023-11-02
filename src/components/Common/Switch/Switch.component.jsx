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
      <View style={[styles.wrapper, isChecked && styles.wrapperOn]}>
        {isChecked && (
          <StyledText bold color="white" style={{fontSize: 20}}>
            SI
          </StyledText>
        )}
        <View style={styles.circle} />
        {!isChecked && (
          <StyledText bold color="white" style={{fontSize: 20}}>
            NO
          </StyledText>
        )}
      </View>
    </TouchableOpacity>
  );
};
