/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {View, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FooterDoc,
  StyledText,
  StyledModal,
  StyledButton,
  WelcomeHeader,
  PatientRequest,
  AcceptedPatient,
  PatientDetailsModal,
  DoctorReview,
  AddNotesModal,
  EndAppointmentModal,
} from '../../../components';
import {PATHS} from '../../../routes/paths';
import {
  apiAcceptRequest,
  apiCancelRequest,
  apiDeclineRequest,
  apiDoctorsUpdateState,
  apiEndAppointment,
  apiLastRequestState,
  apiRequireRequest,
  apiReviewPatient,
} from '../../../utils/api/doctorRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {
  changeFechaSeleccion,
  decrementFechaSeleccion,
  resetRequestData,
  setDoctorData,
  setRequestData,
  setTimeLeftForCancel,
  setTimeLeftInRequest,
  toggleDoctorModal,
} from '../../../redux/doctor.slice';
import {calculateTimeDifference} from '../../../utils/commonMethods';
import {setModal as setGenericModal} from '../../../utils/setModal';
import {styles} from './HomeDoc.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeDoc = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {
    doctorData,
    requestData,
    doctorModals,
    timeLeftInRequest,
    timeLeftForCancel,
  } = useSelector(state => state.doctorReducer);
  const [permisoDenegado, setPermisoDenegado] = useState(
    route.params ? route.params.permisoDenegado : undefined,
  );

  const [isSuccessful, setIsSuccessful] = useState(true);
  const [cancelCount, setCancelCount] = useState(-1);
  const [cancelByDoctor, setCancelByDoctor] = useState(false);

  const openGoogleMaps = () => {
    const startLatitude = doctorData.location.latitude;
    const startLongitude = doctorData.location.longitud;
    const endLatitude = requestData.latitudCliente;
    const endLongitude = requestData.longitudCliente;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  const toggleModal = name => {
    dispatch(toggleDoctorModal(name));
  };

  useEffect(() => {
    // Si el valor de la ruta cambia, actualiza el estado
    setPermisoDenegado(route.params ? route.params.permisoDenegado : undefined);
  }, [route.params]);

  useEffect(() => {
    if (permisoDenegado === false) {
      dispatch(setDoctorData({active: false}));
      handleBackToInactive();
      setGenericModal({
        title: 'Error de geolocalización',
        message:
          'Para poder aceptar clientes, debes permitir la geolocalización',
        show: true,
      });
    }
  }, [permisoDenegado]);

  const handleConfirmarClick = async () => {
    try {
      setSpinner(true);
      const response = await apiDoctorsUpdateState();
      if (response.state === 'desconectado') {
        setSpinner(false);
        dispatch(setDoctorData({active: false}));
        dispatch(setRequestData({requested: false}));
      } else {
        navigation.navigate(PATHS.MAP);
        dispatch(setDoctorData({active: true}));
        setPermisoDenegado(true);
      }
      toggleModal('active');
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfPatientCancel = async () => {
    try {
      const response = await apiLastRequestState();

      if (response && !cancelByDoctor) {
        if (response.result === 'cancelada') {
          setSpinner(true);
          dispatch(resetRequestData());
          dispatch(setTimeLeftForCancel('0'));
          setCancelCount(-1);
          dispatch(setDoctorData({active: false}));
          setGenericModal({
            title: 'El paciente cancelo la consulta',
            message:
              'El paciente hizo uso de su derecho de cancelar la consulta dentro de los primeros 2 minutos',
            show: true,
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const handlePatientRequestResponse = async value => {
    try {
      setSpinner(true);
      if (value) {
        const response = await apiAcceptRequest();

        const currentDate = new Date();

        if (response.state === 'en curso') {
          toggleModal('detail');
          dispatch(setDoctorData({active: false}));
          dispatch(setRequestData({requested: false, accepted: true}));
          dispatch(setTimeLeftForCancel(currentDate.toISOString()));
          setCancelByDoctor(false);
        }
      } else {
        const response = await apiDeclineRequest();

        if (response.state === 'rechazada') {
          dispatch(setDoctorData({active: false}));
          dispatch(setRequestData({requested: false}));
          toggleModal('detail');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const handleEndAppointment = async () => {
    try {
      setSpinner(true);
      if (isSuccessful) {
        const response = await apiEndAppointment();

        if (response?.state === 'calificando') {
          toggleModal('end');
          toggleModal('review');
        }
      } else {
        setCancelByDoctor(true);
        const response = await apiCancelRequest();

        if (response?.state === 'cancelada') {
          toggleModal('end');
          dispatch(setRequestData({accepted: false}));
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const timer = useRef();

  useEffect(() => {
    if (requestData.requested) {
      if (requestData.fechaSeleccion === 0) {
        // handlePatientRequestResponse(false);
        handleBackToInactive();
      } else {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          dispatch(decrementFechaSeleccion());
        }, 1000);
      }
    } else {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      dispatch(changeFechaSeleccion(-1));
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [requestData.requested, requestData.fechaSeleccion]);

  const handleAddNotes = () => {
    toggleModal('notes');
  };

  const handleReviewPatient = async formData => {
    try {
      setSpinner(true);
      const response = await apiReviewPatient(formData);

      if (response.state === 'calificando') {
        dispatch(setDoctorData({active: false}));
        dispatch(setRequestData({accepted: false}));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const handlePatientRequest = async () => {
    try {
      const response = await apiRequireRequest();

      if (response.result && !requestData.requested) {
        const timeLeft = calculateTimeDifference(
          response.result.fechaSeleccion,
          48,
        );

        if (timeLeft > 1) {
          const dateForString = new Date(response.result.fechaSeleccion);

          dispatch(setTimeLeftInRequest(dateForString.toISOString()));
          dispatch(
            setRequestData({
              ...response.result,
              fechaSeleccion: timeLeft,
              requested: true,
            }),
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackToInactive = async () => {
    try {
      setSpinner(true);
      const response = await apiDoctorsUpdateState();

      if (response.state === 'desconectado') {
        dispatch(setDoctorData({active: false}));
        dispatch(resetRequestData());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const [requestCount, setRequestCount] = useState(-1);

  useEffect(() => {
    if (doctorData.active && !requestData.requested && requestCount <= 0) {
      setTimeout(() => {
        setRequestCount(1999);
      }, 10000);
    }
  }, [doctorData.active, requestData.requested]);

  const handlePatientRequestWithToken = async () => {
    try {
      const tokenUsuarioSaved = await AsyncStorage.getItem('tokenUsuario');
      if (tokenUsuarioSaved) {
        await handlePatientRequest();
      }
    } catch (error) {
      console.error('Error fetching token or making API call:', error);
    }
  };

  const checkIfPatientCancelWithToken = async () => {
    try {
      const tokenUsuarioSaved = await AsyncStorage.getItem('tokenUsuario');
      if (tokenUsuarioSaved) {
        await checkIfPatientCancel();
      }
    } catch (error) {
      console.error('Error fetching token or making API call:', error);
    }
  };

  const firstLoad = async () => {
    if (timeLeftForCancel?.length > 4) {
      const time = new Date(timeLeftForCancel);
      const timeLeft = calculateTimeDifference(time, 120);

      if (timeLeft > 0) {
        setCancelCount(timeLeft);
      } else {
        checkIfPatientCancelWithToken();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (requestCount % 4 === 0 && doctorData.active) {
        await handlePatientRequestWithToken();
      }

      if (requestData.requested || !doctorData.active) {
        setRequestCount(-1);
      } else if (requestCount > 0) {
        setTimeout(() => {
          setRequestCount(requestCount - 1);
        }, 1000);
      }

      if (requestCount === 0) {
        handleBackToInactive();
      }
    };
    fetchData();
  }, [requestCount]);

  useEffect(() => {
    firstLoad();
    if (requestData.requested && timeLeftInRequest.length > 4) {
      const time = new Date(timeLeftInRequest);
      const timeLeft = calculateTimeDifference(time, 48);

      if (timeLeft <= 0) {
        dispatch(resetRequestData());
        dispatch(setTimeLeftInRequest('0'));
      }

      dispatch(
        setRequestData({
          fechaSeleccion: timeLeft || 35,
        }),
      );
    }
  }, []);

  useEffect(() => {
    const checkCancel = async () => {
      if (cancelCount % 4 === 0) {
        await checkIfPatientCancelWithToken();
      }

      if (!requestData.accepted) {
        setCancelCount(-1);
      } else if (cancelCount >= 0) {
        setTimeout(() => {
          setCancelCount(cancelCount - 1);
        }, 1000);
      }
    };

    checkCancel();
  }, [cancelCount]);

  useEffect(() => {
    firstLoad();
  }, [timeLeftForCancel]);

  return (
    <View style={styles.wrapper}>
      <View>
        <WelcomeHeader
          username={`${doctorData.nombre} ${doctorData.apellido}`}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.textState}>
          <StyledText
            size="xl"
            bold={true}
            color={doctorData.active ? 'green' : 'red'}>
            {doctorData.active ? 'ACTIVO' : 'INACTIVO'}
          </StyledText>

          {doctorData.active && requestData.requested && (
            <PatientRequest setOpenModalDetail={() => toggleModal('detail')} />
          )}

          {!doctorData.active && requestData.accepted && (
            <AcceptedPatient onPress={() => openGoogleMaps()} />
          )}
          {!doctorData.active && requestData.accepted && (
            <View>
              <StyledText color="grey" size="default">
                Direccion: {requestData.direccion}
              </StyledText>
              <StyledText color="grey" size="default">
                Piso: {requestData.piso}
              </StyledText>
              <StyledText color="grey" size="default">
                Departamento: {requestData.departamento}
              </StyledText>
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {!requestData.accepted && (
          <StyledButton onPress={() => toggleModal('active')}>
            {doctorData.active ? 'Desactivar cuenta' : 'Activar cuenta'}
          </StyledButton>
        )}

        {requestData.accepted && (
          <View style={styles.buttonAccepted}>
            <StyledButton onPress={() => toggleModal('end')}>
              Finalizar
            </StyledButton>
            <StyledButton variant="secondary" onPress={handleAddNotes}>
              Agregar notas
            </StyledButton>
          </View>
        )}
      </View>
      <FooterDoc current="home" />
      <StyledModal
        title={
          doctorData.active
            ? '¿Estas seguro que deseas desactivar y dejar de recibir consultas?'
            : '¿Estas seguro que deseas activar y comenzar a recibir consultas?'
        }
        content={
          <View style={styles.contentWrapper}>
            <View>
              <StyledButton onPress={handleConfirmarClick}>
                Confirmar
              </StyledButton>
              <StyledButton
                onPress={() => toggleModal('active')}
                variant="empty">
                Cancelar
              </StyledButton>
            </View>
          </View>
        }
        open={doctorModals.active}
      />
      <StyledModal
        open={doctorModals.detail}
        title={
          <View style={styles.headerModalWrapper}>
            <StyledText color="white" size="xs">
              Tiempo restante para aceptar:
            </StyledText>
            <StyledText size="s" color="white">
              {requestData.fechaSeleccion}
            </StyledText>
          </View>
        }
        content={
          <PatientDetailsModal
            handlePatientRequestResponse={handlePatientRequestResponse}
          />
        }
      />
      <StyledModal
        title="Calificar paciente"
        content={
          <DoctorReview
            handleReviewPatient={handleReviewPatient}
            setPatientReviewModal={() => toggleModal('review')}
          />
        }
        open={doctorModals.review}
      />
      <StyledModal
        title="Estado de la consulta"
        content={
          <EndAppointmentModal
            setIsSuccessful={setIsSuccessful}
            isSuccessful={isSuccessful}
            handleEndAppointment={handleEndAppointment}
          />
        }
        open={doctorModals.end}
      />
      <StyledModal
        title="Agregar Notas"
        content={<AddNotesModal setNotesModal={() => toggleModal('notes')} />}
        open={doctorModals.notes}
      />
    </View>
  );
};
