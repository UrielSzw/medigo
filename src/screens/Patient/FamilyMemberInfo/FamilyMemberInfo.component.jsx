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
import {styles} from './FamilyMemberInfo.styles';

export const FamilyMemberInfo = ({navigation}) => {
  const {familyMemberSelected, userData} = useSelector(
    state => state.userReducer,
  );
  const handleBackFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
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
            Nombre: {familyMemberSelected.nombre}
          </StyledText>
          <StyledText color="grey" size="default">
            Apellido: {familyMemberSelected.apellido}
          </StyledText>
          <StyledText color="grey" size="default">
            DNI: {familyMemberSelected.dni}
          </StyledText>
          <StyledText color="grey" size="default">
            Sexo: {familyMemberSelected.sexo}
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleBackFamilyMembers} children="Volver" />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
