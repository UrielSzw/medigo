/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  FooterPatient,
  ProfileOption,
  WelcomePerfilHeader,
} from '../../../components';
import {
  HelpIcon,
  PersonalDataIcon,
  ActivityIcon,
  FamilyIcon,
} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './ProfilePat.styles';

export const ProfilePat = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const handleActivityPress = () => {
    navigation.navigate(PATHS.ACTIVITYPAT);
  };

  const handleHelpPress = () => {
    navigation.navigate(PATHS.HELPPAT);
  };

  const handleFamilyMembersPress = () => {
    navigation.navigate(PATHS.FAMILYMEMBERS);
  };

  const handlePersonalDataPress = () => {
    navigation.navigate(PATHS.PERSONALDATA);
  };

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.container}>
        <ProfileOption
          iconComponent={
            <ActivityIcon
              style={{
                marginTop: 4,
                marginLeft: 10,
              }}
            />
          }
          text="Actividad"
          onPress={handleActivityPress}
        />
        <ProfileOption
          iconComponent={
            <PersonalDataIcon
              style={{
                marginTop: 3,
                marginLeft: 10,
              }}
            />
          }
          text="Datos Personales"
          onPress={handlePersonalDataPress}
        />
        <ProfileOption
          iconComponent={
            <HelpIcon
              style={{
                marginTop: 4,
                marginLeft: 10,
              }}
            />
          }
          text="Ayuda"
          onPress={handleHelpPress}
        />
        <ProfileOption
          iconComponent={
            <FamilyIcon
              style={{
                marginTop: 4,
                marginLeft: 10,
              }}
            />
          }
          text="Miembros familiares"
          onPress={handleFamilyMembersPress}
        />
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
