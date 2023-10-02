import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {HomeIcon, ProfileIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './FooterPatient.styles';

export const FooterPatient = ({current = 'home'}) => {
  const [selectedButton, setSelectedButton] = useState({
    home: false,
    profile: false,
    [current]: true,
  });

  const handleChangeSelection = name => {
    setSelectedButton({
      home: false,
      profile: false,
      [name]: true,
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={
          selectedButton.home
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => handleChangeSelection('home')}>
        <HomeIcon fill={selectedButton.home && '#FFF'} />
        {selectedButton.home && <StyledText color="blue">Inicio</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.profile
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => handleChangeSelection('profile')}>
        <ProfileIcon fill={selectedButton.profile && '#63B4FF'} />
        {selectedButton.profile && <StyledText color="blue">Perfil</StyledText>}
      </TouchableOpacity>
    </View>
  );
};
