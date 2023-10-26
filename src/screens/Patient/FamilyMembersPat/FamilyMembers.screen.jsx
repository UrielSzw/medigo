import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {
  DoctorListItem,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {FamilyIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';
import {styles} from './FamilyMembers.styles.js';

export const FamilyMembers = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  const handleNavigateActivity = () => {
    navigation.navigate(PATHS.FAMILYMEMBERACTIVITY);
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
          {userData?.grupoFamiliar?.map((fam, index) => (
            <DoctorListItem
              key={index}
              buttonText="Ver actividad"
              name={`${fam.nombre} ${fam.apellido}`}
              category={`${fam.sexo[0]}`}
              onPress={handleNavigateActivity}
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
