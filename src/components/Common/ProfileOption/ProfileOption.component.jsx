import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {NextIcon} from '../../../assets';
import {styles} from './ProfileOption.styles';

export const ProfileOption = ({iconComponent, text, onPress}) => (
  <View style={styles.wrapper}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.option}>
        <View style={styles.optionText}>
          {iconComponent}
          <StyledText>{text}</StyledText>
        </View>
        <NextIcon />
      </View>
    </TouchableOpacity>
  </View>
);
