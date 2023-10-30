/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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

export const HomeDoc = ({navigation, route}) => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const [permisoDenegado, setPermisoDenegado] = useState(
    route.params ? route.params.permisoDenegado : undefined,
  );
  const [activo, setActivo] = useState(false);
  const [cuentaActivada, setCuentaActivada] = useState(false);
  const [acceptedPatient, setAcceptedPatient] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalErrorGeo, setOpenModalErrorGeo] = useState(false);
  const [patientReviewModal, setPatientReviewModal] = useState(false);
  const [endAppointmentModal, setEndAppointmentModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [count, setCount] = useState(60);
  const [request, setRequest] = useState({});

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
      setOpenModalErrorGeo(true);
    }
  }, [permisoDenegado]);

  const handleConfirmarClick = async () => {
    try {
      setSpinner(true);
      const response = await apiDoctorsUpdateState();
      if (response.state === 'desconectado') {
        setCuentaActivada(false);
        setActivo(false);
        setSpinner(false);
      } else {
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
          setAcceptedPatient({name: 'Nombre'});
          setRequest({});
          setTimeout(() => {
            // Llama al callback después de 120 segundos
            checkIfPatientCancel();
          }, 120000);
        }
      } else {
        const response = await apiDeclineRequest();

        if (response.state === 'solicitando medico') {
          setOpenModalDetail(false);
          setActivo(false);
          setRequest({});
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

        if (response) {
          setPatientReviewModal(true);
        }
      } else {
        const response = await apiCancelRequest();

        if (response) {
          setPatientReviewModal(true);
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
        setAcceptedPatient({});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePatientRequest = async () => {
    try {
      const response = await apiRequireRequest();

      if (response) {
        console.log('request', response);
        setRequest(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (activo) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [activo, request]);

  useEffect(() => {
    let intervalId;

    const startInterval = () => {
      intervalId = setInterval(() => {
        handlePatientRequest();
        // Comprueba si la variable booleana cambió
        if (!running) {
          clearInterval(intervalId); // Detén el intervalo
        }
      }, 20000); // 20 segundos en milisegundos
    };

    if (running) {
      startInterval(); // Inicia el intervalo cuando el componente se monta
    }

    // return () => {
    //   setRunning(false); // Cambia la variable booleana a false cuando el componente se desmonta
    //   clearInterval(intervalId); // Asegúrate de detener el intervalo al desmontar el componente
    // };
  }, [running]);

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
          {activo && request.length > 0 && (
            <PatientRequest
              count={count}
              setOpenModalDetail={setOpenModalDetail}
            />
          )}
          {!activo && acceptedPatient.name && (
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
        {!acceptedPatient.name && (
          <StyledButton onPress={() => setOpenModal(true)}>
            {cuentaActivada ? 'Desactivar cuenta' : 'Activar cuenta'}
          </StyledButton>
        )}

        {acceptedPatient.name && (
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
            handleAcceptPatientRequest={handlePatientRequestResponse}
          />
        }
      />
      <StyledModal
        open={openModalErrorGeo}
        title="Error de geolocalización"
        content={
          <View style={{gap: 40}}>
            <StyledText style={{textAlign: 'center'}}>
              Para poder acceptar clientes, debes permitir la geolocalización
            </StyledText>
            <StyledButton
              variant="warning"
              onPress={() => setOpenModalErrorGeo(false)}>
              Cerrar
            </StyledButton>
          </View>
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
          <View>
            <StyledText>Estado de la consulta</StyledText>
            <StyledSwitch
              setIsChecked={setIsSuccessful}
              isChecked={isSuccessful}
            />
            <StyledButton onPress={handleEndAppointment}>
              Confirmar
            </StyledButton>
          </View>
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
