import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {DefaultProfile} from '../../../assets';
import {styles} from './WelcomeHeader.styles';

export const WelcomeHeader = ({username = 'User', profileIcon}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <StyledText color="grey">Hola</StyledText>
        <StyledText bold size="lg">
          {username}
        </StyledText>
      </View>
      {profileIcon ? profileIcon : <DefaultProfile />}
    </View>
  );
};
