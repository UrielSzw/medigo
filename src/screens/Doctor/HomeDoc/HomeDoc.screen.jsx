/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, useRef} from 'react';
import {View, Linking} from 'react-native';
import {useSelector} from 'react-redux';
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
  StyledSwitch,
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
import {styles} from './HomeDoc.styles';
import {setSpinner} from '../../../utils/setSpinner';
import {showModal} from '../../../redux/common.slice';

export const HomeDoc = ({navigation, route}) => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const [permisoDenegado, setPermisoDenegado] = useState(
    route.params ? route.params.permisoDenegado : undefined,
  );
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [acceptedPatient, setAcceptedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [patientReviewModal, setPatientReviewModal] = useState(false);
  const [endAppointmentModal, setEndAppointmentModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [count, setCount] = useState(60);
  const [request, setRequest] = useState(null);
  const [coordenates, setCoordenates] = useState({longitud: 0, latitud: 0});

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

  useEffect(() => {
    // Si el valor de la ruta cambia, actualiza el estado
    setPermisoDenegado(route.params ? route.params.permisoDenegado : undefined);
  }, [route.params]);

  useEffect(() => {
    if (permisoDenegado === false) {
      setActivo(false);
      setCuentaActivada(false);
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
        setCuentaActivada(false);
        setActivo(false);
        setSpinner(false);
        setRequest(null);
        console.log('desconectado');
      } else {
        console.log('conectado');
        navigation.navigate(PATHS.MAP);
        setCuentaActivada(true);
        setActivo(true);
        setPermisoDenegado(true);
      }
      closeModal();
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
          setAcceptedPatient(null);
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

  const closeModal = () => {
    setOpenModal(false);
  };

  const handlePatientRequestResponse = async value => {
    try {
      if (value) {
        const response = await apiAcceptRequest();

        if (response.state === 'en curso') {
          setOpenModalDetail(false);
          setActivo(false);
          setAcceptedPatient(request);
          setCuentaActivada(false);
          setRequest(null);
          setTimeout(() => {
            // Llama al callback después de 120 segundos
            checkIfPatientCancel();
          }, 120000);
        }
      } else {
        const response = await apiDeclineRequest();

        if (response.state === 'seleccionando medico') {
          setOpenModalDetail(false);
          setActivo(false);
          setCuentaActivada(false);
          setRequest(null);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEndAppointment = async () => {
    try {
      if (isSuccessful) {
        const response = await apiEndAppointment();

        if (response?.state === 'calificando') {
          setEndAppointmentModal(false);
          setPatientReviewModal(true);
        }
      } else {
        const response = await apiCancelRequest();

        if (response?.state === 'cancelada') {
          setEndAppointmentModal(false);
          acceptedPatient(null);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (request) {
      if (count <= 0) {
        handlePatientRequestResponse(false);
        console.log('Cancelado la request');
      } else {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      }
    }
  }, [request, count]);

  const handleAddNotes = () => {
    setNotesModal(true);
  };

  const handleSetActiveAfterEnd = async formData => {
    try {
      const response = await apiReviewPatient(formData);

      if (response) {
        setActivo(true);
        setAcceptedPatient(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePatientRequest = async () => {
    try {
      const response = await apiRequireRequest();

      if (response && !request) {
        console.log('apiRequireRequest', response);
        setRequest(response.result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (activo && !request) {
      setRequestCount(39);
    }
  }, [activo, request]);

  useEffect(() => {
    if (requestCount % 20 === 0 && activo) {
      handlePatientRequest();
      console.log('funcion ejecutada');
    }

    if (requestCount > 0 && !request) {
      setTimeout(() => {
        setRequestCount(requestCount - 1);
      }, 1000);
    }

    if (request) {
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
          <StyledText size="xl" bold={true} color={activo ? 'green' : 'red'}>
            {activo ? 'ACTIVO' : 'INACTIVO'}
          </StyledText>

          {activo && request && (
            <PatientRequest
              count={count}
              request={request}
              setOpenModalDetail={setOpenModalDetail}
            />
          )}

          {!activo && acceptedPatient && (
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
        {!acceptedPatient && (
          <StyledButton onPress={() => setOpenModal(true)}>
            {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
          </StyledButton>
        )}

        {acceptedPatient && (
          <View style={styles.buttonAccepted}>
            <StyledButton onPress={() => setEndAppointmentModal(true)}>
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
          cuentaActivada
            ? '¿Estas seguro que desea desactivar y dejar de recibir consultas?'
            : '¿Estas seguro que desea activar y comenzar a recibir consultas?'
        }
        content={
          <View style={styles.contentWrapper}>
            <View>
              <StyledButton onPress={handleConfirmarClick}>
                Confirmar
              </StyledButton>
              <StyledButton onPress={closeModal} variant="empty">
                Cancelar
              </StyledButton>
            </View>
          </View>
        }
        open={openModal}
      />
      <StyledModal
        open={openModalDetail}
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
            request={request}
          />
        }
      />
      <StyledModal
        title="Calificar paciente"
        content={
          <DoctorReview
            handleSetActiveAfterEnd={handleSetActiveAfterEnd}
            setPatientReviewModal={setPatientReviewModal}
          />
        }
        open={patientReviewModal}
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
        open={endAppointmentModal}
      />
      <StyledModal
        title="Agregar Notas"
        content={<AddNotesModal setNotesModal={setNotesModal} />}
        open={notesModal}
      />
    </View>
  );
};
