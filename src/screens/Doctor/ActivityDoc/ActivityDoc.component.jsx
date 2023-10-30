import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DoctorListItem,
  FooterDoc,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {ActivityIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';
import {setSpinner} from '../../../utils/setSpinner';
import {apiGetDoctorActivity} from '../../../utils/api/doctorRoutes';
import {styles} from './ActivityDoc.style';

export const ActivityDoc = ({navigation}) => {
  const {doctorData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [activityList, setActivityList] = useState([]);
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  const handlePatDetails = activity => {
    // const doctorActivity = {
    //   date: activity.createdAt,
    //   price: activity.precio,
    //   review: activity.valoracionMedico,
    //   name: activity.medico.usuario.persona.nombre,
    //   lastName: activity.medico.usuario.persona.apellido,
    //   address: activity.direccion,
    //   speciality: activity.medico.especialidad,
    // };

    // dispatch(setUserActivity(doctorActivity));
    navigation.navigate(PATHS.PATINFOINDOC);
  };

  const getDoctorActivity = async () => {
    try {
      setSpinner(true);
      const response = await apiGetDoctorActivity();

      if (response) {
        setActivityList(response.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getDoctorActivity();
  }, []);

  return (
    <View style={styles.selectDocWrapper}>
      <View style={styles.selectDocContainer}>
        <WelcomePerfilHeader
          username={`${doctorData.nombre} ${doctorData.apellido}`}
          email={doctorData.username}
        />

        <View style={styles.nearDocsContainer}>
          <View style={styles.activityContainer}>
            <ActivityIcon />
            <StyledText bold size="md">
              Actividad
            </StyledText>
          </View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}>
            {activityList.length > 0 &&
              activityList?.map((activity, index) => (
                <DoctorListItem
                  key={index}
                  onPress={() => handlePatDetails(activity)}
                  // name={`${activity?.medico?.usuario?.persona?.nombre} ${activity?.medico?.usuario?.persona?.nombre}`}
                  // category={activity?.medico?.especialidad}
                />
              ))}
          </ScrollView>
          <StyledButton onPress={handleNavigateProfile} children="Volver" />
        </View>
      </View>
      <FooterDoc current="profile" />
    </View>
  );
};
