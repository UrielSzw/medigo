import React from 'react';
import {View} from 'react-native';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './PatientRequest.styles';
import {ClockIcon, DefaultProfile} from '../../../assets';

export const PatientRequest = ({
  logo,
  name = 'User',
  time = '15',
  count = '60',
  setOpenModalDetail,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <StyledText size="s">Tiempo restante para acceptar:</StyledText>
        <StyledText>{count}</StyledText>
      </View>
      <View style={styles.dataWrapper}>
        <View style={styles.nameWrapper}>
          {logo ? logo : <DefaultProfile />}
          <View>
            <StyledText bold color="white" size="md">
              {name}
            </StyledText>
          </View>
        </View>
        <View style={styles.timeWrapper}>
          <ClockIcon fill="#FFF" style={styles.icon} />
          <StyledText color="white">{time} m</StyledText>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <StyledButton
          style={styles.button}
          variant="empty"
          onPress={setOpenModalDetail}>
          Ver mas
        </StyledButton>
      </View>
    </View>
  );
};
