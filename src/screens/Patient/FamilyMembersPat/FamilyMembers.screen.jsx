import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {FamilyIcon} from '../../../assets/index.js';
import {setFamilyMemberSelected} from '../../../redux/user.slice';
import {PATHS} from '../../../routes/paths.js';
import {styles} from './FamilyMembers.styles.js';

export const FamilyMembers = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const family = userData?.grupoFamiliar?.slice(
    1,
    userData?.grupoFamiliar?.length,
  );
  const dispatch = useDispatch();
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  const handleNavigateFamilyMemberInfo = familyMember => {
    dispatch(setFamilyMemberSelected(familyMember));
    navigation.navigate(PATHS.FAMILYMEMBERINFO);
  };

  return (
    <View style={styles.selectDocWrapper}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.selectDocContainer}>
        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <FamilyIcon />
            <StyledText bold size="md">
              Miembros Familiares
            </StyledText>
          </View>
          {family?.map((fam, index) => (
            <DoctorListItem
              key={index}
              buttonText="Mas informacion"
              name={`${fam.nombre} ${fam.apellido}`}
              category={`${fam.sexo[0]}`}
              onPress={() => handleNavigateFamilyMemberInfo(fam)}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            onPress={handleNavigateProfile}
            children="Modficar datos"
          />

          <StyledButton
            variant="secondary"
            onPress={handleNavigateProfile}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
