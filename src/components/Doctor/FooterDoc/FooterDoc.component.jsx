import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {HomeIcon, MapIcon, ProfileIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './FooterDoc.styles';
import {PATHS} from '../../../routes/paths';

export const FooterDoc = ({current = 'home'}) => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState({
    map: false,
    home: false,
    profile: false,
  });

  useEffect(() => {
    setSelectedButton({
      map: false,
      home: false,
      profile: false,
      [current]: true,
    });
  }, [current]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={
          selectedButton.map
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => navigation.navigate(PATHS.HOMEDOCTOR)}>
        <MapIcon fill={selectedButton.map && '#63B4FF'} />
        {selectedButton.map && <StyledText color="blue">Mapa</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.home
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => navigation.navigate(PATHS.HOMEDOCTOR)}>
        <HomeIcon fill={selectedButton.home && '#FFF'} />
        {selectedButton.home && <StyledText color="blue">Inicio</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.profile
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => navigation.navigate(PATHS.PERFILDOCTOR)}>
        <ProfileIcon fill={selectedButton.profile && '#63B4FF'} />
        {selectedButton.profile && <StyledText color="blue">Perfil</StyledText>}
      </TouchableOpacity>
    </View>
  );
};
