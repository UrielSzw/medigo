import React from 'react';
import {TextInput, View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './StyledInput.styles';

export const StyledInput = () => {
  return (
    <View>
      <StyledText size="default" color="black">
        dasdads
      </StyledText>
      <TextInput style={styles.input} />
    </View>
  );
};
