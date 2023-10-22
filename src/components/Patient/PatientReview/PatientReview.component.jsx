import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {UserDataItem} from '../../Common/UserDataItem/UserDataItem.component';
import {Rating} from '../../Common/Rating/Rating.component';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {styles} from './PatientReview.styles';

const DOCTOR = {
  nroMatricula: '36985214',
  nombre: 'Jorge',
  apellido: 'ApellidoJorge',
  especialidad: 'Clinico',
  tiempo: '15',
  precio: '1700',
  valoracion: '4,8',
  resenas: '(120 reseñas)',
  comentarios: [],
};

export const PatientReview = ({doctor = DOCTOR, setDoctorReviewModal}) => {
  const [rating, setRating] = useState(0);
  const [showError, setShowError] = useState(false);

  const handlePress = async () => {
    try {
      if (rating === 0) {
        setShowError(true);
        return;
      }

      const endAppointment = 'endAppointmentEndpoint({ valoracion : rating })';

      if (endAppointment) {
        setDoctorReviewModal(false);
      }
    } catch (e) {
      console.log(e);
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
        name={`${doctor.nombre} ${doctor.apellido}`}
        category={doctor.especialidad}
      />
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
