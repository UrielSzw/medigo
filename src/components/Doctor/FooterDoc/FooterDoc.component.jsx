import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {HomeIcon, MapIcon, ProfileIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './FooterDoc.styles';

export const FooterDoc = ({current = 'home'}) => {
  const [selectedButton, setSelectedButton] = useState({
    map: false,
    home: false,
    profile: false,
    [current]: true,
  });

  const handleChangeSelection = name => {
    setSelectedButton({
      map: false,
      home: false,
      profile: false,
      [name]: true,
    });
  };

  const handlePress = name => {
    handleChangeSelection(name);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={
          selectedButton.map
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => handlePress('map')}>
        <MapIcon fill={selectedButton.map && '#63B4FF'} />
        {selectedButton.map && <StyledText color="blue">Mapa</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.home
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => handlePress('home')}>
        <HomeIcon fill={selectedButton.home && '#FFF'} />
        {selectedButton.home && <StyledText color="blue">Inicio</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.profile
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => handlePress('profile')}>
        <ProfileIcon fill={selectedButton.profile && '#63B4FF'} />
        {selectedButton.profile && <StyledText color="blue">Perfil</StyledText>}
      </TouchableOpacity>
    </View>
  );
};
