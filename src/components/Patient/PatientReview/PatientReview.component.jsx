import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {apiReviewDoctor} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {
  removeDoctorDetails,
  removeRequestDetails,
  setListOfDoctorsData,
} from '../../../redux/user.slice';
import {styles} from './PatientReview.styles';

export const PatientReview = ({setDoctorReviewModal}) => {
  const {doctorDetails} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);

  const handlePress = async () => {
    try {
      if (rating === 0) {
        setShowError(true);
        return;
      }
      setSpinner(true);
      const endAppointment = await apiReviewDoctor({
        valoracion: rating,
        comentario: comment,
      });

      if (endAppointment.state === 'calificando') {
        setDoctorReviewModal();
        dispatch(removeDoctorDetails());
        dispatch(removeRequestDetails());
        dispatch(setListOfDoctorsData([]));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (rating > 0) {
      setShowError(false);
    }
  }, [rating]);

  return (
    <View style={styles.wrapper}>
      <UserDataItem
        name={`${doctorDetails.nombre} ${doctorDetails.apellido}`}
        category={doctorDetails.especialidad}
      />
      <Rating handleRating={setRating} />
      <View style={styles.textBox}>
        <StyledText style={styles.text}>Dejar comentario (opcional)</StyledText>
        <TextInput
          multiline={true}
          style={styles.input}
          value={comment}
          onChangeText={text => setComment(text)}
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
