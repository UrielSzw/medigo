import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DoctorListItem,
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {ActivityIcon} from '../../../assets/index.js';
import {PATHS} from '../../../routes/paths.js';
import {apiGetPatientActivity} from '../../../utils/api/patientRoutes.js';
import {setUserActivity} from '../../../redux/user.slice';
import {setSpinner} from '../../../utils/setSpinner';
import {styles} from './ActivityPat.styles.js';

export const ActivityPat = ({navigation}) => {
  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [activityList, setActivityList] = useState([]);

  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  const handleDocDetails = activity => {
    const doctorActivity = {
      date: activity.createdAt,
      price: activity.precio,
      review: activity.valoracionMedico,
      name: activity.medico.usuario.persona.nombre,
      lastName: activity.medico.usuario.persona.apellido,
      address: activity.direccion,
      speciality: activity.medico.especialidad,
    };

    dispatch(setUserActivity(doctorActivity));
    navigation.navigate(PATHS.DOCINFOINPAT);
  };

  const getPatientActivity = async () => {
    try {
      setSpinner(true);
      const response = await apiGetPatientActivity();

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
    getPatientActivity();
  }, []);
  return (
    <View style={styles.selectDocWrapper}>
      <View style={styles.selectDocContainer}>
        <WelcomePerfilHeader
          username={`${userData.nombre} ${userData.apellido}`}
          email={userData.username}
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
                  onPress={() => handleDocDetails(activity)}
                  name={`${activity?.medico?.usuario?.persona?.nombre} ${activity?.medico?.usuario?.persona?.nombre}`}
                  category={activity?.medico?.especialidad}
                />
              ))}
          </ScrollView>
          <StyledButton onPress={handleNavigateProfile} children="Volver" />
        </View>
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
