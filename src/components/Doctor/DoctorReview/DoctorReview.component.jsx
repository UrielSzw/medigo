import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './DoctorReview.styles';

export const DoctorReview = ({setPatientReviewModal, handleReviewPatient}) => {
  const [rating, setRating] = useState(0);
  const [showError, setShowError] = useState(false);
  const [comment, setComment] = useState('');

  const handlePress = () => {
    if (rating === 0) {
      setShowError(true);
      return;
    }
    setPatientReviewModal();

    if (comment.length > 0) {
      handleReviewPatient({valoracion: rating, comentario: comment});
    } else {
      handleReviewPatient({valoracion: rating});
    }
  };

  useEffect(() => {
    if (rating > 0) {
      setShowError(false);
    }
  }, [rating]);
  return (
    <View style={styles.wrapper}>
      <UserDataItem name="Jose" category="Paciente" />
      <Rating handleRating={setRating} />
      <View style={styles.textBox}>
        <StyledText style={styles.text}>Dejar comentario (opcional)</StyledText>
        <TextInput
          multiline={true}
          style={styles.input}
          onChange={setComment}
          value={comment}
        />
      </View>
      <View style={styles.footerBox}>
        {showError && (
          <StyledText color="red" size="sm">
            Debes ingresar un rating
          </StyledText>
        )}
        <StyledButton onPress={handlePress}>Finalizar</StyledButton>
      </View>
    </View>
  );
};
