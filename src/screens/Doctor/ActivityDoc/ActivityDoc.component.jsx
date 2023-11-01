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
import {setDoctorActivity} from '../../../redux/doctor.slice';
import {styles} from './ActivityDoc.style';

export const ActivityDoc = ({navigation}) => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const dispatch = useDispatch();
  const [activityList, setActivityList] = useState([]);
  const handleNavigateProfile = () => {
    navigation.navigate(PATHS.PERFILDOCTOR);
  };

  const handlePatDetails = activity => {
    const doctorActivity = {
      date: activity.createdAt,
      price: activity.precio,
      review: activity.valoracionCliente,
      name: activity.nombre,
      lastName: activity.apellido,
      address: activity.direccion,
      notes: activity.observacion,
    };

    dispatch(setDoctorActivity(doctorActivity));
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
          username={`${doctorData?.nombre} ${doctorData?.apellido}`}
          email={doctorData?.username}
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
                  category="Paciente"
                  name={`${activity.nombre} ${activity.apellido}`}
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
