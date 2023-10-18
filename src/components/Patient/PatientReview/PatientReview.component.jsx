import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './PatientReview.styles';

const DOCTOR = {
  time: '15',
  price: '1700',
  reviews: '(120 reseñas)',
  rating: '4,8',
  name: 'Jorge',
  category: 'Clinico',
  dni: '36985214',
};

export const PatientReview = ({doctor = DOCTOR, setDoctorReviewModal}) => {
  const [rating, setRating] = useState(0);
  const [showError, setShowError] = useState(false);

  const handlePress = () => {
    if (rating === 0) {
      setShowError(true);
      return;
    }
    setDoctorReviewModal(false);
  };

  useEffect(() => {
    if (rating > 0) {
      setShowError(false);
    }
  }, [rating]);
  return (
    <View style={styles.wrapper}>
      <UserDataItem name={doctor.name} category={doctor.category} />
      <Rating handleRating={setRating} />
      <View style={styles.textBox}>
        <StyledText style={styles.text}>Dejar comentario (opcional)</StyledText>
        <TextInput multiline={true} style={styles.input} />
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
