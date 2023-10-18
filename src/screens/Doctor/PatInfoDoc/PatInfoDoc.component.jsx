import React from 'react';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  UserDataItem,
  WelcomePerfilHeader,
} from '../../../components';
import {View} from 'react-native';
import {ActivityIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PatInfoDoc.styles';

export const PatInfoDoc = ({navigation}) => {
  const handleBackActivity = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader
        username="Dr Joseph Brostito"
        email="fedepr2345@gmail.com"
      />
      <View style={styles.infoDocContainer}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <ActivityIcon />
            <StyledText bold>Detalles</StyledText>
          </View>
          <UserDataItem
            style={styles.userData}
            name="Joe Doe"
            category="Paciente"
          />
          <View style={styles.textsContainer}>
            <StyledText color="grey" size="default">
              Fecha de atencion: 24/03/2023
            </StyledText>
            <StyledText color="grey" size="default">
              Monto: $2500
            </StyledText>
            <StyledText color="grey" size="default">
              Calificacion: 3.5 estrellas
            </StyledText>
            <StyledText color="grey" size="default">
              Miembro familiar: Yo
            </StyledText>
            <StyledText color="grey" size="default">
              Ubicacion de atencion: Av Corrientes 4251
            </StyledText>
          </View>
        </View>
        <StyledButton onPress={handleBackActivity} children="Volver" />
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
