import React from 'react';
import {View} from 'react-native';
import {CarIcon, ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './UserDataItem.styles';

export const UserDataItem = ({
  name = 'Nombre',
  category,
  showTime,
  logo,
  time = '15',
  style,
}) => {
  const showTimeStyle = showTime ? styles.wrapper : styles.wrapperCenter;

  return (
    <View style={{...showTimeStyle, ...style}}>
      <View style={styles.dataWrapper}>
        {logo ? logo : <DefaultProfile />}
        <View>
          <StyledText bold size={name.length > 12 ? 's' : 'md'}>
            {name}
          </StyledText>
          <StyledText color="grey">{category}</StyledText>
        </View>
      </View>
      {showTime && (
        <View style={styles.time}>
          <CarIcon style={styles.carIcon} />
          <ClockIcon fill="#8696BB" style={styles.icon} />
          <StyledText color="grey" size="s">
            {time} m
          </StyledText>
        </View>
      )}
    </View>
  );
};
