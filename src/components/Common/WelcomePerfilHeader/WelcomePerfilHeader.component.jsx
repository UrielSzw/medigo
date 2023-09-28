import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {DefaultProfile} from '../../../assets';
import {styles} from './WelcomePerfilHeader.styles';

export const WelcomePerfilHeader = ({username = 'User', email = 'email', profileIcon}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <StyledText bold size="lg">
          {username}
        </StyledText>
        <StyledText color="grey">
          {email}
        </StyledText>
      </View>
      {profileIcon ? profileIcon : <DefaultProfile />}
    </View>
  );
};
