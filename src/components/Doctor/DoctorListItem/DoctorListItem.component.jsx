import React from 'react';
import {View} from 'react-native';
import {StyledText, UserDataItem, StyledButton} from '../../';
import {MoneyIcon, StarIcon} from '../../../assets';
import {styles} from './DoctorListItem.styles';

export const DoctorListItem = ({
  showTime,
  showInfo,
  time,
  price = '2500',
  reviews = '(120 reseñas)',
  rating = '4,8',
  name,
  category,
  logo,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.data}>
        <UserDataItem
          showTime={showTime}
          time={time}
          name={name}
          category={category}
          logo={logo}
        />
      </View>
      {showInfo && (
        <View style={styles.info}>
          <View style={styles.infoReviews}>
            <StarIcon />
            <StyledText color="orange">{rating} </StyledText>
            <StyledText color="orange">{reviews}</StyledText>
          </View>
          <View style={styles.infoPrice}>
            <MoneyIcon />
            <StyledText color="blue">{price}</StyledText>
          </View>
        </View>
      )}
      <StyledButton variant="empty">Ver detalles</StyledButton>
    </View>
  );
};
