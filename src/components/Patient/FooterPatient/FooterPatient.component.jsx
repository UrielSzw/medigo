import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeIcon, ProfileIcon} from '../../../assets';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {styles} from './FooterPatient.styles';
import {PATHS} from '../../../routes/paths';

export const FooterPatient = ({current = 'home'}) => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState({
    home: false,
    profile: false,
  });

  useEffect(() => {
    setSelectedButton({
      home: false,
      profile: false,
      [current]: true,
    });
  }, [current]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={
          selectedButton.home
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => navigation.navigate(PATHS.HOMEPATIENT)}>
        <HomeIcon fill={selectedButton.home && '#FFF'} />
        {selectedButton.home && <StyledText color="blue">Inicio</StyledText>}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedButton.profile
            ? {...styles.button, ...styles.selected}
            : styles.button
        }
        onPress={() => navigation.navigate(PATHS.PERFILPATIENT)}>
        <ProfileIcon fill={selectedButton.profile && '#63B4FF'} />
        {selectedButton.profile && <StyledText color="blue">Perfil</StyledText>}
      </TouchableOpacity>
    </View>
  );
};
