import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './FamilyMemberInfo.styles';
import {formatDate} from '../../../utils/commonMethods';
import {setSpinner} from '../../../utils/setSpinner';
import {setUserData} from '../../../redux/user.slice';

export const FamilyMemberInfo = ({navigation}) => {
  const {familyMemberSelected, userData} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const handleBackFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
  };

  const handleDeleteFamilyMember = async () => {
    try {
      setSpinner(true);

      const newFamilyMembers = userData.grupoFamiliar.filter(
        fam => fam.nombre !== familyMemberSelected.nombre,
      );

      //   const response = await apiPatientUpdate({
      //     grupoFamiliar: newFamilyMembers,
      //   });

      console.log(newFamilyMembers);

      const response = true;

      if (response) {
        dispatch(
          setUserData({
            grupoFamiliar: newFamilyMembers,
          }),
        );
        handleBackFamilyMembers();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
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
            Fecha de nacimiento:{' '}
            {formatDate(familyMemberSelected.fechaNacimiento)}
          </StyledText>
          <StyledText color="grey" size="default">
            Sexo: {familyMemberSelected.sexo}
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleBackFamilyMembers} children="Volver" />
          <StyledButton
            variant="warning"
            onPress={handleDeleteFamilyMember}
            children="Eliminar"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
