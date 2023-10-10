import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './DropdownInfo.styles';
import {StyledText} from '../StyledText/StyledText.component';
import {NextIcon} from '../../../assets';

export const DropdownInfo = ({label = 'Pregunta', text = 'Respuesta'}) => {
  const [dropSelected, setDropSelected] = useState(false);

  return (
    <View style={styles.DropdownWrapper}>
      <TouchableOpacity onPress={() => setDropSelected(prev => !prev)}>
        <View style={styles.DropdownButton}>
          <StyledText>{label}</StyledText>
          <NextIcon style={dropSelected ? styles.iconUp : styles.iconDown} />
        </View>
      </TouchableOpacity>
      {dropSelected && (
        <View style={styles.DropdownText}>
          <StyledText color="grey">{text}</StyledText>
        </View>
      )}
    </View>
  );
};
