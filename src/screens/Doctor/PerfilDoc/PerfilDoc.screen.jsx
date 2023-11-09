/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FooterDoc,
  ProfileOption,
  StyledButton,
  WelcomePerfilHeader,
} from '../../../components';
import {HelpIcon, PersonalDataIcon, ActivityIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {clearAllDoctor} from '../../../redux/doctor.slice';
import {styles} from './PerfilDoc.styles';
import {setSpinner} from '../../../utils/setSpinner';
import {apiDoctorsUpdateState} from '../../../utils/api/doctorRoutes';

export const PerfilDoc = ({navigation}) => {
  const {doctorData, requestData} = useSelector(state => state.doctorReducer);
  const dispatch = useDispatch();
  const handleActividadPress = () => {
    navigation.navigate(PATHS.ACTIVITYDOC);
  };

  const handleDatosPersonalesPress = () => {
    navigation.navigate(PATHS.PERSONALDATADOC);
  };

  const handleAyudaPress = () => {
    navigation.navigate(PATHS.HELPDOC);
  };

  const handleLogout = async () => {
    try {
      setSpinner(true);

      if (doctorData.active) {
        await apiDoctorsUpdateState();
      }

      dispatch(clearAllDoctor());
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <WelcomePerfilHeader
        username={`${doctorData.nombre} ${doctorData.apellido}`}
        email={doctorData.username}
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
          onPress={handleActividadPress}
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
          onPress={handleDatosPersonalesPress}
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
          onPress={handleAyudaPress}
        />
        <StyledButton
          variant="warning"
          style={{
            ...styles.logout,
            opacity: requestData.accepted ? 0.3 : 1,
          }}
          onPress={handleLogout}>
          Logout
        </StyledButton>
      </View>
      <FooterDoc current="profile" />
    </View>
  );
};
