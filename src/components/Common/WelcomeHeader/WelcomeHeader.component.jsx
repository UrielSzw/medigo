import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {DefaultProfile} from '../../../assets';
import {styles} from './WelcomeHeader.styles';
import {useSelector} from 'react-redux';

export const WelcomeHeader = ({username = 'User', profileIcon}) => {
  const {userData} = useSelector(state => state.userReducer);

  return (
    <View style={styles.wrapper}>
      <View>
        <StyledText color="grey">Hola</StyledText>
        <StyledText bold size="lg">
          {`${userData.nombre} ${userData.apellido}`}
        </StyledText>
      </View>
      {profileIcon ? profileIcon : <DefaultProfile />}
    </View>
  );
};
