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
import {formatDate} from '../../../utils/commonMethods';
import {styles} from './PersonalData.styles';

export const PersonalData = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const handleBackProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  const handleModifyData = () => {
    navigation.navigate(PATHS.MODIFYPATDATA);
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
            Fecha de Nacimiento:{' '}
            {userData.fechaNacimiento.length > 12
              ? formatDate(userData.fechaNacimiento)
              : userData.fechaNacimiento}
          </StyledText>
          <StyledText color="grey" size="default">
            Sexo: {userData.sexo}
          </StyledText>
          <StyledText color="grey" size="default">
            Direccion: {userData.direccion}
          </StyledText>
          <StyledText color="grey" size="default">
            Piso: {userData.piso}
          </StyledText>
          <StyledText color="grey" size="default">
            Departamento: {userData.departamento}
          </StyledText>
          <StyledText color="grey" size="default">
            Ciudad: {userData.ciudad}
          </StyledText>
          <StyledText color="grey" size="default">
            Codigo postal: {userData.codigoPostal}
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
