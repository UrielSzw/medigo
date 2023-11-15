/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FooterPatient,
  StyledButton,
  StyledModal,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './FamilyMemberInfo.styles';
import {formatDate, formatToDate} from '../../../utils/commonMethods';
import {setSpinner} from '../../../utils/setSpinner';
import {setUserData} from '../../../redux/user.slice';
import {apiDeleteFamilyMember} from '../../../utils/api/patientRoutes';

export const FamilyMemberInfo = ({navigation}) => {
  const {familyMemberSelected, userData} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleEditFamilyMembers = () => {
    navigation.navigate(PATHS.MODIFYFAMILYMEMBER);
  };

  const handleBackFamilyMembers = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
  };

  const handleDeleteFamilyMember = async () => {
    try {
      setSpinner(true);
      setOpenModal(false);

      const newFamilyMembers = userData.grupoFamiliar.filter(
        fam =>
          !(
            fam.nombre === familyMemberSelected.nombre &&
            fam.apellido === familyMemberSelected.apellido &&
            fam.fechaNacimiento === familyMemberSelected.fechaNacimiento
          ),
      );

      const response = await apiDeleteFamilyMember({
        nombre: familyMemberSelected.nombre,
        apellido: familyMemberSelected.apellido,
        fechaNacimiento: formatToDate(familyMemberSelected.fechaNacimiento),
      });

      if (response.success) {
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
            {familyMemberSelected.fechaNacimiento.length > 12
              ? formatDate(familyMemberSelected.fechaNacimiento)
              : familyMemberSelected.fechaNacimiento}
          </StyledText>
          <StyledText color="grey" size="default">
            Sexo: {familyMemberSelected.sexo}
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleEditFamilyMembers} children="Editar" />
          <StyledButton
            onPress={handleBackFamilyMembers}
            children="Volver"
            variant="secondary"
          />
          <StyledButton
            onPress={() => setOpenModal(true)}
            children="Eliminar"
            variant="warning"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
      <StyledModal
        title="Eliminar miembro familiar"
        open={openModal}
        content={
          <View style={{gap: 40}}>
            <StyledText style={{textAlign: 'center'}}>
              ¿Estas seguro que deseas eliminar este miembro del grupo familiar?
            </StyledText>
            <StyledButton onPress={handleDeleteFamilyMember} variant="warning">
              Eliminar
            </StyledButton>
          </View>
        }
      />
    </View>
  );
};
