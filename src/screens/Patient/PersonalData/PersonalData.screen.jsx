import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PersonalData.styles';

export const PersonalData = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const handleBackProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  const handleModifyData = () => {
    navigation.navigate(PATHS.MODIFYPATDATA);
  };

  const formatDate = date => {
    // Crear un objeto de date a partir de la cadena
    const dateObj = new Date(date);

    // Obtener el día, mes y año
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    // Formatear la date en el formato "dd-mm-yyyy"
    const dateFormateada = `${day}-${month}-${year}`;

    return dateFormateada;
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.infoDocContainer}>
        <View style={styles.textsContainer}>
          <View style={styles.detailsContainer}>
            <PersonalDataIcon />
            <StyledText bold>Datos personales</StyledText>
          </View>
          <StyledText color="grey" size="default">
            DNI: {userData.dni}
          </StyledText>
          <StyledText color="grey" size="default">
            Telefono: {userData.telefono}
          </StyledText>
          <StyledText color="grey" size="default">
            Fecha de Nacimiento: {formatDate(userData.fechaNacimiento)}
          </StyledText>
          <StyledText color="grey" size="default">
            Sexo: {userData.sexo}
          </StyledText>
          <StyledText color="grey" size="default">
            Direccion: {userData.direccion}
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleModifyData} children="Modificar datos" />

          <StyledButton
            variant="secondary"
            onPress={handleBackProfile}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
