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

  const handleDocDetails = consulta => {
    const doctorActivity = {
      apellido: consulta.apellido,
      apellidoMedico: consulta.apellidoMedico,
      fechaAtencion: consulta.createdAt,
      direccion: consulta.direccion,
      especialidad: consulta.especialidad,
      nombre: consulta.nombre,
      nombreMedico: consulta.nombreMedico,
      precio: consulta.precio,
      valoracionMedico: consulta.valoracionMedico,
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
                  name={`${activity?.nombreMedico} ${activity?.apellidoMedico}`}
                  category={activity?.especialidad}
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
