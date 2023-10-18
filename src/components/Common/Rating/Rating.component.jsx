/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StyledText} from '../StyledText/StyledText.component';
import {StarFilledIcon, StarOutlinedIcon} from '../../../assets';
import {styles} from './Rating.styles';

export const Rating = ({rating = 0, readOnly, handleRating}) => {
  const emptyArray = Array(5).fill(0);
  const [ratingArray, setRatingArray] = useState([]);

  const setRating = count => {
    Array(count)
      .fill(0)
      .forEach((number, index) => {
        emptyArray[index] = 1;
      });

    setRatingArray(emptyArray);
  };

  useEffect(() => {
    setRating(rating);
  }, []);

  if (readOnly) {
    return (
      <View style={styles.display}>
        {rating ? (
          ratingArray.map((rat, index) =>
            rat === 1 ? (
              <StarFilledIcon readOnly key={index} />
            ) : (
              <StarOutlinedIcon readOnly key={index} />
            ),
          )
        ) : (
          <StyledText>No rating</StyledText>
        )}
      </View>
    );
  }

  const handleStarSeleceted = index => {
    setRating(index + 1);
    handleRating(index + 1);
  };

  return (
    <View style={styles.touchable}>
      {ratingArray.map((rat, index) => (
        <TouchableOpacity key={index} onPress={e => handleStarSeleceted(index)}>
          {rat === 1 ? <StarFilledIcon /> : <StarOutlinedIcon />}
        </TouchableOpacity>
      ))}
    </View>
  );
};
