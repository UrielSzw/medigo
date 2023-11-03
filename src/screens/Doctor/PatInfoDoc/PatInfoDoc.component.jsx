import React from 'react';
import {useSelector} from 'react-redux';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  UserDataItem,
  WelcomePerfilHeader,
} from '../../../components';
import {View} from 'react-native';
import {formatDate} from '../../../utils/commonMethods';
import {ActivityIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PatInfoDoc.styles';

export const PatInfoDoc = ({navigation}) => {
  const {doctorData, doctorActivity} = useSelector(
    state => state.doctorReducer,
  );
  const handleBackActivity = () => {
    navigation.navigate(PATHS.ACTIVITYDOC);
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader
        username={`${doctorData.nombre} ${doctorData.apellido}`}
        email={doctorData.username}
      />
      <View style={styles.infoDocContainer}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <ActivityIcon />
            <StyledText bold>Detalles</StyledText>
          </View>
          <UserDataItem
            style={styles.userData}
            name={`${doctorActivity.name} ${doctorActivity.lastName}`}
            category="Paciente"
          />
          <View style={styles.textsContainer}>
            <StyledText color="grey" size="default">
              Fecha de atencion: {formatDate(doctorActivity.date)}
            </StyledText>
            <StyledText color="grey" size="default">
              Monto: {doctorActivity.price}
            </StyledText>
            <StyledText color="grey" size="default">
              Calificacion: {doctorActivity.review} estrellas
            </StyledText>
            <StyledText color="grey" size="default">
              Ubicacion de atencion: {doctorActivity.address}
            </StyledText>
          </View>
        </View>
        <StyledButton onPress={handleBackActivity} children="Volver" />
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
