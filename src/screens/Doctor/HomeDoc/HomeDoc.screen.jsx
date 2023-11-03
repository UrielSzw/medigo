/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
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
import {showModal} from '../../../redux/common.slice';
import {setDoctorData, setRequestData} from '../../../redux/doctor.slice';
import {styles} from './HomeDoc.styles';
import {calculateTimeDifference} from '../../../utils/commonMethods';

export const HomeDoc = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {doctorData, requestData} = useSelector(state => state.doctorReducer);
  const [permisoDenegado, setPermisoDenegado] = useState(
    route.params ? route.params.permisoDenegado : undefined,
  );

  const [modal, setModal] = useState({
    notes: false,
    detail: false,
    review: false,
    active: false,
    end: false,
  });

  const [isSuccessful, setIsSuccessful] = useState(true);
  const [count, setCount] = useState(60);
  // const [coordenates, setCoordenates] = useState({longitud: 0, latitud: 0});

  const openGoogleMaps = (
    startLatitude = '-34.617865',
    startLongitude = '-58.4332',
    endLatitude = '-35.617865',
    endLongitude = '-59.4332',
  ) => {
    console.log(startLatitude);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  const toggleModal = name => {
    setModal(prev => {
      return {...prev, [name]: !prev[name]};
    });
  };

  useEffect(() => {
    // Si el valor de la ruta cambia, actualiza el estado
    setPermisoDenegado(route.params ? route.params.permisoDenegado : undefined);
  }, [route.params]);

  useEffect(() => {
    if (permisoDenegado === false) {
      dispatch(setDoctorData({active: false}));
      showModal({
        title: 'Error de geolocalización',
        message:
          'Para poder acceptar clientes, debes permitir la geolocalización',
        show: true,
      });
    }
  }, [permisoDenegado]);

  const handleConfirmarClick = async () => {
    try {
      console.log('handleConfirmarClick');
      setSpinner(true);
      const response = await apiDoctorsUpdateState();
      if (response.state === 'desconectado') {
        setSpinner(false);
        dispatch(setDoctorData({active: false}));
        dispatch(setRequestData({requested: false}));
        console.log('desconectado');
      } else {
        console.log('conectado');
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

      if (response) {
        console.log('checkIfPatientCancel', response);
        if (response.result === 'cancelada') {
          dispatch(setRequestData({accepted: false}));
          console.log('bhdasiyudhgiauyshdauis', response);
          showModal({
            title: 'El paciente cancelo la consulta',
            message:
              'El paciente hizo uso de su derecho de cancelar la consulta dentro de los primeros 2 minutos',
            show: true,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePatientRequestResponse = async value => {
    try {
      setSpinner(true);
      if (value) {
        const response = await apiAcceptRequest();

        if (response.state === 'en curso') {
          toggleModal('detail');
          dispatch(setDoctorData({active: false}));
          dispatch(setRequestData({requested: false, accepted: true}));
          setTimeout(() => {
            // Llama al callback después de 120 segundos
            checkIfPatientCancel();
          }, 120000);
        }
      } else {
        const response = await apiDeclineRequest();

        if (response.state === 'seleccionando medico') {
          toggleModal('detail');
          dispatch(setDoctorData({active: false}));
          dispatch(setRequestData({requested: false}));
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
      if (isSuccessful) {
        const response = await apiEndAppointment();

        if (response?.state === 'calificando') {
          toggleModal('end');
          toggleModal('review');
        }
      } else {
        const response = await apiCancelRequest();

        if (response?.state === 'cancelada') {
          toggleModal('end');
          dispatch(setRequestData({accepted: false}));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (requestData.requested) {
      if (count <= 0) {
        handlePatientRequestResponse(false);
        console.log('Cancelado la request');
      } else {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      }
    }
  }, [requestData.requested, count]);

  const handleAddNotes = () => {
    toggleModal('notes');
  };

  const handleSetActiveAfterEnd = async formData => {
    try {
      const response = await apiReviewPatient(formData);

      if (response) {
        dispatch(setDoctorData({active: true}));
        dispatch(setRequestData({accepted: false}));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePatientRequest = async () => {
    try {
      const response = await apiRequireRequest();

      if (response.result && !requestData.requested) {
        console.log('apiRequireRequest', response.result);
        const timeLeft = calculateTimeDifference(
          response.result.fechaSeleccion,
          60,
        );
        dispatch(
          setRequestData({
            ...response.result,
            fechaSeleccion: timeLeft,
            requested: true,
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (doctorData.active && !requestData.requested) {
      setRequestCount(39);
    }
  }, [doctorData.active, requestData.requested]);

  useEffect(() => {
    if (requestCount % 20 === 0 && doctorData.active) {
      handlePatientRequest();
      console.log('funcion ejecutada');
    }

    if (requestCount > 0 && !requestData.requested) {
      setTimeout(() => {
        setRequestCount(requestCount - 1);
      }, 1000);
    }

    if (requestData.requested) {
      setRequestCount(0);
    }

    console.log('requestCount', requestCount);
  }, [requestCount]);

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
            <PatientRequest
              count={count}
              setOpenModalDetail={() => toggleModal('detail')}
            />
          )}

          {!doctorData.active && requestData.accepted && (
            <AcceptedPatient
              onPress={() =>
                openGoogleMaps(
                  '-34.617865',
                  '-58.4332',
                  '-35.617865',
                  '-59.4332',
                )
              }
            />
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
            ? '¿Estas seguro que desea desactivar y dejar de recibir consultas?'
            : '¿Estas seguro que desea activar y comenzar a recibir consultas?'
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
        open={modal.active}
      />
      <StyledModal
        open={modal.detail}
        title={
          <View style={styles.headerModalWrapper}>
            <StyledText color="white" size="xs">
              Tiempo restante para acceptar:
            </StyledText>
            <StyledText size="s" color="white">
              {count}
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
            handleSetActiveAfterEnd={handleSetActiveAfterEnd}
            setPatientReviewModal={() => toggleModal('review')}
          />
        }
        open={modal.review}
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
        open={modal.end}
      />
      <StyledModal
        title="Agregar Notas"
        content={<AddNotesModal setNotesModal={() => toggleModal('notes')} />}
        open={modal.notes}
      />
    </View>
  );
};
